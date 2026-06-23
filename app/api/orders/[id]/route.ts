import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: { status: status },
    });

    return NextResponse.json({ success: true, updatedOrder });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}