import Link from 'next/link';
import Image from 'next/image';
import prisma from '../lib/prisma'; // Pastikan path ke prisma benar

export default async function Shop() {
  // Ambil data asli dari database
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="pt-40 pb-24 px-8 max-w-screen-2xl mx-auto min-h-screen">
      <header className="mb-20">
        <h1 className="text-4xl tracking-widest uppercase font-bold text-[#0A0A0A]">Collection 01</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
        {products.map((product) => (
          <Link href={`/shop/${product.id}`} key={product.id} className="group cursor-pointer block">
            <div className="relative aspect-[4/5] bg-[#E8E3DC] mb-4 overflow-hidden">
              <Image 
                src={product.images[0] || "/products/comingsoon.webp"} 
                alt={product.name}
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="flex justify-between items-center text-xs tracking-widest uppercase text-[#0A0A0A]">
              <span>{product.name}</span>
              <span className="text-[#BFBFBF] group-hover:text-[#3A0D0D] transition-colors">
                On salez
              </span>
            </div>
          </Link>
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-center text-xs uppercase tracking-[0.3em] text-neutral-400">Archive is empty.</p>
      )}
    </div>
  );
}