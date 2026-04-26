"use client";

import { useState } from 'react';
import Link from 'next/link';

// Data simulasi pelanggan & komunitas
const mockMembers = [
  { id: "USR-089", name: "Alex R.", email: "alex.r@example.com", spent: "$420", tier: "VIP", joined: "Jan 2026" },
  { id: "USR-090", name: "Bimo S.", email: "bimo.studio@hype.co", spent: "$240", tier: "Member", joined: "Feb 2026" },
  { id: "USR-091", name: "Sarah K.", email: "sarah.knt@gmail.com", spent: "$850", tier: "VIP", joined: "Nov 2025" },
  { id: "USR-092", name: "-", email: "anonymous12@mail.com", spent: "$0", tier: "Subscriber", joined: "Mar 2026" },
  { id: "USR-093", name: "David K.", email: "david.k@agency.com", spent: "$180", tier: "Member", joined: "Mar 2026" },
];

export default function CommunityManager() {
  const [activeTab, setActiveTab] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col md:flex-row absolute inset-0 z-[100]">
        {/* --- MOBILE NAVIGATION BAR --- */}
      <div className="md:hidden w-full bg-[#0A0A0A] text-[#F4F1EC] p-6 flex justify-between items-center z-50 sticky top-0">
        <Link href="/admin" className="text-lg tracking-[0.3em] font-bold">ZOCIETY</Link>
        <button 
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="text-[10px] uppercase tracking-widest font-bold border border-[#F4F1EC]/30 px-3 py-1 hover:bg-[#F4F1EC] hover:text-[#0A0A0A] transition-colors"
        >
          {isMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* --- OVERLAY MOBILE MENU --- */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[76px] left-0 w-full h-[calc(100vh-76px)] bg-[#0A0A0A] text-[#F4F1EC] z-40 p-8 flex flex-col gap-8 overflow-y-auto">
          <nav className="flex flex-col gap-6 text-sm uppercase tracking-widest">
            <Link href="/admin" className="text-[#BFBFBF] hover:text-[#F4F1EC]">DASHBOARD</Link>
            <Link href="/admin/po-manager" className="text-[#BFBFBF] hover:text-[#F4F1EC]">PO Manager</Link>
            <Link href="/admin/community" className="text-[#BFBFBF] hover:text-[#F4F1EC]">COMMUNITY</Link>
            
            <div className="pt-6 border-t border-[#3A0D0D]/50 flex flex-col gap-6">
              <Link href="/admin/add-product" className="text-[#BFBFBF] hover:text-[#F4F1EC]">+ Add Product</Link>
              <Link href="/admin/add-journal" className="text-[#BFBFBF] hover:text-[#F4F1EC]">+ New Journal</Link>
            </div>
          </nav>
          
          <div className="mt-auto pt-8 border-t border-[#3A0D0D]/50">
            <Link href="/" className="text-[10px] uppercase tracking-widest text-[#BFBFBF] hover:text-[#F4F1EC]">
              ← Back to Storefront
            </Link>
          </div>
        </div>
      )}
      
      {/* Sidebar Mini */}
      <aside className="w-64 bg-[#0A0A0A] text-[#F4F1EC] hidden md:flex flex-col border-r border-[#3A0D0D]/30 shadow-2xl">
        <div className="p-8 border-b border-[#3A0D0D]/30">
          <h1 className="text-xl tracking-[0.3em] font-bold">ZOCIETY</h1>
          <p className="text-[10px] tracking-widest text-[#BFBFBF] mt-2 uppercase">Command Center</p>
        </div>
        
        <nav className="flex-1 p-6 space-y-6 text-xs uppercase tracking-widest">
          <Link href="/admin" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">dashboard</Link>
          <Link href="/admin/po-manager" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">PO Manager</Link>
          <Link href="/admin/community" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">COMMUNITY</Link>
          <Link href="/admin/inbox" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">inbox</Link>
          <Link href="/admin/inventory" className="block text-[#F4F1EC] font-bold underline underline-offset-8">Stock Archive</Link>
          <Link href="/admin/addproduct" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">+ New Artifact</Link>
          <Link href="/admin/journal-manager" className="block text-[#F4F1EC] font-bold underline">JOURNAL MANAGER</Link>
          <Link href="/admin/addjournal" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">+ NEW DISPATCH</Link>
        </nav>
      </aside>
      {/* Area Utama */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        
        <header className="mb-12 border-b border-[#0A0A0A]/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-widest uppercase text-[#0A0A0A]">The Society</h1>
            <p className="text-xs text-[#888888] mt-2 uppercase tracking-widest">Customer & Subscriber Database</p>
          </div>
          <button className="px-6 py-3 bg-[#0A0A0A] text-[#F4F1EC] text-[10px] uppercase tracking-widest hover:bg-[#3A0D0D] transition-colors shadow-lg">
            Compose Broadcast
          </button>
        </header>

        {/* Statistik Komunitas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 border border-neutral-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#888888] uppercase tracking-widest mb-2">Total Network</p>
              <p className="text-3xl font-bold text-[#0A0A0A]">1,204</p>
            </div>
            <span className="text-2xl opacity-20">🌐</span>
          </div>
          <div className="bg-white p-6 border border-neutral-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#888888] uppercase tracking-widest mb-2">VIP Members (spent &gt; $300)</p>
              <p className="text-3xl font-bold text-[#0A0A0A]">42</p>
            </div>
            <span className="text-2xl opacity-20">✦</span>
          </div>
          <div className="bg-[#0A0A0A] text-[#F4F1EC] p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#BFBFBF] uppercase tracking-widest mb-2">Email Open Rate</p>
              <p className="text-3xl font-bold">68.5%</p>
            </div>
            <span className="text-xs text-green-400 font-medium tracking-widest">+High</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 mb-6 border-b border-neutral-300">
          {['All', 'VIP', 'Member', 'Subscriber'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs uppercase tracking-widest transition-colors ${
                activeTab === tab ? 'text-[#0A0A0A] border-b-2 border-[#0A0A0A] font-bold' : 'text-[#888888] hover:text-[#0A0A0A]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tabel Database Pengguna */}
        <div className="bg-white border border-neutral-200 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-[10px] uppercase tracking-widest text-[#888888]">
              <tr>
                <th className="p-5 font-medium">User ID</th>
                <th className="p-5 font-medium">Name</th>
                <th className="p-5 font-medium">Email / Contact</th>
                <th className="p-5 font-medium">Total Spent</th>
                <th className="p-5 font-medium">Tier</th>
                <th className="p-5 font-medium text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {mockMembers
                .filter(member => activeTab === 'All' || member.tier === activeTab)
                .map((member) => (
                <tr key={member.id} className="hover:bg-neutral-50 transition-colors group">
                  <td className="p-5 font-bold text-[#0A0A0A]">{member.id}</td>
                  <td className="p-5">{member.name}</td>
                  <td className="p-5 text-[#888888] group-hover:text-[#0A0A0A] transition-colors">{member.email}</td>
                  <td className="p-5 font-medium">{member.spent}</td>
                  <td className="p-5">
                    <span className={`px-2 py-1 text-[9px] uppercase tracking-widest font-bold border ${
                      member.tier === 'VIP' ? 'bg-[#0A0A0A] text-[#F4F1EC] border-[#0A0A0A]' : 
                      member.tier === 'Member' ? 'bg-neutral-200 text-[#0A0A0A] border-neutral-300' : 
                      'bg-transparent text-[#888888] border-neutral-200'
                    }`}>
                      {member.tier}
                    </span>
                  </td>
                  <td className="p-5 text-right text-[#888888]">{member.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}