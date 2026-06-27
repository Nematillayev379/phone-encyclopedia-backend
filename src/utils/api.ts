import axios from 'axios';
import type { Phone, PhoneDetail, Brand } from '../types/phone';

import staticBrands from '../data/staticBrands.json';
import staticBrandPhones from '../data/staticBrandPhones.json';
import staticLatest from '../data/staticLatest.json';
import staticTop from '../data/staticTop.json';
import staticDetails from '../data/staticDetails.json';

const api = axios.create({
  baseURL: '/api',
  timeout: 8000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.warn('[api] request failed:', err?.config?.url, err?.message);
    return Promise.reject(err);
  }
);

const CACHE_PREFIX = 'phone_cache_';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

function getCached<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(CACHE_PREFIX))
      .slice(0, 50)
      .forEach((k) => localStorage.removeItem(k));
  }
}

export async function getBrands(): Promise<Brand[]> {
  try {
    const cacheKey = 'brands';
    const cached = getCached<Brand[]>(cacheKey);
    if (cached) return cached;

    const { data: raw } = await api.get('/brands');
    const brands = raw.data || raw;
    setCache(cacheKey, brands);
    return brands;
  } catch {
    return staticBrands.data || staticBrands;
  }
}

export async function getPhonesByBrand(brandSlug: string, page = 1): Promise<Phone[]> {
  try {
    const cacheKey = `phones_${brandSlug}_${page}`;
    const cached = getCached<Phone[]>(cacheKey);
    if (cached) return cached;

    const { data: raw } = await api.get(`/brands/${brandSlug}`, { params: { page } });
    const phones = raw.data || raw;
    setCache(cacheKey, phones);
    return phones;
  } catch {
    const brandData = (staticBrandPhones as Record<string, { data: Phone[] }>)[brandSlug];
    return brandData?.data || [];
  }
}

export async function getPhoneDetail(slug: string): Promise<PhoneDetail | null> {
  try {
    const cacheKey = `phone_${slug}`;
    const cached = getCached<PhoneDetail>(cacheKey);
    if (cached) return cached;

    const { data: raw } = await api.get(`/phone/${slug}`);
    const phoneSpec = raw.data || raw;
    setCache(cacheKey, phoneSpec);
    return phoneSpec as PhoneDetail;
  } catch {
    const detail = (staticDetails as Record<string, { data: PhoneDetail }>)[slug];
    return detail?.data || null;
  }
}

export async function searchPhones(query: string): Promise<Phone[]> {
  try {
    const cacheKey = `search_${query}`;
    const cached = getCached<Phone[]>(cacheKey);
    if (cached) return cached;

    const { data: raw } = await api.get('/search', { params: { query } });
    const phones = raw.data || raw;
    setCache(cacheKey, phones);
    return phones;
  } catch {
    const q = query.toLowerCase();
    const allPhones: Phone[] = [];
    for (const brandData of Object.values(staticBrandPhones) as { data: Phone[] }[]) {
      for (const p of brandData.data || []) {
        if (p.phone_name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) {
          allPhones.push(p);
        }
      }
    }
    return allPhones.slice(0, 20);
  }
}

export async function getLatestPhones(): Promise<Phone[]> {
  try {
    const cacheKey = 'latest';
    const cached = getCached<Phone[]>(cacheKey);
    if (cached) return cached;

    const { data: raw } = await api.get('/latest');
    const phones = raw.data || raw;
    setCache(cacheKey, phones);
    return phones;
  } catch {
    return staticLatest.data || staticLatest;
  }
}

export async function getTopPhones(): Promise<Phone[]> {
  try {
    const cacheKey = 'top';
    const cached = getCached<Phone[]>(cacheKey);
    if (cached) return cached;

    const { data: raw } = await api.get('/top-by-interest');
    const phones = raw.data || raw;
    setCache(cacheKey, phones);
    return phones;
  } catch {
    return staticTop.data || staticTop;
  }
}
