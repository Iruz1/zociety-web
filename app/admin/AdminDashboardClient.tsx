"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Untuk redirect setelah logout

export default function AdminDashboardClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const router = useRouter();

  // Sinkronisasi waktu
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(
        new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).toUpperCase()
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // FUNGSI LOGOUT
  const handleLogout = async () => {
    if (!confirm("Terminate session and exit Command Center?")) return;

    try {
      const res = await fetch('/api/auth/logout', { 
        method: 'POST',
      });

      if (res.ok) {
        // Hapus cache client-side dan tendang ke login
        router.push('/login');
        router.refresh();
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      {/* --- MOBILE NAVIGATION BAR --- */}
      <div className="md:hidden w-full bg-[#0A0A0A] text-[#F4F1EC] p-6 flex justify-between items-center z-[110] sticky top-0 border-b border-[#3A0D0D]/30">
        <Link href="/admin" className="text-lg tracking-[0.3em] font-bold">ZOCIETY</Link>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="text-[10px] uppercase tracking-widest font-bold border border-[#F4F1EC]/30 px-4 py-2 hover:bg-[#F4F1EC] hover:text-[#0A0A0A] transition-all"
        >
          {isMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* --- OVERLAY MOBILE MENU --- */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[76px] w-full h-[calc(100vh-76px)] bg-[#0A0A0A] text-[#F4F1EC] z-[105] p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-6 text-sm uppercase tracking-[0.3em] font-bold">
            <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="text-[#F4F1EC] border-b border-white/10 pb-4">DASHBOARD</Link>
            <Link href="/admin/po-manager" onClick={() => setIsMenuOpen(false)} className="text-[#BFBFBF] hover:text-white">PO Manager</Link>
            <Link href="/admin/inventory" onClick={() => setIsMenuOpen(false)} className="text-[#BFBFBF] hover:text-white">Inventory</Link>
            <Link href="/admin/journal-manager" onClick={() => setIsMenuOpen(false)} className="text-[#BFBFBF] hover:text-white">Journal</Link>
            <Link href="/admin/inbox" onClick={() => setIsMenuOpen(false)} className="text-[#BFBFBF] hover:text-white pb-4 border-b border-white/10">INBOX</Link>
            
            <div className="pt-4 flex flex-col gap-4">
              <Link href="/admin/addproduct" onClick={() => setIsMenuOpen(false)} className="text-[10px] text-green-500 tracking-[0.2em]">+ NEW PRODUCT</Link>
              <Link href="/admin/addjournal" onClick={() => setIsMenuOpen(false)} className="text-[10px] text-blue-500 tracking-[0.2em]">+ NEW JOURNAL</Link>
            </div>
          </nav>
          
          <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-6">
            {/* TOMBOL LOGOUT DI MOBILE */}
            <button 
              onClick={handleLogout}
              className="text-left text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold hover:text-white transition-colors"
            >
              EXIT_SESSION [LOGOUT]
            </button>
            <Link href="/" className="text-[10px] uppercase tracking-[0.4em] text-[#888888] hover:text-[#F4F1EC] transition-colors">
              ← Back to Store
            </Link>
          </div>
        </div>
      )}
    </>
  );
}