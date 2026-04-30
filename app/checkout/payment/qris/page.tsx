"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

// 1. Ini komponen isinya (yang pakai useSearchParams)
function QRISContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ZOC-UNKNOWN';

  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 menit

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 2000);
  };

  return (
    <div className="max-w-md w-full bg-white border border-neutral-200 shadow-2xl p-8 md:p-12 relative overflow-hidden">
      <div className="text-center mb-8 border-b border-dashed border-neutral-300 pb-8">
        <h1 className="text-3xl tracking-[0.3em] font-bold uppercase mb-2">ZOCIETY</h1>
        <p className="text-[10px] tracking-widest text-[#888888] uppercase">Secure QRIS Gateway</p>
      </div>

      <div className="text-center space-y-6">
        <p className="text-[11px] font-bold tracking-widest uppercase">Order #{orderId}</p>
        
        <div className="bg-neutral-50 p-6 border border-neutral-100 flex flex-col items-center justify-center">
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ZOCIETY_PAYMENT_DUMMY" 
            alt="QRIS ZOCIETY" 
            className="w-48 h-48 mix-blend-multiply mb-4"
          />
          <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">
            Scan with any QRIS supported app
          </p>
        </div>

        <div className="text-[10px] uppercase tracking-widest text-neutral-500 flex justify-between px-4">
          <span>Awaiting Payment...</span>
          <span className="font-bold text-red-600">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>

        <button 
          onClick={handleSimulatePayment}
          disabled={isVerifying}
          className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
            isVerifying 
            ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed' 
            : 'bg-[#0A0A0A] text-[#F4F1EC] hover:bg-black shadow-xl hover:shadow-none translate-y-0 hover:translate-y-1'
          }`}
        >
          {isVerifying ? 'Verifying Transaction...' : 'I Have Paid'}
        </button>
      </div>

      {isVerifying && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
    </div>
  );
}

// 2. Ini Komponen Utamanya yang di-export (Bungkus pakai Suspense)
export default function QRISPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col items-center justify-center py-20 px-6">
      <Suspense fallback={<div className="text-[10px] uppercase tracking-widest animate-pulse">Loading Secure Gateway...</div>}>
        <QRISContent />
      </Suspense>
    </div>
  );
}