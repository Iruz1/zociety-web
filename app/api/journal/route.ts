import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma'; // Pastikan titiknya dua (../../)

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Generate Slug otomatis dari Judul
    const generatedSlug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // 2. Pastikan ada akun Admin sebagai penulis (Author)
    let adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          email: 'admin@zociety.com',
          name: 'ZOCIETY Editorial',
          role: 'ADMIN'
        }
      });
    }

    // 3. Simpan Jurnal ke Database (Hanya satu variabel newJournal di sini)
    const newJournal = await prisma.journal.create({
      data: {
        title: data.title,
        slug: generatedSlug,
        content: data.content, // Konten utama dari textarea besar
        imageCover: data.imageCover, // Link URL dari Pinterest/Unsplash
        authorId: adminUser.id,
        isPublished: true,
      }
    });

    return NextResponse.json({ success: true, journalId: newJournal.id }, { status: 200 });
  } catch (error) {
    console.error("🔥 JOURNAL SAVE ERROR:", error);
    return NextResponse.json({ success: false, message: "Gagal menyimpan artikel" }, { status: 500 });
  }
}