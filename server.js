import express from 'express';
import cors from 'cors';
import * as cheerio from 'cheerio';

const app = express();
app.use(cors());
app.use(express.json());

const BASE = 'https://www.gsmarena.com';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
};

// ===== IN-MEMORY CACHE =====
const cache = new Map();
function cached(key, ttl = 60 * 60 * 1000) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.ts < ttl) return entry.data;
  return null;
}
function setCache(key, data) {
  cache.set(key, { data, ts: Date.now() });
  if (cache.size > 200) {
    const oldest = cache.keys().next().value;
    cache.delete(oldest);
  }
}

async function fetchPage(url) {
  const c = cached(url);
  if (c) return c;
  const res = await fetch(url, { headers: HEADERS });
  const html = await res.text();
  setCache(url, html);
  return html;
}

// ===== IMAGE PROXY (fix CORS/hotlink) =====
app.get('/api/img', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing url');
    const fullUrl = url.startsWith('//') ? 'https:' + url : url;
    const res2 = await fetch(fullUrl, {
      headers: {
        'User-Agent': HEADERS['User-Agent'],
        'Referer': 'https://www.gsmarena.com/',
      },
    });
    const contentType = res2.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const buffer = await res2.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch {
    res.status(404).send('Image not found');
  }
});

// ===== BRANDS =====
app.get('/api/brands', async (req, res) => {
  try {
    const html = await fetchPage(`${BASE}/makers.php3`);
    const $ = cheerio.load(html);
    const brands = [];
    $('.brandmenu-v2 li a').each((_, el) => {
      const href = $(el).attr('href');
      const name = $(el).text().trim();
      if (href && name) {
        brands.push({ slug: href.replace('.php', ''), brand_name: name, device_count: 0, image: '' });
      }
    });
    res.json({ data: brands });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== BRAND PHONES =====
app.get('/api/brands/:slug', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const html = await fetchPage(`${BASE}/${req.params.slug}.php?page=${page}`);
    const $ = cheerio.load(html);
    const phones = [];
    const brand = req.params.slug.split('-')[0];
    $('.makers li').each((_, el) => {
      const a = $(el).find('a');
      const href = a.attr('href');
      const name = a.find('strong').text().trim() || a.find('span').text().trim();
      const img = a.find('img').attr('src') || '';
      if (href && name) {
        const imgSlug = img.split('/').pop()?.replace('.jpg', '') || '';
        phones.push({
          slug: href.replace('.php', ''),
          phone_name: name,
          brand,
          image: img ? (img.startsWith('//') ? 'https:' + img : img.startsWith('http') ? img : 'https://fdn2.gsmarena.com' + img) : '',
        });
      }
    });
    res.json({ data: phones });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== SEARCH (fast: only 3 brands) =====
app.get('/api/search', async (req, res) => {
  try {
    const q = (req.query.query || '').trim().toLowerCase();
    if (!q) return res.json({ data: [] });

    const allBrands = [
      'samsung-phones-9', 'apple-phones-48', 'xiaomi-phones-80',
      'google-phones-107', 'oneplus-phones-113', 'huawei-phones-58',
      'nothing-phones-145', 'realme-phones-118', 'oppo-phones-122',
      'sony-phones-24', 'motorola-phones-4', 'nokia-phones-1',
      'honor-phones-121', 'vivo-phones-106',
    ];

    const kwMap = {
      samsung: 'samsung-phones-9', apple: 'apple-phones-48', iphone: 'apple-phones-48',
      xiaomi: 'xiaomi-phones-80', mi: 'xiaomi-phones-80', google: 'google-phones-107',
      pixel: 'google-phones-107', oneplus: 'oneplus-phones-113', huawei: 'huawei-phones-58',
      nothing: 'nothing-phones-145', realme: 'realme-phones-118', oppo: 'oppo-phones-122',
      sony: 'sony-phones-24', motorola: 'motorola-phones-4', nokia: 'nokia-phones-1',
      honor: 'honor-phones-121', vivo: 'vivo-phones-106',
    };

    // Prioritize matching brand, then take top 2 more
    let toSearch = [];
    for (const [kw, slug] of Object.entries(kwMap)) {
      if (q.includes(kw)) { toSearch.push(slug); break; }
    }
    const rest = allBrands.filter(s => !toSearch.includes(s));
    while (toSearch.length < 3 && rest.length > 0) toSearch.push(rest.shift());

    const results = await Promise.allSettled(toSearch.map(s => fetchBrandPhones(s)));
    const allPhones = [];
    const seen = new Set();
    for (const r of results) {
      if (r.status === 'fulfilled') {
        for (const p of r.value) {
          if (!seen.has(p.slug)) { seen.add(p.slug); allPhones.push(p); }
        }
      }
    }

    const matched = allPhones.filter(p => p.phone_name.toLowerCase().includes(q));
    res.json({ data: (matched.length > 0 ? matched : allPhones).slice(0, 20) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function fetchBrandPhones(slug) {
  const html = await fetchPage(`${BASE}/${slug}.php`);
  const $ = cheerio.load(html);
  const phones = [];
  const brand = slug.split('-')[0];
  $('.makers li').each((_, el) => {
    const a = $(el).find('a');
    const href = a.attr('href');
    const name = a.find('strong').text().trim() || a.find('span').text().trim();
    const img = a.find('img').attr('src') || '';
    if (href && name) {
      phones.push({
        slug: href.replace('.php', ''),
        phone_name: name,
        brand,
        image: img ? (img.startsWith('//') ? 'https:' + img : img.startsWith('http') ? img : 'https://fdn2.gsmarena.com' + img) : '',
      });
    }
  });
  return phones;
}

// ===== PHONE DETAIL =====
const SKIP_CATS = new Set(['Our Tests', 'EU LABEL', 'Misc']);
const SKIP_SPECS = new Set(['SAR', 'SAR EU', 'Price', 'Models']);

app.get('/api/phone/:slug', async (req, res) => {
  try {
    const html = await fetchPage(`${BASE}/${req.params.slug}.php`);
    const $ = cheerio.load(html);

    const phone_name = $('h1[data-spec="modelname"]').text().trim() ||
      $('h1.specs-phone-name-title').text().trim() || $('h1').first().text().trim();
    const brand = $('.specs-b-head-details a').text().trim() || phone_name.split(' ')[0];

    const imgEl = $('div.specs-phone-img img').attr('src') ||
      $('div.review-header img').attr('src') || '';
    const image = imgEl ? (imgEl.startsWith('//') ? 'https:' + imgEl : imgEl.startsWith('http') ? imgEl : 'https://fdn2.gsmarena.com' + imgEl) : '';

    const quickSpec = [];
    const qs = new Set();
    const pushQ = (name, value) => {
      let v = value.replace(/""+/g, '"').replace(/\s+/g, ' ').trim();
      // Remove secondary values after newlines/tabs
      v = v.split(/[\n\r\t]+/)[0].trim();
      // Remove trailing secondary info like extra resolution after camera MP
      if (name === 'Camera' || name === 'Main Camera') {
        v = v.replace(/\s+\d+p.*$/, '').trim(); // Remove "1080p..." suffix
      }
      if (name === 'RAM') {
        v = v.replace(/\s+Unisoc.*$/i, '').replace(/\s+Qualcomm.*$/i, '').replace(/\s+MediaTek.*$/i, '').trim();
      }
      if (name && v && !qs.has(name)) { qs.add(name); quickSpec.push({ name, value: v }); }
    };

    // Extract quickSpec from data-spec spans (brief section has no <li> tags)
    const qMap = [
      ['Display', 'displaysize-hl', '"'],
      ['Camera', 'camerapixels-hl', ' MP'],
      ['RAM', 'ramsize-hl', ' GB'],
    ];
    for (const [name, spec, suffix] of qMap) {
      const v = $(`span[data-spec="${spec}"]`).text().trim();
      if (v && !qs.has(name)) pushQ(name, v + suffix);
    }

    // Chipset
    const ch = $('div[data-spec="chipset-hl"]').text().trim();
    if (ch && !qs.has('Chipset')) pushQ('Chipset', ch);

    const detailSpec = [];
    $('table').each((_, table) => {
      const cat = $(table).find('th').first().text().trim();
      if (!cat || SKIP_CATS.has(cat)) return;
      const specs = [];
      $(table).find('tr').each((_, tr) => {
        const ttl = $(tr).find('td.ttl').text().trim();
        const nfo = $(tr).find('td.nfo').text().trim();
        if (!ttl || !nfo || ttl === nfo || SKIP_SPECS.has(ttl) || /sar/i.test(ttl)) return;
        let val = nfo.replace(/\n/g, ', ').replace(/\s+/g, ' ').trim();
        val = val.split(', ').filter(l => !/\d+:\d+h/i.test(l) && !/AnTuTu|GeekBench|3DMark|DXOMARK|LUFS|nits.*brightness/i.test(l)).join(', ');
        if (val && val !== 'N/A') specs.push({ name: ttl, value: val });
      });
      if (specs.length > 0) detailSpec.push({ category: cat, specifications: specs });
    });

    res.json({ data: { phone_name, brand, image, quickSpec, detailSpec } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== LATEST PHONES =====
app.get('/api/latest', async (req, res) => {
  try {
    const html = await fetchPage(`${BASE}/latest.php`);
    const $ = cheerio.load(html);
    const phones = [];
    const seen = new Set();
    $('div.review-body-v2, .article-body li, .phones-list li, #review-body li').each((_, el) => {
      const a = $(el).find('a').first();
      const href = a.attr('href');
      const name = a.text().trim() || $(el).find('strong').text().trim();
      const img = $(el).find('img').attr('src') || '';
      if (href && name && !seen.has(href)) {
        seen.add(href);
        const slug = href.replace('.php', '');
        const brand = name.split(' ')[0].toLowerCase();
        phones.push({ slug, phone_name: name, brand, image: img ? (img.startsWith('//') ? 'https:' + img : img.startsWith('http') ? img : 'https://fdn2.gsmarena.com' + img) : '' });
      }
    });
    // Fallback: scrape brand pages if latest page doesn't work
    if (phones.length === 0) {
      const fallbackSlugs = ['samsung-phones-9', 'apple-phones-48', 'xiaomi-phones-80'];
      for (const s of fallbackSlugs) {
        const ph = await fetchBrandPhones(s);
        for (const p of ph.slice(0, 5)) {
          if (!seen.has(p.slug)) { seen.add(p.slug); phones.push(p); }
        }
      }
    }
    res.json({ data: phones.slice(0, 20) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== TOP BY INTEREST =====
app.get('/api/top-by-interest', async (req, res) => {
  try {
    const html = await fetchPage(`${BASE}/top-phones-interest.php`);
    const $ = cheerio.load(html);
    const phones = [];
    const seen = new Set();
    $('div.review-body-v2, .article-body li, .phones-list li').each((_, el) => {
      const a = $(el).find('a').first();
      const href = a.attr('href');
      const name = a.text().trim() || $(el).find('strong').text().trim();
      const img = $(el).find('img').attr('src') || '';
      if (href && name && !seen.has(href)) {
        seen.add(href);
        const slug = href.replace('.php', '');
        const brand = name.split(' ')[0].toLowerCase();
        phones.push({ slug, phone_name: name, brand, image: img ? (img.startsWith('//') ? 'https:' + img : img.startsWith('http') ? img : 'https://fdn2.gsmarena.com' + img) : '' });
      }
    });
    if (phones.length === 0) {
      const fallbackSlugs = ['samsung-phones-9', 'apple-phones-48', 'google-phones-107'];
      for (const s of fallbackSlugs) {
        const ph = await fetchBrandPhones(s);
        for (const p of ph.slice(0, 5)) {
          if (!seen.has(p.slug)) { seen.add(p.slug); phones.push(p); }
        }
      }
    }
    res.json({ data: phones.slice(0, 20) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== KEEPALIVE (self-ping to prevent Render sleep) =====
const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 3001}`;
setInterval(async () => {
  try {
    const res = await fetch(`${SELF_URL}/api/brands`, { signal: AbortSignal.timeout(5000) });
    console.log(`[keepalive] ping OK (${res.status})`);
  } catch {
    console.log('[keepalive] ping failed (expected during cold start)');
  }
}, 8 * 60 * 1000);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
