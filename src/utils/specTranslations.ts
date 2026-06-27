const specTranslations: Record<string, Record<string, string>> = {
  uz: {
    // Categories
    'Network': 'Tarmoq', 'Launch': 'Chiqarilgan', 'Body': 'Korpus', 'Display': 'Ekran',
    'Platform': 'Platforma', 'Memory': 'Xotira', 'Main Camera': 'Asosiy kamera',
    'Selfie camera': 'Selfie kamera', 'Sound': 'Tovush', 'Comms': 'Aloqa',
    'Features': 'Xususiyatlar', 'Battery': 'Batareya', 'Misc': 'Boshqa',
    // Spec names
    'Technology': 'Texnologiya', '2G bands': '2G diapazonlari', '3G bands': '3G diapazonlari',
    '4G bands': '4G diapazonlari', '5G bands': '5G diapazonlari', 'Speed': 'Tezlik',
    'Announced': 'E\'lon qilingan', 'Status': 'Holat', 'Dimensions': 'O\'lchamlari',
    'Weight': 'Og\'irligi', 'Build': 'Material', 'SIM': 'SIM',
    'Type': 'Turi', 'Size': 'O\'lchami', 'Resolution': 'Resolution',
    'Protection': 'Himoya', 'OS': 'OS', 'Chipset': 'Chipset',
    'CPU': 'CPU', 'GPU': 'GPU', 'Card slot': 'Karta sloti',
    'Internal': 'Ichki xotira', 'Primary': 'Asosiy', 'Secondary': 'Ikkinch darajali',
    'Video': 'Video', 'Other features': 'Xususiyatlar', 'Loudspeaker': 'Dinamik',
    '3.5mm jack': '3.5mm jak', 'WLAN': 'Wi-Fi', 'Bluetooth': 'Bluetooth',
    'Positioning': 'Joylashuv', 'NFC': 'NFC', 'Radio': 'Radio', 'USB': 'USB',
    'Sensors': 'Sensorlar', 'Battery type': 'Batareya turi',
    'Charging': 'Zaryadlash', 'Colors': 'Ranglar', 'Price': 'Narx',
  },
  ru: {
    // Categories
    'Network': 'Сеть', 'Launch': 'Запуск', 'Body': 'Корпус', 'Display': 'Экран',
    'Platform': 'Платформа', 'Memory': 'Память', 'Main Camera': 'Основная камера',
    'Selfie camera': 'Фронтальная камера', 'Sound': 'Звук', 'Comms': 'Связь',
    'Features': 'Особенности', 'Battery': 'Батарея', 'Misc': 'Разное',
    // Spec names
    'Technology': 'Технологии', '2G bands': 'Диапазоны 2G', '3G bands': 'Диапазоны 3G',
    '4G bands': 'Диапазоны 4G', '5G bands': 'Диапазоны 5G', 'Speed': 'Скорость',
    'Announced': 'Анонс', 'Status': 'Статус', 'Dimensions': 'Размеры',
    'Weight': 'Вес', 'Build': 'Материал', 'SIM': 'SIM',
    'Type': 'Тип', 'Size': 'Размер', 'Resolution': 'Разрешение',
    'Protection': 'Защита', 'OS': 'ОС', 'Chipset': 'Чипсет',
    'CPU': 'Процессор', 'GPU': 'Графика', 'Card slot': 'Слот для карт',
    'Internal': 'Встроенная память', 'Primary': 'Основная', 'Secondary': 'Фронтальная',
    'Video': 'Видео', 'Other features': 'Особенности', 'Loudspeaker': 'Динамик',
    '3.5mm jack': '3.5мм разъём', 'WLAN': 'Wi-Fi', 'Bluetooth': 'Блютуз',
    'Positioning': 'Позиционирование', 'NFC': 'NFC', 'Radio': 'Радио', 'USB': 'USB',
    'Sensors': 'Датчики', 'Battery type': 'Тип батареи',
    'Charging': 'Зарядка', 'Colors': 'Цвета', 'Price': 'Цена',
  },
  en: {},
};

export function translateSpec(text: string, lang: string): string {
  if (lang === 'en' || !text) return text;
  const map = specTranslations[lang] || specTranslations.en;
  return map[text] || text;
}
