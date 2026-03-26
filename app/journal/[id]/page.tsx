export default function JournalDetail({ params }: { params: { id: string } }) {
  return (
    <article className="pt-32 pb-32 px-8 max-w-screen-md mx-auto min-h-screen">

      {/* Header Artikel */}
      <header className="mb-16">
        <p className="text-xs text-[#3A0D0D] uppercase tracking-widest mb-4 font-bold">
          Styling — OCT 12
        </p>
        <h1 className="text-4xl md:text-5xl text-[#0A0A0A] font-medium tracking-wide leading-tight mb-8">
          The Architecture of Boxy Proportions {params.id}
        </h1>
      </header>

      {/* Gambar Utama Artikel (Placeholder) */}
      <div className="w-full aspect-[16/9] bg-[#E8E3DC] mb-16 overflow-hidden">
        <div className="w-full h-full bg-neutral-300"></div>
      </div>

      {/* Isi Konten Artikel */}
      <div className="prose prose-lg max-w-none text-[#0A0A0A] font-light leading-loose text-justify md:text-left space-y-8">
        <p>
          In the realm of dark minimalist streetwear, volume is not merely about size; it is about architecture. The way a garment drapes across the body dictates the emotion it conveys. An oversized silhouette, when executed with precision, creates a sense of effortless armor.
        </p>
        <p>
          Consider the heavyweight box hoodie. It doesn't just sit on the shoulders—it commands space. The raw hems and drop shoulders pull the center of gravity downward, grounding the wearer while simultaneously obscuring the natural form. This is the essence of what we build at ZOCIETY: garments that protect, project, and redefine the undefined.
        </p>
        <blockquote className="border-l-2 border-[#3A0D0D] pl-6 italic text-xl my-12 text-[#3A0D0D]">
          "We do not design to fit in. We design to carve out our own space in the room."
        </blockquote>
        <p>
          Fabric choice plays a critical role. Stiff gabardine holds its shape, creating sharp, structural lines, while soft, heavy cotton loops collapse into themselves, creating organic pooling at the wrists and waist. Mastering this balance is what elevates everyday wear into high-fashion storytelling.
        </p>
      </div>
    </article>
  );
}