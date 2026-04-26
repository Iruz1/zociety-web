"use client";

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    if (!confirm("Terminate session?")) return;
    
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) {
      router.push('/login');
      router.refresh();
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-[10px] uppercase tracking-widest text-red-500 hover:text-white font-bold transition-colors text-left"
    >
    [LOGOUT]
    </button>
  );
}