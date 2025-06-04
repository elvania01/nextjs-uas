// app/api/transaction/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET semua transaksi
export async function GET() {
  try {
    const data = await prisma.transaksi.findMany({
      include: { produk: true },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST buat transaksi baru
export async function POST(req: Request) {
  const body = await req.json();
  try {
    const created = await prisma.transaksi.create({
      data: {
        produkId: body.produkId,
        nama_pembeli: body.nama_pembeli,
        tanggal_transaksi: new Date(body.tanggal_transaksi),
        total_harga: Number(body.total_harga),
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal membuat transaksi' }, { status: 500 });
  }
}