import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <Image src="/upscalemedia-transformed (2).png" alt="Hero Image" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-[#3A0D0D]/20 z-0"></div> 
        <div className="relative z-10 flex flex-col items-center text-[#F4F1EC] mt-20">
          <h1 className="text-6xl md:text-9xl font-bold tracking-[0.15em] mb-4">ZOCIETY</h1>
          <p className="text-sm md:text-base tracking-widest uppercase font-light">
            Built for the Undefined
          </p>
        </div>
      </section>

      {/* Editorial Grid / Featured */}
      {/* PERBAIKAN 1: Bungkus dengan section w-full agar background putih penuh dari ujung ke ujung */}
      <section className="w-full bg-[#F4F1EC]">
        {/* max-w dipindah ke div dalam agar kontennya tetap rapi di tengah */}
        <div className="py-32 px-8 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* === Item 1 === */}
            <div className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#BFBFBF]">
                <Image 
                  src="/products/back.jpeg" // Ganti path sesuai fotomu
                  alt="ZOCIETY Look 1"
                  fill
                  // PERBAIKAN 2: Tambah group-hover:blur-[3px] dan efek group-active (saat diklik)
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[3px] group-hover:opacity-90 group-active:scale-100 group-active:blur-0"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              {/* PERBAIKAN 3: Pastikan teks hitam pekat text-[#0A0A0A] agar tidak tembus pandang */}
              <h3 className="text-sm uppercase tracking-widest font-medium text-[#0A0A0A] transition-colors group-hover:text-[#3A0D0D]">Boxy Silhouette</h3>
              <p className="text-xs text-[#888888] mt-2">Core Collection</p>
            </div>

            {/* === Item 2 === */}
            <div className="group cursor-pointer flex flex-col md:mt-16">
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#E8E3DC]">
                <Image 
                  src="/products/download (2).jpeg" // Ganti path sesuai fotomu
                  alt="ZOCIETY Look 2"
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[3px] group-hover:opacity-90 group-active:scale-100 group-active:blur-0"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-sm uppercase tracking-widest font-medium text-[#0A0A0A] transition-colors group-hover:text-[#3A0D0D]">Cotton Bamboo</h3>
              <p className="text-xs text-[#888888] mt-2">Core Collection</p>
            </div>

            {/* === Item 3 === */}
            <div className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#BFBFBF]">
                <Image 
                  src="/products/t-shirts.jpeg" // Ganti path sesuai fotomu
                  alt="ZOCIETY Look 3"
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[3px] group-hover:opacity-90 group-active:scale-100 group-active:blur-0"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-sm uppercase tracking-widest font-medium text-[#0A0A0A] transition-colors group-hover:text-[#3A0D0D]">Asymmetric Drape</h3>
              <p className="text-xs text-[#888888] mt-2">Core Collection</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}