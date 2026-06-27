import { useState, useEffect } from 'react';
import { getBrands, getPhonesByBrand, getPhoneDetail, searchPhones, getLatestPhones, getTopPhones } from '../utils/api';
import type { Brand, Phone, PhoneDetail } from '../types/phone';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBrands()
      .then(setBrands)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { brands, loading, error };
}

export function usePhonesByBrand(brandSlug: string | null) {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!brandSlug) return;
    setLoading(true);
    getPhonesByBrand(brandSlug)
      .then(setPhones)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [brandSlug]);

  return { phones, loading, error };
}

export function usePhoneDetail(slug: string | null) {
  const [phone, setPhone] = useState<PhoneDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getPhoneDetail(slug)
      .then(setPhone)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { phone, loading, error };
}

export function useSearchPhones(query: string) {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setPhones([]);
      return;
    }
    setLoading(true);
    searchPhones(query)
      .then(setPhones)
      .finally(() => setLoading(false));
  }, [query]);

  return { phones, loading };
}

export function useLatestPhones() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestPhones()
      .then(setPhones)
      .finally(() => setLoading(false));
  }, []);

  return { phones, loading };
}

export function useTopPhones() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopPhones()
      .then(setPhones)
      .finally(() => setLoading(false));
  }, []);

  return { phones, loading };
}
