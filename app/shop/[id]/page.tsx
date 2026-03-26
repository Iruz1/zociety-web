import Image from 'next/image';
import Link from 'next/link';

// Data disamakan persis dengan halaman Shop
const productsData: Record<string, { name: string, price: string, desc: string, images: string[] }> = {
  "1": { 
    name: "Heavyweight Box Hoodie", 
    price: "$180", 
    desc: "Crafted from 500gsm organic cotton. Features an oversized, boxy fit with drop shoulders and a double-lined hood. Pre-shrunk for a consistent architectural silhouette.",
    images: ["/back.jpeg"] 
  },
  "2": { 
    name: "Deconstructed Trouser", 
    price: "$240", 
    desc: "Cut from heavyweight Italian wool-blend gabardine. Features an asymmetric waistline and elongated, pooling hems intended for a stacked silhouette over footwear. Unlined for fluidity.",
    images: ["/download (2).jpeg"] 
  },
  "3": { 
    name: "Raw Hem Trench", 
    price: "$450", 
    desc: "An exaggerated take on the classic trench. Unstructured shoulders, raw cut hems that will naturally fray over time, and a sweeping floor-length drape.",
    images: ["/t-shirts.jpeg"] 
  },
  "4": { 
    name: "Minimalist Ribbed Knit", 
    price: "$150", 
    desc: "A second-skin fit constructed from a fine merino wool blend. Elongated sleeves create deliberate stacking at the wrists. A foundational layering piece.",
    images: ["/download (2).jpeg"] 
  },
};

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productsData[id];

  if (!product) {
    return (
      <div className="pt-40 pb-24 px-8 min-h-screen flex flex-col items-center justify-center text-[#0A0A0A]">
        <h1 className="text-3xl tracking-widest uppercase font-bold mb-4">Product Not Found</h1>
        <Link href="/shop" className="text-xs uppercase tracking-widest text-[#BFBFBF] hover:text-[#0A0A0A] transition-colors">
          ← Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-8 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start min-h-screen">
      
      {/* Kiri: Foto */}
      <div className="flex flex-col gap-4">
        {product.images.map((imgSrc, index) => (
          <div key={index} className="aspect-[3/4] w-full relative overflow-hidden bg-[#E8E3DC] group">
            <Image 
              src={imgSrc}
              alt={`${product.name} - View ${index + 1}`}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* Kanan: Info Produk */}
      <div className="md:sticky md:top-32 flex flex-col text-[#0A0A0A]">
        <Link href="/shop" className="text-xs uppercase tracking-widest text-[#BFBFBF] hover:text-[#0A0A0A] mb-8 inline-block transition-colors">
          ← Back to Collection
        </Link>

        <h1 className="text-3xl tracking-widest uppercase font-bold mb-2">{product.name}</h1>
        <p className="text-lg text-[#BFBFBF] mb-12">{product.price}</p>

        <div className="text-sm font-light leading-relaxed mb-12 max-w-md">
          <p>{product.desc}</p>
        </div>

        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest mb-4">Select Size</p>
          <div className="flex gap-4">
            {['S', 'M', 'L', 'XL'].map(size => (
              <button key={size} className="w-12 h-12 border border-[#BFBFBF] text-xs hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F4F1EC] transition-all">
                {size}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full md:w-auto px-12 py-5 bg-[#0A0A0A] hover:bg-[#3A0D0D] text-[#F4F1EC] uppercase tracking-widest text-xs font-bold transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}