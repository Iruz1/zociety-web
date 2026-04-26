import Image from 'next/image';
import Link from 'next/link';
import prisma from '../../lib/prisma';
import ProductDetailClient from './ProductDetailClient';

// 1. Tambahkan tipe Promise pada params agar Next.js 15 senang
export default async function ProductDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  
  // 2. WAJIB di-await agar ID tidak undefined saat dibaca Prisma
  const { id } = await params;

  // 3. Tarik data produk dari database berdasarkan ID yang sudah matang
  const product = await prisma.product.findUnique({
    where: { id: id }
  });

  if (!product) {
    return (
      <div className="pt-40 pb-24 px-8 min-h-screen flex flex-col items-center justify-center text-[#0A0A0A]">
        <h1 className="text-3xl tracking-widest uppercase font-bold mb-4 italic">Artifact Not Found</h1>
        <Link href="/shop" className="text-xs uppercase tracking-widest text-[#BFBFBF] hover:text-[#0A0A0A] transition-colors">
          ← Return to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-8 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start min-h-screen">
      {/* Kiri: Gallery Foto (Mengambil Array dari Database) */}
      <div className="flex flex-col gap-4">
        {product.images.map((imgSrc, index) => (
          <div key={index} className="aspect-[3/4] w-full relative overflow-hidden bg-[#E8E3DC] group">
            <Image 
              src={imgSrc} 
              alt={product.name} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* Kanan: Editorial Info & Add to Cart Logic */}
      <div className="md:sticky md:top-32 flex flex-col text-[#0A0A0A]">
        <Link href="/shop" className="text-xs uppercase tracking-widest text-[#BFBFBF] hover:text-[#0A0A0A] mb-8 inline-block transition-colors">
          ← Back to Collection
        </Link>

        <h1 className="text-3xl tracking-widest uppercase font-bold mb-2">{product.name}</h1>
        <p className="text-lg text-[#BFBFBF] mb-12">{product.price}</p>

        <div className="text-sm font-light leading-relaxed mb-12 max-w-md italic">
          <p className="whitespace-pre-line">{product.description}</p>
        </div>

        {/* 4. Bagian Interaktif (Size & Button) tetap di Client Component */}
        <ProductDetailClient product={product} />
      </div>
    </div>
  );
}