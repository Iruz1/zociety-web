"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Statistik Dinamis
  const totalOrders = initialOrders.length;
  const pendingOrders = initialOrders.filter(o => o.status === 'PENDING').length;
  const paidOrders = initialOrders.filter(o => o.status === 'PAID').length;
  const shippedOrders = initialOrders.filter(o => o.status === 'SHIPPED').length;

  // --- FUNGSI UPDATE STATUS ASLI ---
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh data agar statistik di atas langsung berubah
        router.refresh();
      } else {
        alert("Failed to update status in database.");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col md:flex-row absolute inset-0 z-[100]">
      {/* --- SIDEBAR (Tetap Sama) --- */}
      <aside className="w-64 bg-[#0A0A0A] text-[#F4F1EC] hidden md:flex flex-col border-r border-[#3A0D0D]/30 shadow-2xl">
        <div className="p-8 border-b border-[#3A0D0D]/30 text-center">
          <h1 className="text-xl tracking-[0.3em] font-bold text-white">ZOCIETY</h1>
          <p className="text-[9px] tracking-[0.4em] text-[#888888] mt-2 uppercase">Command Center</p>
        </div>
        <nav className="flex-1 p-6 space-y-6 text-[10px] uppercase tracking-[0.2em]">
          <Link href="/admin" className="block text-[#888888] hover:text-white transition-colors">DASHBOARD</Link>
          <Link href="/admin/po-manager" className="block text-white font-bold border-l-2 border-white pl-4">PO Manager</Link>
          <Link href="/admin/inventory" className="block text-[#888888] hover:text-white">Stock Archive</Link>
          <Link href="/admin/journal-manager" className="block text-[#888888] hover:text-white">Journal</Link>
        </nav>
      </aside>

      {/* --- AREA UTAMA --- */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-12 border-b border-[#0A0A0A]/10 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-[0.2em] uppercase text-[#0A0A0A]">Purchase Orders</h1>
            <p className="text-[10px] text-[#888888] mt-2 uppercase tracking-[0.3em]">Operational Overview — Batch 01</p>
          </div>
        </header>

        {/* Statistik Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 border border-neutral-200 shadow-sm">
            <p className="text-[9px] text-[#888888] uppercase tracking-widest mb-2">Total</p>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
          <div className="bg-white p-6 border border-neutral-200 shadow-sm border-l-4 border-l-red-500">
            <p className="text-[9px] text-red-500 uppercase tracking-widest mb-2">Pending</p>
            <p className="text-2xl font-bold">{pendingOrders}</p>
          </div>
          <div className="bg-white p-6 border border-neutral-200 shadow-sm border-l-4 border-l-yellow-500">
            <p className="text-[9px] text-yellow-600 uppercase tracking-widest mb-2">Paid</p>
            <p className="text-2xl font-bold">{paidOrders}</p>
          </div>
          <div className="bg-white p-6 border border-neutral-200 shadow-sm border-l-4 border-l-green-500">
            <p className="text-[9px] text-green-600 uppercase tracking-widest mb-2">Shipped</p>
            <p className="text-2xl font-bold">{shippedOrders}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-8 mb-8 border-b border-neutral-200">
          {['All', 'PENDING', 'PAID', 'SHIPPED'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[10px] uppercase tracking-[0.3em] transition-all ${activeTab === tab ? 'text-black border-b-2 border-black font-bold' : 'text-[#888888] hover:text-black'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tabel Data */}
        <div className="bg-white border border-neutral-200 overflow-x-auto shadow-xl">
          <table className="w-full text-left text-[11px] uppercase tracking-widest">
            <thead className="bg-[#0A0A0A] text-white">
              <tr>
                <th className="p-5 font-medium">ID</th>
                <th className="p-5 font-medium">Customer</th>
                <th className="p-5 font-medium">Artifacts</th>
                <th className="p-5 font-medium">Status Control</th>
                <th className="p-5 font-medium text-right text-[#888888]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 italic">
              {initialOrders.filter(o => activeTab === 'All' || o.status === activeTab).map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold text-black">#{order.id.slice(-5).toUpperCase()}</td>
                  <td className="p-5">{order.firstName} {order.lastName}</td>
                  <td className="p-5">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="mb-1">{item.name} [{item.size}]</div>
                    ))}
                  </td>
                  <td className="p-5">
                    <select 
                      defaultValue={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="bg-transparent border border-neutral-300 px-3 py-1 text-[9px] font-bold focus:border-black outline-none"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PAID">PAID</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                    </select>
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-[#888888] hover:text-black transition-colors underline underline-offset-4">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}