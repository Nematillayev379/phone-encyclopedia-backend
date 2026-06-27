import type { PhoneDetail } from '../types/phone';

export const MOCK_PHONES: PhoneDetail[] = [
  {
    phone_name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg',
    quickSpec: [
      { name: 'Display', value: '6.9" LTPO Super Retina XDR OLED' },
      { name: 'Chipset', value: 'Apple A18 Pro' },
      { name: 'RAM', value: '8 GB' },
      { name: 'Storage', value: '256/512 GB, 1TB' },
      { name: 'Camera', value: '48 MP + 12 MP + 12 MP' },
      { name: 'Battery', value: '4685 mAh' },
      { name: 'OS', value: 'iOS 18' },
      { name: 'Weight', value: '227 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Type', value: 'LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision' },
          { name: 'Size', value: '6.9 inches, 114.3 cm² (~89.8% screen-to-body ratio)' },
          { name: 'Resolution', value: '1320 x 2868 pixels (~460 ppi density)' },
          { name: 'Protection', value: 'Ceramic Shield glass, oleophobic coating' },
          { name: 'Brightness', value: '2000 nits (HBM), 1600 nits (HDR), 1 nits (always-on)' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '48 MP, f/1.78, 24mm (wide), 1/1.28", sensor-shift OIS' },
          { name: 'Telephoto', value: '12 MP, f/2.8, 120mm, 3.5x optical zoom, OIS' },
          { name: 'Ultrawide', value: '48 MP, f/2.2, 13mm, 120° FOV, sensor-shift OIS' },
          { name: 'Features', value: 'ProRAW, Photonic Engine, 4K@120fps Dolby Vision' },
          { name: 'Front Camera', value: '12 MP, f/1.9, 23mm (wide), SL 3D, HDR, Cinematic mode' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'Apple A18 Pro (3 nm)' },
          { name: 'CPU', value: 'Hexa-core (2x4.05 GHz + 4x2.2 GHz)' },
          { name: 'GPU', value: 'Apple GPU (6-core graphics)' },
          { name: 'OS', value: 'iOS 18, upgradable to iOS 18.5' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '8 GB' },
          { name: 'Storage', value: '256 GB / 512 GB / 1 TB (NVMe)' },
          { name: 'Card Slot', value: 'No' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Dimensions', value: '163 x 77.6 x 8.3 mm' },
          { name: 'Weight', value: '227 g (7.97 oz)' },
          { name: 'Build', value: 'Titanium frame, Ceramic Shield front, textured glass back' },
          { name: 'SIM', value: 'Nano-SIM + eSIM (International), Dual eSIM (USA)' },
          { name: 'Water Resistance', value: 'IP68 (6m for 30 min)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Li-Ion 4685 mAh, non-removable' },
          { name: 'Charging', value: 'Wired, 50% in 35 min (advertised)' },
          { name: 'Wireless', value: '25W MagSafe, 15W Qi2' },
          { name: 'Video Playback', value: 'Up to 33 hours' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers' },
          { name: '3.5mm Jack', value: 'No' },
          { name: 'Audio', value: 'Dolby Atmos, Spatial Audio' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 7 (802.11 a/b/g/n/ac/ax/be), dual-band' },
          { name: 'Bluetooth', value: '5.3, A2DP, LE' },
          { name: 'Positioning', value: 'GPS (L1+L5), GLONASS, Galileo, QZSS, BeiDou, NavIC' },
          { name: 'NFC', value: 'Yes' },
          { name: 'USB', value: 'USB Type-C 3.2 Gen 2, DisplayPort' },
        ],
      },
    ],
  },
  {
    phone_name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-ultra.jpg',
    quickSpec: [
      { name: 'Display', value: '6.9" Dynamic LTPO AMOLED 2X' },
      { name: 'Chipset', value: 'Snapdragon 8 Elite' },
      { name: 'RAM', value: '12 GB' },
      { name: 'Storage', value: '256/512 GB, 1TB' },
      { name: 'Camera', value: '200 MP + 50 MP + 10 MP + 50 MP' },
      { name: 'Battery', value: '5000 mAh' },
      { name: 'OS', value: 'Android 15, One UI 7' },
      { name: 'Weight', value: '218 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Type', value: 'Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, 3000 nits peak' },
          { name: 'Size', value: '6.9 inches (~91.4% screen-to-body ratio)' },
          { name: 'Resolution', value: '1440 x 3120 pixels (QHD+)' },
          { name: 'Protection', value: 'Corning Gorilla Armor 2' },
          { name: 'Always-on Display', value: 'Yes' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '200 MP, f/1.7, 23mm (wide), 1/1.3", OIS, Laser AF' },
          { name: 'Telephoto 1', value: '50 MP, f/2.8, 120mm (5x optical zoom), OIS' },
          { name: 'Telephoto 2', value: '10 MP, f/2.4, 67mm (3x optical zoom), OIS' },
          { name: 'Ultrawide', value: '50 MP, f/1.9, 13mm, 120° FOV' },
          { name: 'Features', value: '8K@30fps, 4K@120fps, AI Photo Editor, Nightography' },
          { name: 'Front Camera', value: '12 MP, f/2.2, 26mm (wide), HDR, 4K@60fps' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'Qualcomm Snapdragon 8 Elite (3 nm)' },
          { name: 'CPU', value: 'Octa-core (2x4.47 GHz + 6x3.53 GHz)' },
          { name: 'GPU', value: 'Adreno 830' },
          { name: 'OS', value: 'Android 15, One UI 7, up to 7 major Android upgrades' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '12 GB' },
          { name: 'Storage', value: '256 GB / 512 GB / 1 TB (UFS 4.0)' },
          { name: 'Card Slot', value: 'No' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Dimensions', value: '162.8 x 77.6 x 8.2 mm' },
          { name: 'Weight', value: '218 g' },
          { name: 'Build', value: 'Titanium frame, Gorilla Armor 2 front, Gorilla Glass Victus 2 back' },
          { name: 'SIM', value: 'Nano-SIM + eSIM / Dual eSIM' },
          { name: 'Water Resistance', value: 'IP68 (1.5m for 30 min)' },
          { name: 'S Pen', value: 'Yes, integrated (Bluetooth, gestures)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Li-Ion 5000 mAh, non-removable' },
          { name: 'Charging', value: '45W wired, 50% in 22 min' },
          { name: 'Wireless', value: '15W Qi2, 4.5W reverse wireless' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers (AKG tuned)' },
          { name: '3.5mm Jack', value: 'No' },
          { name: 'Audio', value: '32-bit/384kHz audio, Dolby Atmos' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 7 (802.11 a/b/g/n/ac/ax/be), tri-band' },
          { name: 'Bluetooth', value: '5.4, A2DP, LE' },
          { name: 'Positioning', value: 'GPS (L1+L5), GLONASS, BDS, GALILEO, QZSS' },
          { name: 'NFC', value: 'Yes' },
          { name: 'USB', value: 'USB Type-C 3.2 Gen 2, DisplayPort 1.2' },
          { name: 'UWB', value: 'Yes, UWB (Ultra-Wideband)' },
        ],
      },
    ],
  },
  {
    phone_name: 'Xiaomi 15 Ultra',
    brand: 'Xiaomi',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-15-ultra.jpg',
    quickSpec: [
      { name: 'Display', value: '6.73" LTPO AMOLED, 120Hz' },
      { name: 'Chipset', value: 'Snapdragon 8 Elite' },
      { name: 'RAM', value: '16 GB' },
      { name: 'Storage', value: '256/512 GB, 1TB' },
      { name: 'Camera', value: '50 MP + 50 MP + 200 MP' },
      { name: 'Battery', value: '5810 mAh' },
      { name: 'OS', value: 'Android 15, HyperOS 2' },
      { name: 'Weight', value: '229 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Type', value: 'LTPO AMOLED, 120Hz, Dolby Vision, HDR10+' },
          { name: 'Size', value: '6.73 inches (~90% screen-to-body ratio)' },
          { name: 'Resolution', value: '1440 x 3200 pixels (QHD+)' },
          { name: 'Brightness', value: '3200 nits peak' },
          { name: 'Protection', value: 'Xiaomi Shield Glass' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '200 MP, f/1.63, 23mm (wide), 1/1.4", Leica lenses, OIS' },
          { name: 'Telephoto', value: '50 MP, f/2.5, 120mm (5x optical zoom), OIS' },
          { name: 'Ultrawide', value: '50 MP, f/2.2, 13mm, 122° FOV, macro' },
          { name: 'Features', value: 'Leica Summilux optics, 8K video, HDR10+' },
          { name: 'Front Camera', value: '32 MP, f/2.0, 23mm (wide)' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'Qualcomm Snapdragon 8 Elite (3 nm)' },
          { name: 'CPU', value: 'Octa-core (2x4.47 GHz Oryon V2 Phoenix L + 6x3.53 GHz Oryon V2 Phoenix M)' },
          { name: 'GPU', value: 'Adreno 830' },
          { name: 'OS', value: 'Android 15, HyperOS 2.0' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '12/16 GB (LPDDR5X)' },
          { name: 'Storage', value: '256 GB / 512 GB / 1 TB (UFS 4.0)' },
          { name: 'Card Slot', value: 'No' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Dimensions', value: '161.4 x 75.3 x 9.4 mm' },
          { name: 'Weight', value: '229 g' },
          { name: 'Build', value: 'Aluminum frame, ceramic back' },
          { name: 'SIM', value: 'Nano-SIM + eSIM / Dual Nano-SIM' },
          { name: 'Water Resistance', value: 'IP68 (1.5m for 30 min)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Li-Po 5810 mAh (Silicon-Carbon), non-removable' },
          { name: 'Charging', value: '90W wired, 100% in 30 min' },
          { name: 'Wireless', value: '80W wireless, 10W reverse wireless' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers' },
          { name: '3.5mm Jack', value: 'No' },
          { name: 'Audio', value: 'Hi-Res Audio, Dolby Atmos' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 7 (802.11 a/b/g/n/ac/ax/be), dual-band' },
          { name: 'Bluetooth', value: '5.4, A2DP, LE, aptX HD, LDAC' },
          { name: 'Positioning', value: 'GPS (L1+L5), GLONASS, BDS, GALILEO' },
          { name: 'NFC', value: 'Yes' },
          { name: 'USB', value: 'USB Type-C 3.2 Gen 2' },
        ],
      },
    ],
  },
  {
    phone_name: 'Google Pixel 9 Pro',
    brand: 'Google',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/google-pixel9-pro.jpg',
    quickSpec: [
      { name: 'Display', value: '6.3" LTPO OLED, 120Hz' },
      { name: 'Chipset', value: 'Google Tensor G4' },
      { name: 'RAM', value: '16 GB' },
      { name: 'Storage', value: '128/256/512 GB, 1TB' },
      { name: 'Camera', value: '50 MP + 48 MP + 48 MP' },
      { name: 'Battery', value: '4700 mAh' },
      { name: 'OS', value: 'Android 14, up to Android 19' },
      { name: 'Weight', value: '199 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Type', value: 'LTPO OLED, 120Hz, HDR, 3000 nits peak' },
          { name: 'Size', value: '6.3 inches (~88.3% screen-to-body ratio)' },
          { name: 'Resolution', value: '1280 x 2856 pixels (FHD+)' },
          { name: 'Protection', value: 'Gorilla Glass Victus 2' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '50 MP, f/1.68, 25mm (wide), 1/1.31", Dual pixel PDAF, OIS, Laser AF' },
          { name: 'Telephoto', value: '48 MP, f/2.8, 113mm (5x optical zoom), OIS' },
          { name: 'Ultrawide', value: '48 MP, f/1.7, 123° FOV, macro' },
          { name: 'Features', value: 'Google AI, Magic Eraser, Photo Unblur, Best Take' },
          { name: 'Front Camera', value: '42 MP, f/2.2, 17mm (ultrawide), autofocus' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'Google Tensor G4 (4 nm)' },
          { name: 'CPU', value: 'Octa-core (1x3.1 GHz Cortex-X4 + 3x2.6 GHz Cortex-A720 + 4x1.92 GHz Cortex-A520)' },
          { name: 'GPU', value: 'Mali-G715 MC7' },
          { name: 'OS', value: 'Android 14, 7 years of updates' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '16 GB' },
          { name: 'Storage', value: '128 GB / 256 GB / 512 GB / 1 TB (UFS 3.1)' },
          { name: 'Card Slot', value: 'No' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Dimensions', value: '152.8 x 72 x 8.5 mm' },
          { name: 'Weight', value: '199 g' },
          { name: 'Build', value: 'Aluminum frame, Gorilla Glass Victus 2 front and back' },
          { name: 'SIM', value: 'Nano-SIM + eSIM' },
          { name: 'Water Resistance', value: 'IP68 (1.5m for 30 min)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Li-Ion 4700 mAh, non-removable' },
          { name: 'Charging', value: '27W wired, 50% in 30 min' },
          { name: 'Wireless', value: '21W wireless, 5W reverse wireless' },
          { name: 'Battery Life', value: '24+ hours (Adaptive Battery)' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers' },
          { name: '3.5mm Jack', value: 'No' },
          { name: 'Audio', value: '32-bit/384kHz audio' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 7 (802.11 a/b/g/n/ac/ax/be), tri-band' },
          { name: 'Bluetooth', value: '5.3, A2DP, LE, aptX HD' },
          { name: 'Positioning', value: 'GPS (L1+L5), GLONASS, BDS, GALILEO, QZSS' },
          { name: 'NFC', value: 'Yes' },
          { name: 'USB', value: 'USB Type-C 3.2 Gen 2, DisplayPort 1.4' },
        ],
      },
    ],
  },
  {
    phone_name: 'Samsung Galaxy Z Fold 6',
    brand: 'Samsung',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold6.jpg',
    quickSpec: [
      { name: 'Display', value: '7.6" Foldable Dynamic AMOLED 2X' },
      { name: 'Chipset', value: 'Snapdragon 8 Gen 3' },
      { name: 'RAM', value: '12 GB' },
      { name: 'Storage', value: '256/512 GB, 1TB' },
      { name: 'Camera', value: '50 MP + 12 MP + 10 MP' },
      { name: 'Battery', value: '4400 mAh' },
      { name: 'OS', value: 'Android 14, One UI 6.1' },
      { name: 'Weight', value: '239 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Main Display', value: '7.6" Foldable Dynamic AMOLED 2X, 120Hz, HDR10+' },
          { name: 'Cover Display', value: '6.3" Dynamic AMOLED 2X, 120Hz, Corning Gorilla Glass Victus 2' },
          { name: 'Main Resolution', value: '1856 x 2160 pixels (~374 ppi)' },
          { name: 'Cover Resolution', value: '968 x 2376 pixels (~402 ppi)' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '50 MP, f/1.8, 23mm (wide), OIS, Dual Pixel PDAF' },
          { name: 'Telephoto', value: '10 MP, f/2.4, 67mm (3x optical zoom), OIS' },
          { name: 'Ultrawide', value: '12 MP, f/2.2, 123° FOV' },
          { name: 'Front Camera', value: '10 MP, f/2.2, 24mm (wide)' },
          { name: 'Under-display Camera', value: '4 MP, f/1.8, 1.4μm' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'Qualcomm Snapdragon 8 Gen 3 (4 nm)' },
          { name: 'CPU', value: 'Octa-core (1x3.39GHz Cortex-X4 + 3x3.1GHz Cortex-A720 + 2x2.9GHz Cortex-A720 + 2x2.2GHz Cortex-A520)' },
          { name: 'GPU', value: 'Adreno 750' },
          { name: 'OS', value: 'Android 14, One UI 6.1, Galaxy AI' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '12 GB' },
          { name: 'Storage', value: '256 GB / 512 GB / 1 TB (UFS 4.0)' },
          { name: 'Card Slot', value: 'No' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Unfolded', value: '153.5 x 132.6 x 5.6 mm' },
          { name: 'Folded', value: '153.5 x 68.1 x 12.1 mm' },
          { name: 'Weight', value: '239 g' },
          { name: 'Build', value: 'Armor Aluminum frame, Gorilla Glass Victus 2' },
          { name: 'Hinge', value: 'Dual Rail Hinge, Flex Mode' },
          { name: 'SIM', value: 'Nano-SIM + eSIM' },
          { name: 'Water Resistance', value: 'IPX8 (1.5m for 30 min)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Li-Ion 4400 mAh, non-removable' },
          { name: 'Charging', value: '25W wired, 50% in 30 min' },
          { name: 'Wireless', value: '15W wireless, 4.5W reverse wireless' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers (Dolby Atmos)' },
          { name: '3.5mm Jack', value: 'No' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 6E (802.11 a/b/g/n/ac/ax), tri-band' },
          { name: 'Bluetooth', value: '5.3, A2DP, LE' },
          { name: 'Positioning', value: 'GPS (L1+L5), GLONASS, BDS, GALILEO, QZSS' },
          { name: 'NFC', value: 'Yes' },
          { name: 'USB', value: 'USB Type-C 3.2 Gen 2, DisplayPort 1.2' },
        ],
      },
    ],
  },
  {
    phone_name: 'OnePlus 13',
    brand: 'OnePlus',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/oneplus-13.jpg',
    quickSpec: [
      { name: 'Display', value: '6.82" LTPO AMOLED, 120Hz' },
      { name: 'Chipset', value: 'Snapdragon 8 Elite' },
      { name: 'RAM', value: '12/16 GB' },
      { name: 'Storage', value: '256/512 GB, 1TB' },
      { name: 'Camera', value: '50 MP + 50 MP + 50 MP' },
      { name: 'Battery', value: '6000 mAh' },
      { name: 'OS', value: 'Android 15, OxygenOS 15' },
      { name: 'Weight', value: '213 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Type', value: 'LTPO AMOLED, 120Hz, Dolby Vision, HDR10+' },
          { name: 'Size', value: '6.82 inches (~91% screen-to-body ratio)' },
          { name: 'Resolution', value: '1440 x 3168 pixels (QHD+)' },
          { name: 'Brightness', value: '4500 nits peak' },
          { name: 'Protection', value: 'Ceramic Guard 2' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '50 MP, f/1.6, 23mm (wide), 1/1.43", OIS, PDAF' },
          { name: 'Telephoto', value: '50 MP, f/2.6, 73mm (3x optical zoom), OIS' },
          { name: 'Ultrawide', value: '50 MP, f/2.0, 14mm, 120° FOV' },
          { name: 'Features', value: 'Hasselblad Color Calibration, 4K@60fps, Dolby Vision' },
          { name: 'Front Camera', value: '32 MP, f/2.4, 21mm (wide)' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'Qualcomm Snapdragon 8 Elite (3 nm)' },
          { name: 'CPU', value: 'Octa-core (2x4.47 GHz Oryon V2 Phoenix L + 6x3.53 GHz Oryon V2 Phoenix M)' },
          { name: 'GPU', value: 'Adreno 830' },
          { name: 'OS', value: 'Android 15, OxygenOS 15' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '12/16 GB (LPDDR5X)' },
          { name: 'Storage', value: '256 GB / 512 GB / 1 TB (UFS 4.0)' },
          { name: 'Card Slot', value: 'No' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Dimensions', value: '162.9 x 76.5 x 8.5 mm' },
          { name: 'Weight', value: '213 g' },
          { name: 'Build', value: 'Aluminum frame, Gorilla Glass 7i back, silicon-carbon' },
          { name: 'SIM', value: 'Nano-SIM + eSIM' },
          { name: 'Water Resistance', value: 'IP69 (dust/water resistant)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Si/C Li-Ion 6000 mAh, non-removable' },
          { name: 'Charging', value: '100W SUPERVOOC, 100% in 26 min' },
          { name: 'Wireless', value: '50W wireless, 10W reverse wireless' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers' },
          { name: '3.5mm Jack', value: 'No' },
          { name: 'Audio', value: '24-bit/192kHz Hi-Res Audio' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 7 (802.11 a/b/g/n/ac/ax/be)' },
          { name: 'Bluetooth', value: '5.4, A2DP, LE, aptX HD, LDAC' },
          { name: 'Positioning', value: 'GPS (L1+L5), GLONASS, BDS, GALILEO, QZSS' },
          { name: 'NFC', value: 'Yes' },
          { name: 'USB', value: 'USB Type-C 3.2 Gen 1' },
        ],
      },
    ],
  },
  {
    phone_name: 'iPhone 16',
    brand: 'Apple',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg',
    quickSpec: [
      { name: 'Display', value: '6.1" Super Retina XDR OLED' },
      { name: 'Chipset', value: 'Apple A18' },
      { name: 'RAM', value: '8 GB' },
      { name: 'Storage', value: '128/256/512 GB' },
      { name: 'Camera', value: '48 MP + 12 MP' },
      { name: 'Battery', value: '3561 mAh' },
      { name: 'OS', value: 'iOS 18' },
      { name: 'Weight', value: '170 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Type', value: 'Super Retina XDR OLED, 60Hz, HDR10, Dolby Vision' },
          { name: 'Size', value: '6.1 inches (~87% screen-to-body ratio)' },
          { name: 'Resolution', value: '1179 x 2556 pixels (~460 ppi)' },
          { name: 'Protection', value: 'Ceramic Shield glass' },
          { name: 'Brightness', value: '2000 nits (HBM), 1600 nits (HDR)' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '48 MP, f/1.6, 26mm (wide), 1/1.56", sensor-shift OIS' },
          { name: 'Ultrawide', value: '12 MP, f/2.2, 13mm, 120° FOV' },
          { name: 'Features', value: 'Photonic Engine, 4K@60fps, Action Button' },
          { name: 'Front Camera', value: '12 MP, f/1.9, 23mm (wide), autofocus' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'Apple A18 (3 nm)' },
          { name: 'CPU', value: 'Hexa-core (2x4.04 GHz + 4x2.2 GHz)' },
          { name: 'GPU', value: 'Apple GPU (5-core graphics)' },
          { name: 'OS', value: 'iOS 18' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '8 GB' },
          { name: 'Storage', value: '128 GB / 256 GB / 512 GB (NVMe)' },
          { name: 'Card Slot', value: 'No' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Dimensions', value: '147.6 x 71.6 x 7.8 mm' },
          { name: 'Weight', value: '170 g' },
          { name: 'Build', value: 'Aluminum frame, Ceramic Shield front, color-infused glass back' },
          { name: 'SIM', value: 'Nano-SIM + eSIM' },
          { name: 'Water Resistance', value: 'IP68 (6m for 30 min)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Li-Ion 3561 mAh, non-removable' },
          { name: 'Charging', value: 'Wired, 50% in 30 min' },
          { name: 'Wireless', value: '25W MagSafe, 15W Qi2' },
          { name: 'Video Playback', value: 'Up to 22 hours' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers' },
          { name: '3.5mm Jack', value: 'No' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 7 (802.11 a/b/g/n/ac/ax/be)' },
          { name: 'Bluetooth', value: '5.3, A2DP, LE' },
          { name: 'Positioning', value: 'GPS (L1+L5), GLONASS, Galileo, QZSS, BeiDou' },
          { name: 'NFC', value: 'Yes' },
          { name: 'USB', value: 'USB Type-C 2.0' },
        ],
      },
    ],
  },
  {
    phone_name: 'Samsung Galaxy A55',
    brand: 'Samsung',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg',
    quickSpec: [
      { name: 'Display', value: '6.6" Super AMOLED, 120Hz' },
      { name: 'Chipset', value: 'Exynos 1480' },
      { name: 'RAM', value: '6/8/12 GB' },
      { name: 'Storage', value: '128/256 GB' },
      { name: 'Camera', value: '50 MP + 12 MP + 5 MP' },
      { name: 'Battery', value: '5000 mAh' },
      { name: 'OS', value: 'Android 14, One UI 6.1' },
      { name: 'Weight', value: '213 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Type', value: 'Super AMOLED, 120Hz, HDR10+' },
          { name: 'Size', value: '6.6 inches (~85.8% screen-to-body ratio)' },
          { name: 'Resolution', value: '1080 x 2340 pixels (FHD+)' },
          { name: 'Brightness', value: '1000 nits (HBM)' },
          { name: 'Protection', value: 'Corning Gorilla Glass Victus+' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '50 MP, f/1.8, 25mm (wide), OIS' },
          { name: 'Telephoto', value: '12 MP, f/2.0, 2x optical zoom' },
          { name: 'Macro', value: '5 MP, f/2.4' },
          { name: 'Features', value: 'LED flash, HDR, panorama, 4K@30fps' },
          { name: 'Front Camera', value: '32 MP, f/2.2, 26mm (wide)' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'Samsung Exynos 1480 (4 nm)' },
          { name: 'CPU', value: 'Octa-core (4x2.75 GHz Cortex-A78 + 4x2.0 GHz Cortex-A55)' },
          { name: 'GPU', value: 'Xclipse 530' },
          { name: 'OS', value: 'Android 14, One UI 6.1, up to 4 major Android upgrades' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '6/8/12 GB' },
          { name: 'Storage', value: '128 GB / 256 GB (UFS 3.1)' },
          { name: 'Card Slot', value: 'microSDXC (uses shared SIM slot)' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Dimensions', value: '161.1 x 77.4 x 9.0 mm' },
          { name: 'Weight', value: '213 g' },
          { name: 'Build', value: 'Gorilla Glass Victus+ front, glass back, aluminum frame' },
          { name: 'SIM', value: 'Nano-SIM + eSIM / Dual Nano-SIM' },
          { name: 'Water Resistance', value: 'IP67 (1m for 30 min)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Li-Ion 5000 mAh, non-removable' },
          { name: 'Charging', value: '25W wired, 50% in 30 min' },
          { name: 'Wireless', value: 'No' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers' },
          { name: '3.5mm Jack', value: 'No' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 6 (802.11 a/b/g/n/ac/ax)' },
          { name: 'Bluetooth', value: '5.3, A2DP, LE' },
          { name: 'Positioning', value: 'GPS, GLONASS, BDS, GALILEO, QZSS' },
          { name: 'NFC', value: 'Yes (market dependent)' },
          { name: 'USB', value: 'USB Type-C 2.0, OTG' },
        ],
      },
    ],
  },
  {
    phone_name: 'Xiaomi Redmi Note 13 Pro+',
    brand: 'Xiaomi',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-pro-plus.jpg',
    quickSpec: [
      { name: 'Display', value: '6.67" AMOLED, 120Hz' },
      { name: 'Chipset', value: 'MediaTek Dimensity 7200 Ultra' },
      { name: 'RAM', value: '8/12 GB' },
      { name: 'Storage', value: '256/512 GB' },
      { name: 'Camera', value: '200 MP + 8 MP + 2 MP' },
      { name: 'Battery', value: '5000 mAh' },
      { name: 'OS', value: 'Android 13, MIUI 14' },
      { name: 'Weight', value: '187 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Type', value: 'AMOLED, 120Hz, HDR10+, Dolby Vision, 1800 nits peak' },
          { name: 'Size', value: '6.67 inches (~89% screen-to-body ratio)' },
          { name: 'Resolution', value: '1220 x 2712 pixels (~446 ppi)' },
          { name: 'Protection', value: 'Corning Gorilla Glass Victus' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '200 MP, f/1.65, 23mm (wide), 1/1.4", OIS, PDAF' },
          { name: 'Ultrawide', value: '8 MP, f/2.2, 120° FOV' },
          { name: 'Macro', value: '2 MP, f/2.4' },
          { name: 'Features', value: 'OIS+EIS, 4K@30fps, Xiaomi Imaging Engine' },
          { name: 'Front Camera', value: '16 MP, f/2.4, 25mm (wide)' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'MediaTek Dimensity 7200 Ultra (4 nm)' },
          { name: 'CPU', value: 'Octa-core (2x2.8 GHz Cortex-A715 + 6x2.0 GHz Cortex-A510)' },
          { name: 'GPU', value: 'Mali-G610 MC4' },
          { name: 'OS', value: 'Android 13, MIUI 14' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '8/12 GB (LPDDR4X)' },
          { name: 'Storage', value: '256 GB / 512 GB (UFS 3.1)' },
          { name: 'Card Slot', value: 'No' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Dimensions', value: '162.4 x 74.2 x 8.9 mm' },
          { name: 'Weight', value: '187 g' },
          { name: 'Build', value: 'Plastic frame, Gorilla Glass Victus front, plastic back or silicone polymer' },
          { name: 'SIM', value: 'Nano-SIM + eSIM / Dual Nano-SIM' },
          { name: 'Water Resistance', value: 'IP68 (1.5m for 30 min)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Li-Po 5000 mAh, non-removable' },
          { name: 'Charging', value: '120W wired, 100% in 19 min' },
          { name: 'Wireless', value: 'No' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers' },
          { name: '3.5mm Jack', value: 'Yes' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 6 (802.11 a/b/g/n/ac/ax)' },
          { name: 'Bluetooth', value: '5.3, A2DP, LE' },
          { name: 'Positioning', value: 'GPS, GLONASS, BDS, GALILEO' },
          { name: 'NFC', value: 'Yes (market dependent)' },
          { name: 'USB', value: 'USB Type-C 2.0, OTG' },
        ],
      },
    ],
  },
  {
    phone_name: 'Realme GT 6',
    brand: 'Realme',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/realme-gt6.jpg',
    quickSpec: [
      { name: 'Display', value: '6.78" LTPO AMOLED, 120Hz' },
      { name: 'Chipset', value: 'Snapdragon 8s Gen 3' },
      { name: 'RAM', value: '8/12/16 GB' },
      { name: 'Storage', value: '256/512 GB' },
      { name: 'Camera', value: '50 MP + 50 MP + 8 MP' },
      { name: 'Battery', value: '5500 mAh' },
      { name: 'OS', value: 'Android 14, Realme UI 5.0' },
      { name: 'Weight', value: '199 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Type', value: 'LTPO AMOLED, 120Hz, HDR10+, 6000 nits peak' },
          { name: 'Size', value: '6.78 inches (~91.3% screen-to-body ratio)' },
          { name: 'Resolution', value: '1264 x 2780 pixels (~450 ppi)' },
          { name: 'Protection', value: 'Corning Gorilla Glass Victus 2' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '50 MP, f/1.8, 26mm (wide), 1/1.95", Sony LYT-600, OIS, PDAF' },
          { name: 'Telephoto', value: '50 MP, f/2.0, 47mm (2x optical zoom)' },
          { name: 'Ultrawide', value: '8 MP, f/2.2, 112° FOV' },
          { name: 'Features', value: 'ProLight HDR, 4K@60fps, Street Photography 4.0' },
          { name: 'Front Camera', value: '32 MP, f/2.5, 22mm (wide)' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'Qualcomm Snapdragon 8s Gen 3 (4 nm)' },
          { name: 'CPU', value: 'Octa-core (1x3.0 GHz Cortex-X4 + 4x2.8 GHz Cortex-A720 + 3x2.0 GHz Cortex-A520)' },
          { name: 'GPU', value: 'Adreno 735' },
          { name: 'OS', value: 'Android 14, Realme UI 5.0' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '8/12/16 GB (LPDDR5X)' },
          { name: 'Storage', value: '256 GB / 512 GB (UFS 4.0)' },
          { name: 'Card Slot', value: 'No' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Dimensions', value: '162 x 75.1 x 8.6 mm' },
          { name: 'Weight', value: '199 g' },
          { name: 'Build', value: 'Plastic frame, Gorilla Glass Victus 2 front, plastic back' },
          { name: 'SIM', value: 'Nano-SIM + eSIM / Dual Nano-SIM' },
          { name: 'Water Resistance', value: 'IP65 (dust/water resistant)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Si/C Li-Ion 5500 mAh, non-removable' },
          { name: 'Charging', value: '120W wired, 50% in 10 min' },
          { name: 'Wireless', value: 'No' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers' },
          { name: '3.5mm Jack', value: 'No' },
          { name: 'Audio', value: 'Hi-Res Audio, Dolby Atmos' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 6 (802.11 a/b/g/n/ac/ax)' },
          { name: 'Bluetooth', value: '5.4, A2DP, LE, aptX HD, LDAC' },
          { name: 'Positioning', value: 'GPS (L1+L5), GLONASS, BDS, GALILEO, QZSS' },
          { name: 'NFC', value: 'Yes' },
          { name: 'USB', value: 'USB Type-C 2.0, OTG' },
        ],
      },
    ],
  },
  {
    phone_name: 'Nothing Phone (2a) Plus',
    brand: 'Nothing',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/nothing-phone-2a-plus.jpg',
    quickSpec: [
      { name: 'Display', value: '6.7" AMOLED, 120Hz' },
      { name: 'Chipset', value: 'MediaTek Dimensity 7350 Pro' },
      { name: 'RAM', value: '8/12 GB' },
      { name: 'Storage', value: '256 GB' },
      { name: 'Camera', value: '50 MP + 50 MP' },
      { name: 'Battery', value: '5000 mAh' },
      { name: 'OS', value: 'Android 14, Nothing OS 2.6' },
      { name: 'Weight', value: '190 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Type', value: 'AMOLED, 120Hz, HDR10+, 1300 nits peak' },
          { name: 'Size', value: '6.7 inches (~87.4% screen-to-body ratio)' },
          { name: 'Resolution', value: '1080 x 2412 pixels (FHD+)' },
          { name: 'Protection', value: 'Corning Gorilla Glass 5' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '50 MP, f/1.88, 24mm (wide), 1/1.57", OIS, PDAF' },
          { name: 'Ultrawide', value: '50 MP, f/2.2, 114° FOV' },
          { name: 'Features', value: 'Night Mode, HDR, 4K@30fps' },
          { name: 'Front Camera', value: '50 MP, f/2.2, 24mm (wide)' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'MediaTek Dimensity 7350 Pro (4 nm)' },
          { name: 'CPU', value: 'Octa-core (2x3.0 GHz Cortex-A715 + 6x2.0 GHz Cortex-A510)' },
          { name: 'GPU', value: 'Mali-G610 MC4' },
          { name: 'OS', value: 'Android 14, Nothing OS 2.6, up to 3 major Android upgrades' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '8/12 GB (LPDDR4X)' },
          { name: 'Storage', value: '256 GB (UFS 2.2)' },
          { name: 'Card Slot', value: 'No' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Dimensions', value: '161.7 x 76.3 x 8.6 mm' },
          { name: 'Weight', value: '190 g' },
          { name: 'Build', value: 'Plastic frame, Gorilla Glass 5 front, transparent plastic back, Glyph Interface' },
          { name: 'SIM', value: 'Nano-SIM + eSIM' },
          { name: 'Water Resistance', value: 'IP54 (dust and splash resistant)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Li-Ion 5000 mAh, non-removable' },
          { name: 'Charging', value: '50W wired, 50% in 22 min' },
          { name: 'Wireless', value: 'No' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers' },
          { name: '3.5mm Jack', value: 'No' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 6 (802.11 a/b/g/n/ac/ax)' },
          { name: 'Bluetooth', value: '5.3, A2DP, LE' },
          { name: 'Positioning', value: 'GPS, GLONASS, BDS, GALILEO, QZSS' },
          { name: 'NFC', value: 'Yes' },
          { name: 'USB', value: 'USB Type-C 2.0, OTG' },
        ],
      },
    ],
  },
  {
    phone_name: 'Huawei Pura 70 Ultra',
    brand: 'Huawei',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/huawei-pura-70-ultra.jpg',
    quickSpec: [
      { name: 'Display', value: '6.8" LTPO OLED, 120Hz' },
      { name: 'Chipset', value: 'Kirin 9010' },
      { name: 'RAM', value: '16 GB' },
      { name: 'Storage', value: '512 GB, 1TB' },
      { name: 'Camera', value: '50 MP + 40 MP + 50 MP' },
      { name: 'Battery', value: '5200 mAh' },
      { name: 'OS', value: 'HarmonyOS 4.2' },
      { name: 'Weight', value: '226 g' },
    ],
    detailSpec: [
      {
        category: 'Display',
        specifications: [
          { name: 'Type', value: 'LTPO OLED, 120Hz, HDR10, 2500 nits peak' },
          { name: 'Size', value: '6.8 inches (~89% screen-to-body ratio)' },
          { name: 'Resolution', value: '1260 x 2844 pixels (~460 ppi)' },
          { name: 'Protection', value: 'Kunlun Glass 2' },
        ],
      },
      {
        category: 'Camera',
        specifications: [
          { name: 'Main Camera', value: '50 MP, f/1.6-4.0, 23mm (wide), 1/0.98", retractable lens, OIS, PDAF' },
          { name: 'Telephoto', value: '50 MP, f/3.0, 125mm (3.5x optical zoom), OIS' },
          { name: 'Ultrawide', value: '40 MP, f/2.2, 13mm, 120° FOV' },
          { name: 'Features', value: 'Leica optics, XMAGE, 100x digital zoom' },
          { name: 'Front Camera', value: '13 MP, f/2.4, (wide)' },
        ],
      },
      {
        category: 'Platform',
        specifications: [
          { name: 'Chipset', value: 'Kirin 9010 (7 nm)' },
          { name: 'CPU', value: 'Octa-core (1x2.3 GHz TaiShan V120 + 3x2.18 GHz TaiShan V120 + 4x1.55 GHz Cortex-A510)' },
          { name: 'GPU', value: 'Maleoon 910' },
          { name: 'OS', value: 'HarmonyOS 4.2 (China), EMUI 14.2 (International)' },
        ],
      },
      {
        category: 'Memory',
        specifications: [
          { name: 'RAM', value: '16 GB' },
          { name: 'Storage', value: '512 GB / 1 TB (UFS 3.1)' },
          { name: 'Card Slot', value: 'NM (Nano Memory), up to 256 GB' },
        ],
      },
      {
        category: 'Body',
        specifications: [
          { name: 'Dimensions', value: '162.6 x 75.1 x 8.4 mm' },
          { name: 'Weight', value: '226 g' },
          { name: 'Build', value: 'Aluminum frame, Kunlun Glass 2 front, eco leather or ceramic back' },
          { name: 'SIM', value: 'Nano-SIM + eSIM (dual)' },
          { name: 'Water Resistance', value: 'IP68 (2m for 30 min)' },
        ],
      },
      {
        category: 'Battery',
        specifications: [
          { name: 'Type', value: 'Li-Po 5200 mAh, non-removable' },
          { name: 'Charging', value: '100W wired, 50% in 14 min' },
          { name: 'Wireless', value: '80W wireless, 20W reverse wireless' },
        ],
      },
      {
        category: 'Sound',
        specifications: [
          { name: 'Speakers', value: 'Yes, stereo speakers' },
          { name: '3.5mm Jack', value: 'No' },
          { name: 'Audio', value: 'Hi-Res Audio, Dolby Atmos' },
        ],
      },
      {
        category: 'Comms',
        specifications: [
          { name: 'WLAN', value: 'Wi-Fi 802.11 a/b/g/n/ac/ax' },
          { name: 'Bluetooth', value: '5.2, A2DP, LE' },
          { name: 'Positioning', value: 'GPS (L1+L5), GLONASS, BDS, GALILEO, QZSS, NavIC' },
          { name: 'NFC', value: 'Yes' },
          { name: 'USB', value: 'USB Type-C 3.1 Gen 1, DisplayPort 1.2' },
        ],
      },
    ],
  },
];

export const MOCK_BRANDS = [
  { slug: 'apple-phones-48', brand_name: 'Apple', device_count: 98, image: 'https://fdn2.gsmarena.com/imgroot/brands/apple-logo-702702.jpg' },
  { slug: 'samsung-phones-9', brand_name: 'Samsung', device_count: 234, image: 'https://fdn2.gsmarena.com/imgroot/brands/samsung-logo-702702.jpg' },
  { slug: 'xiaomi-phones-80', brand_name: 'Xiaomi', device_count: 187, image: 'https://fdn2.gsmarena.com/imgroot/brands/xiaomi-logo-702702.jpg' },
  { slug: 'google-phones-107', brand_name: 'Google', device_count: 24, image: 'https://fdn2.gsmarena.com/imgroot/brands/google-logo-702702.jpg' },
  { slug: 'oneplus-phones-95', brand_name: 'OnePlus', device_count: 45, image: 'https://fdn2.gsmarena.com/imgroot/brands/oneplus-logo-702702.jpg' },
  { slug: 'realme-phones-118', brand_name: 'Realme', device_count: 89, image: 'https://fdn2.gsmarena.com/imgroot/brands/realme-logo-702702.jpg' },
  { slug: 'nothing-phones-125', brand_name: 'Nothing', device_count: 8, image: 'https://fdn2.gsmarena.com/imgroot/brands/nothing-logo-702702.jpg' },
  { slug: 'huawei-phones-48', brand_name: 'Huawei', device_count: 156, image: 'https://fdn2.gsmarena.com/imgroot/brands/huawei-logo-702702.jpg' },
  { slug: 'oppo-phones-114', brand_name: 'Oppo', device_count: 112, image: 'https://fdn2.gsmarena.com/imgroot/brands/oppo-logo-702702.jpg' },
  { slug: 'vivo-phones-116', brand_name: 'Vivo', device_count: 98, image: 'https://fdn2.gsmarena.com/imgroot/brands/vivo-logo-702702.jpg' },
  { slug: 'sony-phones-27', brand_name: 'Sony', device_count: 34, image: 'https://fdn2.gsmarena.com/imgroot/brands/sony-logo-702702.jpg' },
  { slug: 'motorola-phones-4', brand_name: 'Motorola', device_count: 67, image: 'https://fdn2.gsmarena.com/imgroot/brands/motorola-logo-702702.jpg' },
];

export function getPhonesByBrandFromMock(brandSlug: string) {
  const brandName = MOCK_BRANDS.find((b) => b.slug === brandSlug)?.brand_name;
  return MOCK_PHONES.filter((p) => p.brand.toLowerCase() === brandName?.toLowerCase());
}

export function getPhoneBySlugFromMock(slug: string): PhoneDetail | undefined {
  return MOCK_PHONES.find((p) => p.phone_name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase());
}

export function searchPhonesFromMock(query: string) {
  const q = query.toLowerCase();
  return MOCK_PHONES.filter(
    (p) =>
      p.phone_name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
  );
}
