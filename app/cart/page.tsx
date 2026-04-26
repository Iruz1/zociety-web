"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../store/useCart';
import { useCurrency } from '../context/CurrencyContext'; // Tambahkan ini

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCart();
  const { formatPrice } = useCurrency(); // Panggil fungsi format

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="pt-40 pb-32 px-6 md:px-8 max-w-screen-xl mx-auto min-h-screen">
      <header className="mb-16 md:mb-24">
        <h1 className="text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase text-[#0A0A0A]">Shopping Bag</h1>
        <p className="text-xs uppercase tracking-widest text-[#888888] mt-4">
          {items.length} {items.length === 1 ? 'Artifact' : 'Artifacts'} reserved.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="text-center py-32 border-t border-b border-[#0A0A0A]/20">
          <p className="text-sm uppercase tracking-widest text-[#888888] mb-8">Your bag is currently empty.</p>
          <Link href="/shop" className="px-10 py-4 bg-[#0A0A0A] text-[#F4F1EC] text-xs font-bold uppercase tracking-widest hover:bg-[#3A0D0D] transition-colors">Return to Collection</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-8 space-y-10">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-6 md:gap-10 pb-10 border-b border-[#0A0A0A]/20">
                <div className="w-24 md:w-40 aspect-[4/5] relative bg-[#E8E3DC] flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100px, 160px" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-sm md:text-lg font-bold uppercase tracking-widest text-[#0A0A0A]">{item.name}</h3>
                      <p className="text-xs uppercase tracking-widest text-[#888888] mt-2">Size: {item.size}</p>
                    </div>
                    {/* HARGA DESKTOP */}
                    <p className="hidden md:block text-sm font-bold text-[#0A0A0A]">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex justify-between items-end mt-6">
                    <div className="flex items-center border border-[#0A0A0A]/30 w-max">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-[#0A0A0A] transition-colors">-</button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-[#0A0A0A] transition-colors">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id, item.size)} className="text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#3A0D0D] underline underline-offset-4 transition-colors">Remove</button>
                  </div>
                  {/* HARGA MOBILE */}
                  <p className="md:hidden text-sm font-bold text-[#0A0A0A] mt-4">{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white border border-neutral-200 p-8 shadow-sm sticky top-32">
              <h2 className="text-lg font-bold tracking-widest uppercase text-[#0A0A0A] mb-8 border-b border-[#0A0A0A]/10 pb-4">Order Summary</h2>
              <div className="space-y-4 mb-8 text-xs uppercase tracking-widest">
                <div className="flex justify-between text-[#888888]">
                  <span>Subtotal</span>
                  <span className="text-[#0A0A0A] font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#888888]">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-[#0A0A0A]/20 pt-6 mb-8">
                <span className="text-sm font-bold tracking-widest uppercase text-[#0A0A0A]">Total</span>
                <span className="text-2xl font-bold text-[#0A0A0A]">{formatPrice(subtotal)}</span>
              </div>
              <Link href="/checkout" className="w-full py-4 bg-[#0A0A0A] text-[#F4F1EC] text-xs font-bold uppercase tracking-widest hover:bg-[#3A0D0D] transition-colors shadow-lg text-center block">Proceed to Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}