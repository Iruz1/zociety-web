import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '../../lib/prisma';

export default async function JournalDetail({ params }: { params: Promise<{ id: string }> }) {
  // 1. Tangkap ID dari URL (Bukan slug lagi)
  const { id } = await params;

  // 2. Cari artikel berdasarkan ID
  const article = await prisma.journal.findUnique({
    where: {
      id: id,
    },
  });

  if (!article || !article.isPublished) {
    notFound();
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "UNKNOWN";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <article className="pt-32 pb-32 px-8 max-w-screen-md mx-auto min-h-screen">
      
      <Link href="/journal" className="text-xs uppercase tracking-widest text-[#BFBFBF] hover:text-[#0A0A0A] mb-12 inline-block transition-colors">
        ← Back to Journal
      </Link>
      
      <header className="mb-16">
        <p className="text-xs text-[#3A0D0D] uppercase tracking-widest mb-4 font-bold">
          EDITORIAL — {formatDate(article.publishedAt)}
        </p>
        <h1 className="text-4xl md:text-5xl text-[#0A0A0A] font-medium tracking-wide leading-tight mb-8">
          {article.title}
        </h1>
      </header>

      {article.imageCover ? (
        <div className="w-full aspect-[16/9] bg-[#E8E3DC] mb-16 overflow-hidden">
          <img src={article.imageCover} alt={article.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full aspect-[21/9] bg-[#E8E3DC] mb-16 overflow-hidden flex flex-col items-center justify-center border border-[#0A0A0A]/10">
          <span className="text-[10px] uppercase tracking-widest text-[#888888]">ZOCIETY ARCHIVE</span>
        </div>
      )}

      <div className="prose prose-lg max-w-none text-[#0A0A0A] font-light leading-loose text-justify md:text-left space-y-8 whitespace-pre-wrap">
        {article.content}
      </div>

    </article>
  );
}