import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Sesuaikan jumlah ../ dengan letak file prisma kamu

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Menggunakan Promise untuk Next.js 15
) {
  try {
    // 1. Ambil ID dari URL (Contoh: /api/products/cm12345)
    const { id } = await params;

    console.log("🗑️ Menghapus produk dengan ID:", id);

    // 2. Hapus dari database menggunakan Prisma
    await prisma.product.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ success: true, message: "Artifact deleted from archive" });
  } catch (error) {
    console.error("🔥 DELETE API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}