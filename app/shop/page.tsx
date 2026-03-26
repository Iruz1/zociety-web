import Link from 'next/link';
// 1. Tambahkan import Image
import Image from 'next/image';

// 2. Update Data Produk Sementara (Sekarang menyertakan 'image')
const products = [
  { 
    id: 1, 
    name: "Heavyweight Box Hoodie", 
    price: "$180", 
    image: "/back.jpeg" 
  },
  { 
    id: 2, 
    name: "Deconstructed Trouser", 
    price: "$240", 
    image: "/download (2).jpeg"
  },
  { 
    id: 3, 
    name: "Raw Hem Trench", 
    price: "$450", 
    image: "/t-shirts.jpeg"
  },
  { 
    id: 4, 
    name: "Minimalist Ribbed Knit", 
    price: "$150", 
    image: "/download (2).jpeg"
  },
];

export default function Shop() {
  return (
    <div className="pt-40 pb-24 px-8 max-w-screen-2xl mx-auto min-h-screen">
      <header className="mb-20">
        <h1 className="text-4xl tracking-widest uppercase font-bold text-[#0A0A0A]">Collection 01</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
        {products.map((product) => (
          <Link href={`/shop/${product.id}`} key={product.id} className="group cursor-pointer block">
            {/* 3. PERBAIKAN: Mengganti kotak abu-abu dengan foto asli menggunakan <Image /> */}
            <div className="relative aspect-[4/5] bg-[#E8E3DC] mb-4 overflow-hidden">
              <Image 
                src={product.image} // Ambil alamat foto dari data produk
                alt={product.name}
                fill // Mengisi seluruh container div
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            {/* Info Produk */}
            <div className="flex justify-between items-center text-xs tracking-widest uppercase text-[#0A0A0A]">
              <span>{product.name}</span>
              <span className="text-[#BFBFBF] group-hover:text-[#3A0D0D] transition-colors">{product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}