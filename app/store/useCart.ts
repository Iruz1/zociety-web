import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Kita bikin aturan: Baju yang masuk keranjang harus punya data ini
export interface CartItem {
  id: string;        // ID produk
  name: string;      // Nama baju (misal: "Deconstructed Trouser")
  price: number;     // Harga
  image: string;     // Foto baju
  size: string;      // Ukuran (S, M, L, XL)
  quantity: number;  // Jumlah yang dibeli
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

// 2. Kita buat "Mesin" Keranjangnya
export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [], // Awalnya keranjang kosong

      // Fungsi nambah barang ke keranjang
      addItem: (newItem) => set((state) => {
        // Cek dulu, bajunya dengan ukuran yang sama udah ada di keranjang belum?
        const existingItem = state.items.find(
          (item) => item.id === newItem.id && item.size === newItem.size
        );

        if (existingItem) {
          // Kalau udah ada, tambahin aja jumlahnya (quantity)
          return {
            items: state.items.map((item) =>
              item.id === newItem.id && item.size === newItem.size
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
          };
        }

        // Kalau belum ada, masukin baju baru ke keranjang
        return { items: [...state.items, newItem] };
      }),

      // Fungsi hapus barang dari keranjang
      removeItem: (id, size) => set((state) => ({
        items: state.items.filter((item) => !(item.id === id && item.size === size)),
      })),

      // Fungsi ngubah jumlah barang (misal dari 1 jadi 2 pieces)
      updateQuantity: (id, size, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: Math.max(1, quantity) } // Minimal beli 1
            : item
        ),
      })),

      // Fungsi ngosongin keranjang (Dipakai abis sukses bayar checkout)
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'zociety-cart-storage', // Nama file ingatan di browser pelanggan
    }
  )
);