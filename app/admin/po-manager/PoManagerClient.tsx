"use client";

import { useState } from 'react';
import Link from 'next/link';

// Kita buat tipe data yang sesuai dengan database
type OrderData = {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  createdAt: Date;
  items: {
    name: string;
    size: string;
  }[];
};

export default function PoManagerClient({ initialOrders }: { initialOrders: OrderData[] }) {
  const [activeTab, setActiveTab] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPoOpen, setIsPoOpen] = useState(true);
  const [poEndDate, setPoEndDate] = useState('2026-04-15');
  const [poQuota, setPoQuota] = useState(100);

  // Menghitung statistik berdasarkan data asli
  const totalOrders = initialOrders.length;
  const pendingOrders = initialOrders.filter(o => o.status === 'PENDING').length;
  const paidOrders = initialOrders.filter(o => o.status === 'PAID').length;
  const shippedOrders = initialOrders.filter(o => o.status === 'SHIPPED').length;

  const handleSaveSettings = () => {
    alert(`Pengaturan PO Disimpan!\nStatus: ${isPoOpen ? 'DIBUKA' : 'DITUTUP'}\nBatas Waktu: ${poEndDate}\nKuota: ${poQuota}`);
  };

  // Fungsi pura-pura untuk ubah status (nanti kita buat fungsinya)
  const handleUpdateStatus = (id: string, newStatus: string) => {
    alert(`(Simulasi) Status order ${id} diubah menjadi: ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col md:flex-row absolute inset-0 z-[100]">
      {/* --- MOBILE NAVIGATION BAR --- */}
      <div className="md:hidden w-full bg-[#0A0A0A] text-[#F4F1EC] p-6 flex justify-between items-center z-50 sticky top-0">
        <Link href="/admin" className="text-lg tracking-[0.3em] font-bold">ZOCIETY</Link>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[10px] uppercase tracking-widest font-bold border border-[#F4F1EC]/30 px-3 py-1 hover:bg-[#F4F1EC] hover:text-[#0A0A0A] transition-colors">
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
          </nav>
        </div>
      )}
      
      {/* Sidebar Mini */}
      <aside className="w-64 bg-[#0A0A0A] text-[#F4F1EC] hidden md:flex flex-col border-r border-[#3A0D0D]/30 shadow-2xl">
        <div className="p-8 border-b border-[#3A0D0D]/30">
          <h1 className="text-xl tracking-[0.3em] font-bold">ZOCIETY</h1>
          <p className="text-[10px] tracking-widest text-[#BFBFBF] mt-2 uppercase">Command Center</p>
        </div>
        <nav className="flex-1 p-6 space-y-6 text-xs uppercase tracking-widest">
          <Link href="/admin" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">DASHBOARD</Link>
          <Link href="/admin/po-manager" className="block text-[#F4F1EC] font-bold transition-colors">PO Manager</Link>
          <Link href="/admin/inbox" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">Inbox</Link>
          <Link href="/admin/inventory" className="block text-[#F4F1EC] font-bold underline underline-offset-8">Stock Archive</Link>
          <Link href="/admin/addproduct" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">+ New Artifact</Link>
          <Link href="/admin/journal-manager" className="block text-[#F4F1EC] font-bold underline">JOURNAL MANAGER</Link>
          <Link href="/admin/addjournal" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">+ NEW DISPATCH</Link>
        </nav>
      </aside>

      {/* Area Utama */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-8 border-b border-[#0A0A0A]/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-widest uppercase text-[#0A0A0A]">PO Operations</h1>
            <p className="text-xs text-[#888888] mt-2 uppercase tracking-widest">Collection 01 - Batch 1</p>
          </div>
        </header>

        {/* Panel Kontrol PO */}
        <div className="bg-white border border-neutral-300 p-6 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#0A0A0A] flex items-center gap-3">
                Campaign Control
                {isPoOpen ? <span className="bg-green-100 text-green-800 text-[9px] px-2 py-1 rounded-sm animate-pulse">LIVE / OPEN</span> : <span className="bg-red-100 text-red-800 text-[9px] px-2 py-1 rounded-sm">CLOSED</span>}
              </h2>
            </div>
          </div>
        </div>

        {/* Statistik Cepat */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-5 border border-neutral-200">
            <p className="text-[10px] text-[#888888] uppercase tracking-widest mb-1">Total Orders</p>
            <p className="text-2xl font-bold">{totalOrders} <span className="text-sm font-normal text-neutral-400">/ {poQuota}</span></p>
          </div>
          <div className="bg-white p-5 border border-neutral-200">
            <p className="text-[10px] text-[#888888] uppercase tracking-widest mb-1">Pending (Unpaid)</p>
            <p className="text-2xl font-bold text-red-700">{pendingOrders}</p>
          </div>
          <div className="bg-white p-5 border border-neutral-200">
            <p className="text-[10px] text-[#888888] uppercase tracking-widest mb-1">Paid / Production</p>
            <p className="text-2xl font-bold text-yellow-600">{paidOrders}</p>
          </div>
          <div className="bg-white p-5 border border-neutral-200">
            <p className="text-[10px] text-[#888888] uppercase tracking-widest mb-1">Shipped</p>
            <p className="text-2xl font-bold text-green-700">{shippedOrders}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-6 mb-6 border-b border-neutral-300">
          {['All', 'PENDING', 'PAID', 'SHIPPED'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs uppercase tracking-widest transition-colors ${activeTab === tab ? 'text-[#0A0A0A] border-b-2 border-[#0A0A0A] font-bold' : 'text-[#888888] hover:text-[#0A0A0A]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tabel Data Pesanan Asli */}
        <div className="bg-white border border-neutral-200 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-[10px] uppercase tracking-widest text-[#888888]">
              <tr>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {initialOrders.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400">Belum ada pesanan masuk.</td></tr>
              ) : (
                initialOrders
                  .filter(order => activeTab === 'All' || order.status === activeTab)
                  .map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-4 font-bold text-[#0A0A0A]">{order.id.slice(-6).toUpperCase()}</td>
                    <td className="p-4">{order.firstName} {order.lastName}</td>
                    <td className="p-4">
                      {order.items.map((item, idx) => (
                        <div key={idx}>{item.name} ({item.size})</div>
                      ))}
                    </td>
                    <td className="p-4">
                      <select 
                        defaultValue={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className={`text-[10px] uppercase tracking-widest font-bold outline-none border p-1 ${
                          order.status === 'PAID' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'SHIPPED' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#0A0A0A] underline underline-offset-4">
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}