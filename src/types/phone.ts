export interface Phone {
  slug: string;
  phone_name: string;
  brand: string;
  image: string;
  description?: string;
}

export interface PhoneDetail {
  slug?: string;
  phone_name: string;
  brand: string;
  image: string;
  url?: string;
  price?: string;
  quickSpec: QuickSpecItem[];
  detailSpec: DetailSpecCategory[];
}

export interface QuickSpecItem {
  name: string;
  value: string;
}

export interface DetailSpecCategory {
  category: string;
  specifications: SpecItem[];
}

export interface SpecItem {
  name: string;
  value: string;
}

export interface Brand {
  slug: string;
  brand_name: string;
  device_count: number;
  image: string;
}

export interface CompareItem {
  phone: PhoneDetail;
  highlights: Record<string, string>;
}

export interface QuizAnswer {
  questionId: number;
  answer: string;
}

export interface QuizResult {
  category: string;
  phones: Phone[];
}
