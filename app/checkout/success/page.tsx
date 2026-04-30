"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ZOC-UNKNOWN';
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col items-center justify-center py-20 px-6 font-mono">
      <div className="max-w-md w-full bg-white border border-neutral-300 shadow-xl p-8 md:p-12 relative">
        
        <div className="text-center mb-10">
          <h1 className="text-2xl tracking-[0.2em] font-bold uppercase mb-2 font-sans">ZOCIETY</h1>
          <p className="text-[10px] tracking-widest text-[#888888] uppercase font-sans">Payment Receipt</p>
          <div className="mt-6 inline-block bg-green-100 text-green-800 text-[10px] font-bold px-3 py-1 tracking-widest uppercase">
            PAID SUCCESS
          </div>
        </div>

        <div className="space-y-4 text-[11px] uppercase tracking-widest border-t border-dashed border-neutral-300 pt-6">
          <div className="flex justify-between">
            <span className="text-neutral-500">Order Ref</span>
            <span className="font-bold">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Date</span>
            <span className="font-bold">{currentDate}</span>
          </div>
        </div>

        <div className="mt-8 border-t border-b border-dashed border-neutral-300 py-6 space-y-4">
          <div className="flex justify-between text-[11px] tracking-widest text-neutral-500">
             <p>Your items are being prepared for shipment. You will receive a tracking number via email shortly.</p>
          </div>
        </div>

        <div className="mt-12 space-y-4 font-sans">
          <Link href="/shop" className="block w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] bg-[#0A0A0A] text-[#F4F1EC] hover:bg-black transition-colors">
            Continue Shopping
          </Link>
          <Link href="/" className="block w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] border border-neutral-300 text-[#0A0A0A] hover:bg-neutral-50 transition-colors">
            Return to Archive
          </Link>
        </div>

      </div>
    </div>
  );
}