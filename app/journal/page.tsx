import Link from 'next/link';
import prisma from '../lib/prisma'; // Sesuaikan jalur foldernya (contoh: '../lib/prisma' atau '@/lib/prisma')

// Memastikan halaman selalu menarik data terbaru setiap ada artikel baru
export const revalidate = 0; 

export default async function Journal() {
  // Menarik data artikel dari Supabase (Hanya yang statusnya "isPublished: true")
  // Diurutkan dari tanggal publish terbaru ke terlama
  const articles = await prisma.journal.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });

  // Fungsi otomatis untuk merombak tanggal dari database jadi format "OCT 12"
  const formatDate = (date: Date | null) => {
    if (!date) return "UNKNOWN";
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <div className="pt-40 pb-24 px-8 max-w-screen-md mx-auto min-h-screen">
      <header className="mb-24">
        <h1 className="text-4xl tracking-widest uppercase font-bold text-[#0A0A0A]">Journal</h1>
      </header>

      <div className="flex flex-col gap-16">
        {articles.length === 0 ? (
          <div className="text-center py-20 border-t border-b border-[#0A0A0A]/20">
            <p className="text-xs uppercase tracking-widest text-[#888888]">No dispatches available at the moment.</p>
          </div>
        ) : (
          articles.map((article) => (
            // Menggunakan "slug" untuk URL supaya lebih SEO Friendly (misal: /journal/the-raw-hem)
            <Link href={`/journal/${article.id}`} key={article.id} className="group cursor-pointer block border-b border-[#BFBFBF] pb-12">
              
              {/* Meta Data */}
              <p className="text-xs text-[#BFBFBF] uppercase tracking-widest mb-4">
                {formatDate(article.publishedAt)} — EDITORIAL
              </p>
              
              {/* Judul Artikel dengan efek hover warna Burgundy */}
              <h2 className="text-2xl md:text-3xl text-[#0A0A0A] group-hover:text-[#3A0D0D] transition-colors font-medium tracking-wide">
                {article.title}
              </h2>

            </Link>
          ))
        )}
      </div>
    </div>
  );
}