import Image from 'next/image';

export default function About() {
  return (
    <div className="pt-40 pb-32 px-6 md:px-8 max-w-screen-xl mx-auto min-h-screen flex flex-col items-center">
      
      {/* Judul Halaman */}
      <h1 className="text-4xl md:text-7xl font-bold tracking-[0.2em] uppercase text-[#0A0A0A] mb-16 text-center">
        On Our Termz
      </h1>

      {/* Gambar Utama (Hero About) - Format memanjang seperti banner film */}
      <div className="w-full aspect-video md:aspect-[2.5/1] bg-[#E8E3DC] mb-24 overflow-hidden relative group">
         <Image 
            src="/Group 12.png" // Pastikan file fotomu sudah ada
            alt="ZOCIETY Philosophy"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out grayscale hover:grayscale-0"
            sizes="100vw"
         />
      </div>

      {/* Layout Editorial Majalah (2 Kolom di Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start w-full max-w-5xl">
        
        {/* Kolom Kiri: Teks Filosofi */}
        <div className="text-[#0A0A0A] space-y-8 text-sm md:text-base leading-loose font-light text-justify md:text-left">
          <p>
            ZOCIETY was born from the tension between structured Scandinavian minimalism and the raw emotion of dark streetwear. We do not design for a specific demographic; we design for a mindset.
          </p>
          <p>
            Every piece is an exploration of form, fabric, and silhouette. We believe in garments that speak softly but carry immense weight. Premium materials, deliberate cuts, and an understated rebellion.
          </p>
          <p className="font-medium tracking-widest uppercase text-xs pt-8 border-t border-[#0A0A0A]/20">
            — Established 2026
          </p>
        </div>

        {/* Kolom Kanan: Gambar Pendukung (Portrait) - Disembunyikan di HP agar tidak kepanjangan */}
        <div className="w-full aspect-[3/4] bg-[#BFBFBF] relative overflow-hidden hidden md:block">
          <Image 
            src="/images/about-detail.jpg" // Pastikan file fotomu sudah ada
            alt="ZOCIETY Studio"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

      </div>
    </div>
  );
}