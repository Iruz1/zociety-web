import Link from 'next/link';

// Data artikel sementara
const articles = [
  { id: 1, title: "The Architecture of Boxy Proportions", date: "OCT 12", category: "Styling" },
  { id: 2, title: "Monochrome Emotion: Why Black Speaks Loudest", date: "NOV 04", category: "Philosophy" },
  { id: 3, title: "Behind Collection 01: The Raw Hem", date: "NOV 28", category: "Process" },
];

export default function Journal() {
  return (
    <div className="pt-40 pb-24 px-8 max-w-screen-md mx-auto min-h-screen">
      <header className="mb-24">
        <h1 className="text-4xl tracking-widest uppercase font-bold text-[#0A0A0A]">Journal</h1>
      </header>

      <div className="flex flex-col gap-16">
        {articles.map((article) => (
          <Link href={`/journal/${article.id}`} key={article.id} className="group cursor-pointer block border-b border-[#BFBFBF] pb-12">
            {/* Meta Data */}
            <p className="text-xs text-[#BFBFBF] uppercase tracking-widest mb-4">
              {article.date} — {article.category}
            </p>
            {/* Judul Artikel dengan efek hover warna Burgundy */}
            <h2 className="text-2xl md:text-3xl text-[#0A0A0A] group-hover:text-[#3A0D0D] transition-colors font-medium tracking-wide">
              {article.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}