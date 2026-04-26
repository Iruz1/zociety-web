"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../store/useCart';
import { useCurrency } from '../context/CurrencyContext';

export default function Checkout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');

  const { items, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();

  // 1. Kalkulasi Subtotal
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // 2. Logic Ongkir Manusiawi & Marketing (Free Shipping > 500rb)
  const isFreeShipping = currency === 'IDR' && subtotal >= 500000;
  const shippingFee = isFreeShipping ? 0 : (currency === 'IDR' ? 20000 : 10); 
  
  const total = subtotal + shippingFee;

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Data yang dikirim ke database
    const orderData = {
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      address: formData.get('address'),
      city: formData.get('city'),
      postalCode: formData.get('postalCode'),
      phone: formData.get('phone'),
      paymentMethod: paymentMethod,
      subtotal: subtotal,
      shippingFee: shippingFee,
      totalAmount: total,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        size: item.size,
        price: item.price,
        quantity: item.quantity
      }))
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Checkout failed');

      clearCart();
      alert("ARTIFACT RESERVED. REDIRECTING TO ARCHIVE.");
      router.push('/'); 
    } catch {
      alert("Sync failed. Check your connection.");
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-32 px-6 md:px-8 max-w-screen-xl mx-auto min-h-screen">
      <nav className="text-[10px] uppercase tracking-[0.3em] text-[#888888] mb-12 flex gap-3">
        <Link href="/cart" className="hover:text-black">Bag</Link>
        <span>/</span>
        <span className="text-[#0A0A0A] font-bold">Shipping & Payment</span>
      </nav>

      <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-24">
        <div className="flex-1">
          <form onSubmit={handleCheckout} className="space-y-16">
            {/* --- SECTION CONTACT --- */}
            <section>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#0A0A0A] mb-8 border-b border-[#0A0A0A]/10 pb-4">Contact Information</h2>
              <input type="email" name="email" required placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-[#0A0A0A]/20 pb-3 text-xs uppercase tracking-widest outline-none focus:border-black transition-colors placeholder:text-neutral-300" />
            </section>

            {/* --- SECTION ADDRESS --- */}
            <section>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#0A0A0A] mb-8 border-b border-[#0A0A0A]/10 pb-4">Shipping Destination</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <input type="text" name="firstName" required placeholder="FIRST NAME" className="w-full bg-transparent border-b border-[#0A0A0A]/20 pb-3 text-xs uppercase tracking-widest outline-none focus:border-black" />
                <input type="text" name="lastName" required placeholder="LAST NAME" className="w-full bg-transparent border-b border-[#0A0A0A]/20 pb-3 text-xs uppercase tracking-widest outline-none focus:border-black" />
                <input type="text" name="address" required placeholder="STREET ADDRESS / UNIT" className="w-full md:col-span-2 bg-transparent border-b border-[#0A0A0A]/20 pb-3 text-xs uppercase tracking-widest outline-none focus:border-black" />
                <input type="text" name="city" required placeholder="CITY" className="w-full bg-transparent border-b border-[#0A0A0A]/20 pb-3 text-xs uppercase tracking-widest outline-none focus:border-black" />
                <input type="text" name="postalCode" required placeholder="POSTAL CODE" className="w-full bg-transparent border-b border-[#0A0A0A]/20 pb-3 text-xs uppercase tracking-widest outline-none focus:border-black" />
                <input type="tel" name="phone" required placeholder="PHONE NUMBER (WHATSAPP)" className="w-full md:col-span-2 bg-transparent border-b border-[#0A0A0A]/20 pb-3 text-xs uppercase tracking-widest outline-none focus:border-black" />
              </div>
            </section>

            {/* --- SECTION PAYMENT --- */}
            <section>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#0A0A0A] mb-8 border-b border-[#0A0A0A]/10 pb-4">Payment Method</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <button type="button" onClick={() => setPaymentMethod('bank_transfer')} className={`flex-1 p-5 border text-[10px] font-bold tracking-[0.3em] transition-all ${paymentMethod === 'bank_transfer' ? 'border-black bg-black text-white' : 'border-neutral-200 text-neutral-400'}`}>BANK TRANSFER</button>
                <button type="button" onClick={() => setPaymentMethod('credit_card')} className={`flex-1 p-5 border text-[10px] font-bold tracking-[0.3em] transition-all ${paymentMethod === 'credit_card' ? 'border-black bg-black text-white' : 'border-neutral-200 text-neutral-400'}`}>CREDIT CARD</button>
              </div>
            </section>
            
            <div className="pt-8">
              <button type="submit" disabled={isLoading} className="w-full py-6 bg-[#0A0A0A] text-[#F4F1EC] text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#1a1a1a] transition-all disabled:opacity-50 shadow-2xl">
                {isLoading ? 'SYNCING TO ARCHIVE...' : `COMPLETE ORDER — ${formatPrice(total)}`}
              </button>
            </div>
          </form>
        </div>

        {/* --- ORDER SUMMARY (RIGHT SIDE) --- */}
        <div className="lg:w-[400px] flex-shrink-0">
          <div className="bg-white border border-neutral-100 p-8 sticky top-32 shadow-sm">
            <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#0A0A0A] mb-8 border-b border-neutral-50 pb-4">Order Summary</h2>
            <div className="space-y-6 mb-8 border-b border-neutral-50 pb-8 max-h-[400px] overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                  <div className="w-16 h-20 relative bg-[#F4F1EC] flex-shrink-0 grayscale">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-[8px] font-bold">{item.quantity}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-black">{item.name}</h3>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-400 mt-1">Size: {item.size}</p>
                  </div>
                  <p className="text-[10px] font-bold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8 text-[10px] uppercase tracking-[0.2em] border-b border-neutral-50 pb-8 text-neutral-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-black font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={`font-bold ${isFreeShipping ? 'text-green-600' : 'text-black'}`}>
                  {isFreeShipping ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Total</span>
              <div className="text-right">
                <span className="text-[8px] text-neutral-400 uppercase mr-2 tracking-widest">{currency}</span>
                <span className="text-2xl font-bold tracking-tighter">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}