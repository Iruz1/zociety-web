"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Tambahkan ini

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // State untuk pesan error
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // 1. Kirim data ke API Auth yang kita buat
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // 2. Jika sukses, langsung lempar ke Dashboard Admin
        router.push('/admin');
      } else {
        // 3. Jika gagal (password salah/bukan admin)
        setError(data.message || 'Access Denied: Invalid Credentials');
        setIsLoading(false);
      }
    } catch (err) {
      setError('System Error: Connection failed.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex items-center justify-center p-6 absolute inset-0 z-[200]">
      
      <Link href="/" className="absolute top-8 left-8 text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#0A0A0A] transition-colors">
        ← Return to Storefront
      </Link>

      <div className="w-full max-w-md bg-white p-10 md:p-14 border border-neutral-200 shadow-2xl">
        
        <div className="text-center mb-12">
          <h1 className="text-2xl tracking-[0.3em] font-bold text-[#0A0A0A] mb-2">ZOCIETY</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#888888]">Restricted Access</p>
        </div>

        {/* Pesan Error Jika Login Gagal */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-500 text-red-600 text-[10px] uppercase tracking-widest font-bold animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2">
              Admin Identification
            </label>
            <input 
              type="email" 
              required
              placeholder="Enter your email"
              className="w-full bg-transparent border-b border-neutral-300 pb-2 text-sm outline-none focus:border-[#0A0A0A] transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2">
              Passcode
            </label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-transparent border-b border-neutral-300 pb-2 text-sm outline-none focus:border-[#0A0A0A] transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-[#0A0A0A] hover:bg-[#3A0D0D] text-[#F4F1EC] uppercase tracking-widest text-xs font-bold transition-all disabled:opacity-50 mt-4"
          >
            {isLoading ? 'Authenticating...' : 'Enter System'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[9px] uppercase tracking-widest text-neutral-400 italic">
            ZOCIETY Security Protocol v1.0
          </p>
        </div>

      </div>
    </div>
  );
}