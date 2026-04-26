import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '../lib/prisma'; // Pastikan path ke prisma.ts benar
import AdminDashboardClient from './AdminDashboardClient';
import LogoutButton from './LogoutButton';

// Memastikan data selalu fresh, tidak di-cache oleh Next.js
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 🛡️ SECURITY CHECK: Jika tidak ada token login, tendang ke /login
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (!token) {
    redirect('/login');
  }

  try {
    // 1. AMBIL DATA REAL-TIME DARI DATABASE
    const [productCount, journalCount, recentProducts, orderCount] = await Promise.all([
      prisma.product.count(),
      prisma.journal.count(),
      prisma.product.findMany({ take: 3, orderBy: { createdAt: 'desc' } }),
      prisma.order.count(),
    ]);

    // Simulasi Revenue (Average price $180)
    const totalRevenue = orderCount * 180;

    const stats = [
      { label: 'Gross Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+100%', comparison: 'initial launch' },
      { label: 'Active Artifacts', value: productCount.toString(), change: 'LIVE', comparison: 'in archive' },
      { label: 'Journal Dispatches', value: journalCount.toString(), change: 'PUBLISHED', comparison: 'editorial count' },
      { label: 'Total Orders', value: orderCount.toString(), change: 'NEW', comparison: 'pending action' }
    ];

    return (
      <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col md:flex-row absolute inset-0 z-[100]">
        
        {/* Navigasi Mobile & Clock Logic */}
        <AdminDashboardClient />

        {/* --- SIDEBAR KIRI (DESKTOP) --- */}
        <aside className="w-64 bg-[#0A0A0A] text-[#F4F1EC] hidden md:flex flex-col border-r border-[#3A0D0D]/30 shadow-2xl flex-shrink-0">
          <div className="p-8 border-b border-[#3A0D0D]/30 space-y-2">
            <h1 className="text-xl tracking-[0.3em] font-bold">ZOCIETY</h1>
            <p className="text-[10px] tracking-widest text-[#BFBFBF] uppercase border border-[#BFBFBF]/20 px-2 py-0.5 inline-block">Command Center</p>
          </div>
          
          <nav className="flex-1 p-6 space-y-6 text-xs uppercase tracking-widest">
            <Link href="/admin" className="block text-[#F4F1EC] font-bold underline underline-offset-8 decoration-[#3A0D0D]">DASHBOARD</Link>
            <Link href="/admin/po-manager" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">PO Manager</Link>
            <Link href="/admin/inventory" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">Inventory</Link>
            <Link href="/admin/journal-manager" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">Journal Manager</Link>
            <Link href="/admin/Chatbot" className="block text-[#888888] hover:text-[#F4F1EC] transition-colors">Chatbot Managerss</Link>
            <Link href="/admin/inbox" className="block text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">Inbox</Link>
          </nav>
          
          <div className="p-6 border-t border-[#3A0D0D]/30 flex flex-col gap-4">
            {/* Tombol Logout Desktop */}
            <LogoutButton />
            <Link href="/" className="text-[10px] uppercase tracking-widest text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors">
              ← Back to Storefront
            </Link>
          </div>
        </aside>

        {/* --- KONTEN UTAMA --- */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto w-full">
          
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 border-b border-[#0A0A0A]/20 pb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-widest uppercase text-[#0A0A0A]">Overview</h2>
              <p className="text-xs text-[#888888] uppercase tracking-widest">
                  Welcome back, <span className="text-[#0A0A0A] font-bold uppercase">Admin Zuhdi.</span>
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Link href="/admin/addproduct" className="flex-1 md:flex-none text-center px-6 py-3 bg-[#0A0A0A] text-[#F4F1EC] text-[10px] uppercase tracking-widest font-bold hover:bg-[#3A0D0D] transition-all shadow-xl">
                + New Product
              </Link>
              <Link href="/admin/addjournal" className="flex-1 md:flex-none text-center px-6 py-3 border border-[#0A0A0A] text-[#0A0A0A] text-[10px] uppercase tracking-widest hover:bg-[#0A0A0A] hover:text-[#F4F1EC] transition-colors">
                + New Journal
              </Link>
            </div>
          </header>

          {/* 1. KARTU STATISTIK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className={`p-6 shadow-sm ${index === 0 ? 'bg-[#0A0A0A] text-[#F4F1EC]' : 'bg-white border border-neutral-200 hover:border-[#0A0A0A]'} transition-colors`}>
                <p className={`text-[10px] uppercase tracking-widest mb-3 ${index === 0 ? 'text-[#BFBFBF]' : 'text-[#888888]'}`}>{stat.label}</p>
                <p className="text-3xl font-bold mb-1 tracking-tighter">{stat.value}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-bold text-green-600">{stat.change}</p>
                  <p className={`text-[9px] uppercase tracking-widest ${index === 0 ? 'text-[#888888]' : 'text-[#BFBFBF]'}`}>{stat.comparison}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 2. AREA DETAIL & RECENT ARTIFACTS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 border border-neutral-200 p-8 shadow-sm bg-white">
               <div className="flex justify-between items-center mb-8 border-b border-neutral-100 pb-4">
                  <div>
                      <h3 className="text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">Latest Artifacts</h3>
                      <p className="text-[10px] text-[#888888] uppercase tracking-widest mt-1">Recently added to the archive</p>
                  </div>
                  <Link href="/admin/inventory" className="text-[10px] uppercase tracking-widest border-b border-black font-bold">View Inventory</Link>
               </div>
               
               <div className="space-y-6">
                  {recentProducts.map((product : any) => (
                    <div key={product.id} className="flex gap-4 items-center pb-4 border-b border-neutral-100 last:border-b-0 last:pb-0">
                      <div className="w-12 h-16 bg-[#E8E3DC] border border-neutral-100 flex-shrink-0 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                          <div>
                              <p className="text-sm font-bold text-[#0A0A0A] uppercase tracking-widest">{product.name}</p>
                              <p className="text-[10px] text-[#888888] mt-1 tracking-widest uppercase">Price: ${product.price}</p>
                          </div>
                          <div className="text-right">
                              <span className="text-[10px] font-bold text-[#0A0A0A] border border-black px-2 py-1 uppercase">{product.sizes[0]}+</span>
                          </div>
                      </div>
                    </div>
                  ))}
                  {recentProducts.length === 0 && (
                    <div className="py-12 text-center">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-400">No products found in the database.</p>
                    </div>
                  )}
               </div>
            </div>

            {/* Status & Links */}
            <div className="bg-[#0A0A0A] text-[#F4F1EC] p-8 flex flex-col justify-between shadow-2xl">
              <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase mb-8 opacity-50">System Logs</h3>
                  <nav className="flex flex-col gap-6 text-[10px] uppercase tracking-[0.2em] font-medium">
                      <Link href="/admin/journal-manager" className="hover:pl-2 transition-all inline-block underline underline-offset-8 decoration-[#3A0D0D]">Manage Editorial →</Link>
                      <Link href="/admin/po-manager" className="hover:pl-2 transition-all inline-block underline underline-offset-8 decoration-[#3A0D0D]">Order Dispatch →</Link>
                      <Link href="/admin/inbox" className="hover:pl-2 transition-all inline-block underline underline-offset-8 decoration-[#3A0D0D]">Customer Inbox →</Link>
                  </nav>
              </div>
              <div className="mt-20 pt-8 border-t border-white/10">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#BFBFBF]">ZOCIETY CORE v1.0</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-green-500 font-bold mt-2 animate-pulse">DB_STATUS: CONNECTED_SECURE</p>
              </div>
            </div>

          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Dashboard Error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F1EC]">
        <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-red-600 animate-pulse">CRITICAL_ERROR: DB_CONNECTION_FAILED</p>
      </div>
    );
  }
}