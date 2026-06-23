import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      email, firstName, lastName, address, city, 
      postalCode, phone, paymentMethod, subtotal, 
      shippingFee, totalAmount, items 
    } = body;

    const newOrder = await prisma.order.create({
      data: {
        email,
        firstName,
        lastName,
        address,
        city,
        postalCode,
        phone,
        paymentMethod,
        subtotal: parseFloat(subtotal),
        shippingFee: parseFloat(shippingFee),
        totalAmount: parseFloat(totalAmount),
        status: "PENDING",
        // PROSES ITEM: Memasukkan ke tabel OrderItem secara otomatis
        items: {
          create: items.map((item: { id: string; name: string; size: string; price: string; quantity: string }) => ({
            productId: item.id,
            name: item.name,
            size: item.size,
            price: parseFloat(item.price),
            quantity: parseInt(item.quantity)
          }))
        }
      }
    });

    return NextResponse.json({ success: true, orderId: newOrder.id });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}