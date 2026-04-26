import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Tambahkan Promise di sini
) {
  try {
    // 1. WAJIB di-await dulu params-nya di versi Next.js terbaru
    const { id } = await params; 

    console.log("Menghapus Jurnal ID:", id);

    // 2. Sekarang id tidak akan undefined lagi
    await prisma.journal.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true, message: "Artikel berhasil dihapus" });
  } catch (error) {
    console.error("🔥 DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus artikel" },
      { status: 500 }
    );
  }
}