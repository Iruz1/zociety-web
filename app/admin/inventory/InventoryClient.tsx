"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function InventoryClient({ initialProducts }: { initialProducts: any[] }) {
  // Gunakan state agar saat dihapus, barisnya langsung hilang dari layar
  const [products, setProducts] = useState(initialProducts || []);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this artifact from the public archive?")) return;

    try {
      // PASTIKAN PATH INI SAMA DENGAN NAMA FOLDER API KAMU (pakai /products/ atau /product/)
      const res = await fetch(`/api/products/${id}`, { 
        method: 'DELETE' 
      });
      
      const result = await res.json();

      if (result.success) {
        setProducts(prev => prev.filter(p => p.id !== id));
        alert("Artifact removed.");
      } else {
        alert("Failed to delete from database.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error connection.");
    }
  };

  return (
    <div className="bg-white border border-neutral-200 overflow-hidden shadow-sm">
      <table className="w-full text-left text-sm border-collapse">
        <thead className="bg-neutral-50 border-b border-neutral-200 text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
          <tr>
            <th className="p-5 font-bold">Piece</th>
            <th className="p-5 font-bold">Price</th>
            <th className="p-5 font-bold">Sizes</th>
            <th className="p-5 font-bold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 italic">
          {products.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-20 text-center text-neutral-400 uppercase tracking-widest text-[10px]">
                No artifacts found in storage.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-neutral-50 transition-colors group">
                <td className="p-5 flex items-center gap-4">
                  <div className="w-12 h-16 relative bg-[#E8E3DC] overflow-hidden flex-shrink-0 border border-neutral-100">
                    {/* Cek apakah ada images[0] sebelum render */}
                    {product.images && product.images[0] ? (
                      <Image 
                        src={product.images[0]} 
                        alt={product.name} 
                        fill 
                        className="object-cover"
                        sizes="50px"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-200" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold uppercase tracking-wider text-[11px] block">{product.name}</span>
                    <span className="text-[9px] text-neutral-400 uppercase tracking-tighter italic">ID: {product.id.slice(-6)}</span>
                  </div>
                </td>
                <td className="p-5 font-bold text-[#0A0A0A]">${product.price}</td>
                <td className="p-5">
                  <div className="flex flex-wrap gap-1">
                    {product.sizes?.map((s: string) => (
                      <span key={s} className="px-2 py-0.5 border border-neutral-200 text-[9px] uppercase font-medium">{s}</span>
                    ))}
                  </div>
                </td>
                <td className="p-5 text-right">
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="text-[10px] uppercase tracking-widest text-red-600 hover:text-black font-bold transition-colors underline underline-offset-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}