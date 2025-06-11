import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();

  //  VALIDASI harga dan stok
  if (!data.name || data.price == null || data.stock == null) {
    return NextResponse.json(
      { error: 'Nama, harga, dan stok wajib diisi' },
      { status: 400 }
    );
  }

  if (data.price <= 0) {
    return NextResponse.json(
      { error: 'Harga harus lebih dari 0' },
      { status: 400 }
    );
  }

  if (data.stock < 0) {
    return NextResponse.json(
      { error: 'Stok tidak boleh negatif' },
      { status: 400 }
    );
  }

  try {
    const newProduct = await prisma.produk.create({
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        image: data.image,
        description: data.description,
        category: data.category,
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Create failed:', error);
    return NextResponse.json({ error: 'Create failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.produk.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Read failed:', error);
    return NextResponse.json({ error: 'Read failed' }, { status: 500 });
  }
}
