"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

// 1. Komponen Isi (Yang manggil useSearchParams)
function TransferContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ZOC-UNKNOWN';
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  const bankDetails = {
    bank: "BCA (Bank Central Asia)",
    accountNumber: "8720 1928 33",
    accountName: "PT ZOCIETY ARCHIVE"
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 2000);
  };

  return (
    <div className="max-w-md w-full bg-white border border-neutral-200 shadow-2xl p-8 md:p-12 relative overflow-hidden">
      <div className="text-center mb-8 border-b border-dashed border-neutral-300 pb-8">
        <h1 className="text-3xl tracking-[0.3em] font-bold uppercase mb-2">ZOCIETY</h1>
        <p className="text-[10px] tracking-widest text-[#888888] uppercase">Manual Bank Transfer</p>
      </div>

      <div className="space-y-8">
        <div className="text-center">
           <p className="text-[11px] font-bold tracking-widest uppercase">Order #{orderId}</p>
           <p className="text-[10px] text-neutral-500 mt-2">Please transfer the exact amount within 24 hours.</p>
        </div>
        
        <div className="bg-neutral-50 p-6 border border-neutral-200 space-y-4">
          <div>
            <p className="text-[9px] text-neutral-500 uppercase tracking-widest mb-1">Bank Name</p>
            <p className="text-sm font-bold uppercase tracking-widest">{bankDetails.bank}</p>
          </div>
          
          <div>
            <p className="text-[9px] text-neutral-500 uppercase tracking-widest mb-1">Account Number</p>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold tracking-widest font-mono">{bankDetails.accountNumber}</p>
              <button 
                onClick={handleCopy}
                className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 text-black hover:text-neutral-500"
              >
                {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>

          <div>
            <p className="text-[9px] text-neutral-500 uppercase tracking-widest mb-1">Account Holder</p>
            <p className="text-sm font-bold uppercase tracking-widest">{bankDetails.accountName}</p>
          </div>
        </div>

        <button 
          onClick={handleConfirmPayment}
          disabled={isVerifying}
          className={`w-full py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
            isVerifying 
            ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed' 
            : 'bg-[#0A0A0A] text-[#F4F1EC] hover:bg-black shadow-xl hover:shadow-none translate-y-0 hover:translate-y-1'
          }`}
        >
          {isVerifying ? 'Verifying Mutation...' : 'I Have Transferred'}
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

// 2. Komponen Utama Pembungkus Suspense
export default function TransferPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col items-center justify-center py-20 px-6">
      <Suspense fallback={<div className="text-[10px] uppercase tracking-widest animate-pulse">Loading Gateway...</div>}>
        <TransferContent />
      </Suspense>
    </div>
  );
}