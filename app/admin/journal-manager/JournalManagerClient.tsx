"use client";

import { useState } from 'react';
import Link from 'next/link';

type JournalData = {
  id: string;
  title: string;
  publishedAt: Date;
  isPublished: boolean;
  category?: string;
};

export default function JournalManagerClient({ initialJournals }: { initialJournals: JournalData[] }) {
  const [journals, setJournals] = useState(initialJournals);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fungsi hapus (Simulasi dulu, nanti kita buat API Delete-nya)
  const handleDelete = async (id: string) => {
    // 1. Konfirmasi ke user
    if (!confirm("Apakah kamu yakin ingin menghapus artikel ini selamanya dari arsip ZOCIETY?")) return;

    try {
      // 2. Panggil API Delete
      const response = await fetch(`/api/journal/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // 3. Update tampilan secara instan (Hapus dari list di layar)
        setJournals(journals.filter(j => j.id !== id));
        alert("Artikel telah dimusnahkan.");
      } else {
        alert("Gagal menghapus: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting journal:", error);
      alert("Terjadi kesalahan koneksi saat mencoba menghapus.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col md:flex-row absolute inset-0 z-[100]">
      {/* Sidebar Mini */}
      <aside className="w-64 bg-[#0A0A0A] text-[#F4F1EC] hidden md:flex flex-col border-r border-[#3A0D0D]/30 shadow-2xl">
        <div className="p-8 border-b border-[#3A0D0D]/30">
          <h1 className="text-xl tracking-[0.3em] font-bold">ZOCIETY</h1>
          <p className="text-[10px] tracking-widest text-[#BFBFBF] mt-2 uppercase">Command Center</p>
        </div>
        <nav className="flex-1 p-6 space-y-6 text-xs uppercase tracking-widest">
          <Link href="/admin" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">DASHBOARD</Link>
          <Link href="/admin/po-manager" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">PO Manager</Link>
          <Link href="/admin/inventory" className="block text-[#F4F1EC] font-bold underline underline-offset-8">Stock Archive</Link>
          <Link href="/admin/addproduct" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">+ New Artifact</Link>
          <Link href="/admin/journal-manager" className="block text-[#F4F1EC] font-bold underline">JOURNAL MANAGER</Link>
          <Link href="/admin/addjournal" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">+ NEW DISPATCH</Link>
        </nav>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-12 border-b border-[#0A0A0A]/20 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-widest uppercase text-[#0A0A0A]">Journal Archive</h1>
            <p className="text-xs text-[#888888] mt-2 uppercase tracking-widest">Manage your editorial dispatches</p>
          </div>
          <Link href="/admin/addjournal" className="px-6 py-3 bg-[#0A0A0A] text-[#F4F1EC] text-[10px] uppercase tracking-widest hover:bg-[#3A0D0D] transition-colors">
            + Create New
          </Link>
        </header>

        {/* List Jurnal */}
        <div className="bg-white border border-neutral-200">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-[10px] uppercase tracking-widest text-[#888888]">
              <tr>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs font-light">
              {journals.length === 0 ? (
                <tr><td colSpan={4} className="p-12 text-center text-neutral-400 italic">No articles found in the archive.</td></tr>
              ) : (
                journals.map((journal) => (
                  <tr key={journal.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-4 text-[#888888]">
                      {new Date(journal.publishedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
                    </td>
                    <td className="p-4 font-bold tracking-wide uppercase text-[#0A0A0A]">
                      {journal.title}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-[9px] font-bold tracking-tighter uppercase">PUBLISHED</span>
                    </td>
                    <td className="p-4 text-right space-x-4">
                      <Link href={`/journal/${journal.id}`} target="_blank" className="text-[10px] uppercase tracking-widest text-blue-600 hover:underline">View</Link>
                      <button onClick={() => handleDelete(journal.id)} className="text-[10px] uppercase tracking-widest text-red-600 hover:underline">Delete</button>
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