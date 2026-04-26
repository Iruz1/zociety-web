"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddJournal() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Editorial',
    excerpt: '',
    content: '',
    imageCover: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Menembak data ke database
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Gagal menyimpan");

      alert(`Journal berhasil diterbitkan: ${formData.title}!`);
      
      // Bersihkan form
      setFormData({ title: '', category: 'Editorial', excerpt: '', content: '', imageCover: '' });
      
      // Langsung arahkan ke halaman utama journal untuk melihat hasilnya
      router.push('/journal');

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat memproses jurnal.");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['Editorial', 'Campaign', 'Process', 'Archive'];

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col md:flex-row absolute inset-0 z-[100]">
      {/* --- MOBILE NAVIGATION BAR --- */}
      <div className="md:hidden w-full bg-[#0A0A0A] text-[#F4F1EC] p-6 flex justify-between items-center z-50 sticky top-0">
        <Link href="/admin" className="text-lg tracking-[0.3em] font-bold">ZOCIETY</Link>
        <button 
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="text-[10px] uppercase tracking-widest font-bold border border-[#F4F1EC]/30 px-3 py-1 hover:bg-[#F4F1EC] hover:text-[#0A0A0A] transition-colors"
        >
          {isMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* --- OVERLAY MOBILE MENU --- */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[76px] left-0 w-full h-[calc(100vh-76px)] bg-[#0A0A0A] text-[#F4F1EC] z-40 p-8 flex flex-col gap-8 overflow-y-auto">
          <nav className="flex flex-col gap-6 text-sm uppercase tracking-widest">
            <Link href="/admin" className="text-[#BFBFBF] hover:text-[#F4F1EC]">DASHBOARD</Link>
            <Link href="/admin/po-manager" className="text-[#BFBFBF] hover:text-[#F4F1EC]">PO Manager</Link>
            <Link href="/admin/community" className="text-[#BFBFBF] hover:text-[#F4F1EC]">COMMUNITY</Link>
            
            <div className="pt-6 border-t border-[#3A0D0D]/50 flex flex-col gap-6">
              <Link href="/admin/addproduct" className="text-[#BFBFBF] hover:text-[#F4F1EC]">+ Add Product</Link>
              <Link href="/admin/addjournal" className="text-[#F4F1EC] font-bold">+ New Journal</Link>
            </div>
          </nav>
        </div>
      )}
      
      {/* Sidebar Mini */}
      <aside className="w-full md:w-64 bg-[#0A0A0A] text-[#F4F1EC] p-8 border-r border-[#3A0D0D]/30 flex-shrink-0 hidden md:block">
        <Link href="/admin" className="text-xl tracking-[0.3em] font-bold hover:text-[#BFBFBF] transition-colors">
          ZOCIETY
        </Link>
        <p className="text-[10px] tracking-widest text-[#BFBFBF] mt-2 uppercase mb-12">Admin Area</p>
        
        <Link href="/admin" className="text-xs uppercase tracking-widest text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors flex items-center gap-2">
          ← Back to Dashboard
        </Link>
      </aside>

      {/* Area Form Utama */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          <header className="mb-12 border-b border-[#0A0A0A]/20 pb-6 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-widest uppercase text-[#0A0A0A]">New Dispatch</h1>
              <p className="text-xs text-[#888888] mt-2 uppercase tracking-widest">Write a new journal entry.</p>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Bagian 1: Judul & Kategori */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2">
                    Editorial Title
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Volume 01: Architecture of Silence"
                    className="w-full bg-transparent border-b border-[#0A0A0A]/30 pb-3 text-xl font-bold outline-none focus:border-[#0A0A0A] transition-colors placeholder:text-[#BFBFBF] placeholder:font-normal"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-4">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {categories.map(cat => (
                      <button 
                        type="button"
                        key={cat}
                        onClick={() => setFormData({...formData, category: cat})}
                        className={`px-6 py-2 border text-[10px] uppercase tracking-widest transition-all ${
                          formData.category === cat 
                            ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#F4F1EC]' 
                            : 'border-[#BFBFBF] text-[#0A0A0A] hover:border-[#0A0A0A]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cover Image Upload (UI Only for now) */}
              {/* Cover Image URL Input */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-4">
                    Cover Image URL (Pinterest / Unsplash Link)
                  </label>
                  <input 
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-transparent border-b border-[#0A0A0A]/30 pb-3 text-sm outline-none focus:border-[#0A0A0A] transition-colors placeholder:text-[#BFBFBF]"
                    value={formData.imageCover}
                    onChange={(e) => setFormData({...formData, imageCover: e.target.value})}
                  />
                  <p className="text-[9px] text-[#BFBFBF] mt-2 uppercase tracking-widest italic">
                    *Right click an image on the web "Copy Image Address" and paste here.
                  </p>
                </div>
            </div>

            {/* Bagian 2: Teks Jurnal */}
            <div className="space-y-8 pt-8 border-t border-[#0A0A0A]/10">
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2 flex justify-between">
                  <span>Short Excerpt</span>
                  <span className="text-[#BFBFBF]">Shown on Journal Grid</span>
                </label>
                <textarea 
                  required
                  rows={2}
                  placeholder="A brief summary of this journal entry..."
                  className="w-full bg-transparent border border-[#0A0A0A]/30 p-4 text-sm outline-none focus:border-[#0A0A0A] transition-colors placeholder:text-[#BFBFBF] resize-none"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2 flex justify-between">
                  <span>Full Article Body</span>
                  <span className="text-[#BFBFBF]">Markdown Supported</span>
                </label>
                <textarea 
                  required
                  rows={15}
                  placeholder="Write your editorial dispatch here... You can use Markdown for **bold** text."
                  className="w-full bg-transparent border border-[#0A0A0A]/30 p-6 text-base font-light leading-loose outline-none focus:border-[#0A0A0A] transition-colors placeholder:text-[#BFBFBF]"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="pt-8 border-t border-[#0A0A0A]/20 flex justify-end">
              <button 
                type="submit" 
                disabled={isLoading}
                className="px-10 py-4 bg-[#0A0A0A] hover:bg-[#3A0D0D] text-[#F4F1EC] uppercase tracking-widest text-xs font-bold transition-colors shadow-lg disabled:opacity-50"
              >
                {isLoading ? 'Publishing...' : 'Publish Journal'}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}