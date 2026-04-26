"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'IDR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInIDR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('IDR');

  // 1. AUTO-DETECT LOKASI
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        // Jika luar Indonesia, set ke USD
        if (data.country_code && data.country_code !== 'ID') {
          setCurrency('USD');
        }
      } catch (error) {
        console.error("Location detection failed, defaulting to IDR");
      }
    };
    detectLocation();
  }, []);

  // 2. LOGIKA KONVERSI (Base price di DB adalah IDR)
  const IDR_TO_USD_RATE = 0.000063; // Rate $1 = Rp 15.800-an

  const formatPrice = (priceInIDR: number) => {
    // Proteksi jika data harga belum masuk atau 0
    if (!priceInIDR || priceInIDR === 0) return currency === 'USD' ? '$ --' : 'Rp --';

    if (currency === 'USD') {
      const converted = priceInIDR * IDR_TO_USD_RATE;
      
      // Pembulatan ke atas (Math.ceil) agar harga terlihat "bersih" di USD
      // Misal: Rp 350.000 -> $22.05 -> dibulatkan jadi $23
      const roundedUSD = Math.ceil(converted); 

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, 
      }).format(roundedUSD);
    }
    
    // Format IDR (Tanpa desimal)
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(priceInIDR);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
};