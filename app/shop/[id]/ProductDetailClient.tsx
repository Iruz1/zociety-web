"use client";

import { useState } from 'react';
import { useCart } from '../../store/useCart';
import { useCurrency } from '../../context/CurrencyContext'; // Import context mata uang

export default function ProductDetailClient({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();
  const { formatPrice } = useCurrency(); // Gunakan fungsi format

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size.");

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: 1
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <>
      {/* 1. RENDER HARGA DI SINI (Supaya sinkron dengan switcher) */}
      <div className="mb-10">
        <p className="text-xl font-bold tracking-[0.1em] text-[#0A0A0A]">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest mb-4 font-bold text-[#888888]">Select Size</p>
        <div className="flex gap-4">
          {product.sizes.map((size: string) => (
            <button 
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 border text-xs transition-all ${
                selectedSize === size 
                  ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#F4F1EC]' 
                  : 'border-[#BFBFBF] text-[#0A0A0A] hover:border-[#0A0A0A]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className={`w-full md:w-auto px-12 py-5 uppercase tracking-widest text-xs font-bold transition-all duration-300 ${
          isAdded ? 'bg-green-700 text-white' : 'bg-[#0A0A0A] hover:bg-[#3A0D0D] text-[#F4F1EC]'
        }`}
      >
        {isAdded ? 'ADDED TO CART ✓' : 'Add to Cart'}
      </button>
    </>
  );
}