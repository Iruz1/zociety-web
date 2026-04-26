"use client";

import { useCurrency } from '../context/CurrencyContext';

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex gap-4 text-[10px] tracking-[0.2em] font-bold">
      <button 
        onClick={() => setCurrency('IDR')}
        className={`${currency === 'IDR' ? 'text-black border-b border-black' : 'text-gray-400'}`}
      >
        IDR
      </button>
      <button 
        onClick={() => setCurrency('USD')}
        className={`${currency === 'USD' ? 'text-black border-b border-black' : 'text-gray-400'}`}
      >
        USD
      </button>
    </div>
  );
}