import Link from 'next/link';
import prisma from '../../lib/prisma';
import InventoryClient from './InventoryClient';

// Menjamin data selalu ditarik langsung dari database
export const dynamic = 'force-dynamic';

export default async function InventoryPage() {
  let safeProducts = [];
  let hasError = false;

  try {
    // 1. Ambil data asli dari database Prisma
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // 2. Serialize data agar aman dikirim ke Client Component
    safeProducts = JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Database Fetch Error:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F1EC]">
        <p className="uppercase tracking-[0.3em] text-xs font-bold text-red-600 italic">Database Connection Error</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col md:flex-row absolute inset-0 z-[100]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0A0A0A] text-[#F4F1EC] hidden md:flex flex-col p-8 border-r border-[#3A0D0D]/30 shadow-2xl flex-shrink-0">
        <Link href="/admin" className="text-xl tracking-[0.3em] font-bold hover:text-[#BFBFBF] transition-colors">
          ZOCIETY
        </Link>
        <p className="text-[10px] tracking-widest text-[#BFBFBF] mt-2 uppercase mb-12">Inventory System</p>
        
        <nav className="space-y-6 text-xs uppercase tracking-widest">
            <Link href="/admin" className="block text-[#F4F1EC] font-bold transition-colors">DASHBOARD</Link>
          <Link href="/admin/inventory" className="block text-[#F4F1EC] font-bold underline underline-offset-8">Stock Archive</Link>
          <Link href="/admin/addproduct" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">+ New Artifact</Link>
          <Link href="/admin/journal-manager" className="block text-[#BFBFBF] hover:text-[#F4F1EC]">Journal Archive</Link>
        </nav>

        <div className="mt-auto pt-8 border-t border-[#3A0D0D]/50">
          <Link href="/" className="text-[10px] uppercase tracking-widest text-[#BFBFBF] hover:text-[#F4F1EC]">
            ← Storefront
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-12 border-b border-[#0A0A0A]/20 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-widest uppercase text-[#0A0A0A]">Inventory</h1>
            <p className="text-xs text-[#888888] mt-2 uppercase tracking-widest">Managing the architecture of stock</p>
          </div>
          <Link href="/admin/addproduct" className="px-6 py-3 bg-[#0A0A0A] text-[#F4F1EC] text-[10px] uppercase tracking-widest font-bold hover:bg-[#3A0D0D] transition-colors shadow-lg">
            + Register New Piece
          </Link>
        </header>

        {/* Menampilkan Tabel dari Client Component */}
        <InventoryClient initialProducts={safeProducts} />
      </main>
    </div>
  );
}