import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Cari Kampanye PO yang aktif
    let activeCampaign = await prisma.poCampaign.findFirst({
      where: { isActive: true }
    });

    // 2. Jika tidak ada kampanye aktif, buat satu (Failsafe)
    if (!activeCampaign) {
      activeCampaign = await prisma.poCampaign.create({
        data: {
          name: "Collection 01 - Alpha Batch",
          startDate: new Date(),
          endDate: new Date(new Date().setDate(new Date().getDate() + 14)), // 2 minggu
          maxQuota: 50,
          isActive: true
        }
      });
    }

    // 3. Simpan Produk ke Database sesuai Schema
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        images: [data.imageUrl], // Masukkan ke dalam array sesuai schema
        sizes: data.sizes,       // Ini sudah array dari frontend
        campaignId: activeCampaign.id
      }
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("🔥 PRODUCT SAVE ERROR:", error);
    return NextResponse.json({ success: false, message: "Gagal menyimpan produk" }, { status: 500 });
  }
}