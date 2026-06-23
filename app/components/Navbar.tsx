"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwitcher from './CurrencySwitcher';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mencegah scroll di body pas mobile menu kebuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* NAVBAR UTAMA (Tetap Fixed di Atas) */}
      <nav className="fixed w-full top-0 z-50 flex justify-between items-center py-3 px-6 md:py-4 md:px-8 uppercase tracking-widest text-xs font-medium bg-[#0A0A0A] text-[#F4F1EC] border-b border-[#3A0D0D]/30">
        <Link 
          href="/" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-xl md:text-2xl tracking-[0.3em] font-bold hover:text-[#BFBFBF] transition-colors relative z-50"
        >
          ZOCIETY
        </Link>

        <div className="flex items-center space-x-5 md:space-x-12 relative z-50">
          {/* Desktop Menu */}
          <Link href="/shop" className="hover:text-[#BFBFBF] transition-colors hidden sm:block">Shop</Link>
          <Link href="/journal" className="hover:text-[#BFBFBF] transition-colors hidden sm:block">Journal</Link>
          <Link href="/about" className="hover:text-[#BFBFBF] transition-colors hidden sm:block">About</Link>
          
          <div className="hidden md:block">
            <CurrencySwitcher />
          </div>

          {/* Ikon Shopping Bag */}
          <Link href="/cart" className="relative group p-1 flex items-center justify-center hover:text-[#BFBFBF] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </Link>

          {/* Hamburger Button (Mobile Only) */}
          <button 
            className="sm:hidden p-1 flex flex-col justify-center items-center gap-[4px] w-6 h-6"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.span 
              animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 5 : 0 }} 
              className="w-full h-[1.5px] bg-[#F4F1EC] block transition-all"
            />
            <motion.span 
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} 
              className="w-full h-[1.5px] bg-[#F4F1EC] block transition-all"
            />
            <motion.span 
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }} 
              className="w-full h-[1.5px] bg-[#F4F1EC] block transition-all"
            />
          </button>
        </div>
      </nav>

      {/* FULL-SCREEN MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-center items-center space-y-10"
          >
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold tracking-[0.2em] uppercase text-[#F4F1EC] hover:text-[#BFBFBF] transition-colors">
              Shop
            </Link>
            <Link href="/journal" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold tracking-[0.2em] uppercase text-[#F4F1EC] hover:text-[#BFBFBF] transition-colors">
              Journal
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold tracking-[0.2em] uppercase text-[#F4F1EC] hover:text-[#BFBFBF] transition-colors">
              About
            </Link>
            
            <div className="mt-8 scale-125">
              <CurrencySwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}