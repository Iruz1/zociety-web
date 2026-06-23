import prisma from '../../lib/prisma';
import InboxClient from './InboxClient';
import Link from 'next/link';

export default async function InboxPage() {
  // Ambil data terbaru dari Supabase secara langsung
  const messages = await prisma.inbox.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex absolute inset-0 z-[100]">
      {/* Sidebar Tetap Sama */}
      <aside className="w-64 bg-[#0A0A0A] text-[#F4F1EC] hidden md:flex flex-col border-r border-[#3A0D0D]/30 flex-shrink-0">
        <div className="p-8 border-b border-[#3A0D0D]/30">
          <h1 className="text-xl tracking-[0.3em] font-bold">ZOCIETY</h1>
        </div>
        <nav className="p-6 space-y-6 text-xs uppercase tracking-widest">
          <Link href="/admin" className="block text-[#BFBFBF]">DASHBOARD</Link>
          <Link href="/admin/inbox" className="block text-[#F4F1EC] font-bold">INBOX</Link>
            <Link href="/admin/po-manager" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">PO Manager</Link>  
          <Link href="/admin/community" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">COMMUNITY</Link>
          <Link href="/admin/inventory" className="block text-[#F4F1EC] font-bold underline underline-offset-8">Stock Archive</Link>
          <Link href="/admin/addproduct" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">+ New Artifact</Link>
          <Link href="/admin/journal-manager" className="block text-[#F4F1EC] font-bold underline">JOURNAL MANAGER</Link>
          <Link href="/admin/addjournal" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">+ NEW DISPATCH</Link>        
        </nav>
      </aside>

      {/* Masukkan Client Component yang tadi kita buat */}
      <InboxClient initialMessages={messages} />
    </div>
  );
}