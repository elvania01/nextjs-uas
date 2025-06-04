import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.produk.findUnique({ where: { id: params.id } });
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}


export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const data = await req.json();

  // Pastikan parsing nilai number!
  data.price = Number(data.price);
  data.stock = Number(data.stock);

  try {
    const updated = await prisma.produk.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Gagal update produk:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await prisma.produk.delete({ where: { id: params.id } });
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menghapus' }, { status: 500 });
  }
}

