"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '', // Tetap string dulu dari input
    description: '',
    imageUrl: '',
    sizes: [] as string[],
  });

  // --- FUNGSI UPLOAD FOTO (Tetap Sama) ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const result = await response.json();
      if (result.url) {
        setFormData(prev => ({ ...prev, imageUrl: result.url }));
        alert("Photo uploaded successfully!");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      alert("Failed to upload image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert("Please upload a product photo first.");
    if (formData.sizes.length === 0) return alert("Please select at least one size.");
    
    setIsLoading(true);
    try {
      // Pastikan price dikirim sebagai number (Integer IDR)
      const dataToSubmit = {
        ...formData,
        price: parseInt(formData.price) 
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();
      if (result.success) {
        alert(`Artifact "${formData.name}" added to the archive!`);
        router.push('/admin/inventory'); // Arahkan ke inventory
      }
    } catch (error) {
      alert("Database connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
    }));
  };

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-[#0A0A0A] flex flex-col md:flex-row absolute inset-0 z-[100]">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#0A0A0A] text-[#F4F1EC] p-8 border-r border-[#3A0D0D]/30 flex-shrink-0 hidden md:block">
        <Link href="/admin" className="text-xl tracking-[0.3em] font-bold">ZOCIETY</Link>
        <p className="text-[10px] tracking-widest text-[#BFBFBF] mt-2 uppercase mb-12">Command Center</p>
        <Link href="/admin/inventory" className="text-xs uppercase tracking-widest text-[#BFBFBF] hover:text-[#F4F1EC] transition-colors flex items-center gap-2">← Back to Archive</Link>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12 border-b border-[#0A0A0A]/20 pb-6">
            <h1 className="text-3xl font-bold tracking-widest uppercase">Register Artifact</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#888888] mt-2">Add new piece to the ZOCIETY archive.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2">Product Name</label>
                    <input type="text" required placeholder="BOXY TEE - BLACK" className="w-full bg-transparent border-b border-[#0A0A0A]/30 pb-3 outline-none focus:border-black transition-colors"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                
                {/* --- INPUT HARGA (IDR) --- */}
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2 text-red-500">Price (IDR ONLY)</label>
                    <div className="relative">
                        <span className="absolute left-0 bottom-3 text-xs text-[#0A0A0A]">Rp</span>
                        <input type="number" required placeholder="349000" className="w-full bg-transparent border-b border-[#0A0A0A]/30 pb-3 pl-7 outline-none focus:border-black transition-colors"
                        value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                    </div>
                    <p className="text-[9px] uppercase tracking-widest text-[#888888] mt-2 italic">Input numeric IDR. System will auto-convert to USD.</p>
                </div>
            </div>

            {/* FOTO UPLOAD */}
            <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-4">Product Visual</label>
                <div className="relative w-full h-80 border-2 border-dashed border-[#BFBFBF] flex flex-col items-center justify-center hover:border-black transition-colors cursor-pointer overflow-hidden bg-white/50">
                    {formData.imageUrl ? (
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover grayscale" />
                    ) : (
                        <div className="text-center">
                            <span className="text-2xl font-light text-[#888888]">+</span>
                            <p className="text-[10px] uppercase tracking-widest text-[#888888] mt-2">Upload Artifact Image</p>
                        </div>
                    )}
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2">Artifact Narrative</label>
                <textarea required rows={4} placeholder="Tell the story of this piece..." className="w-full bg-transparent border border-[#0A0A0A]/30 p-4 text-sm outline-none resize-none focus:border-black"
                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>

            <div>
               <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-4">Available Sizes</label>
                <div className="flex gap-4">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button type="button" key={size} onClick={() => toggleSize(size)}
                      className={`w-12 h-12 border text-[10px] font-bold transition-all ${formData.sizes.includes(size) ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#F4F1EC]' : 'border-[#BFBFBF] text-[#0A0A0A] hover:border-black'}`}>
                      {size}
                    </button>
                  ))}
                </div>
            </div>

            <div className="pt-8 border-t border-[#0A0A0A]/10 flex justify-end items-center gap-8">
               <Link href="/admin/inventory" className="text-[10px] uppercase tracking-widest text-[#888888] hover:text-black">Cancel</Link>
               <button type="submit" disabled={isLoading} className="px-12 py-4 bg-[#0A0A0A] hover:bg-[#3A0D0D] text-[#F4F1EC] uppercase tracking-widest text-[10px] font-bold transition-all disabled:opacity-50">
                {isLoading ? 'SYNCING...' : 'PUBLISH ARTIFACT'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}