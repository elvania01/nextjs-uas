// app/api/transaction/[id]/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET satu transaksi
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const transaksi = await prisma.transaksi.findUnique({
      where: { id_transaksi: Number(params.id) },
      include: { produk: true },
    });
    if (!transaksi) return NextResponse.json({ error: 'Transaksi tidak ditemukan' }, { status: 404 });
    return NextResponse.json(transaksi);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// PUT update transaksi
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  try {
    const updated = await prisma.transaksi.update({
      where: { id_transaksi: Number(params.id) },
      data: {
        produkId: data.produkId,
        nama_pembeli: data.nama_pembeli,
        tanggal_transaksi: new Date(data.tanggal_transaksi),
        total_harga: Number(data.total_harga),
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal memperbarui transaksi' }, { status: 500 });
  }
}

// DELETE transaksi
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await prisma.transaksi.delete({
      where: { id_transaksi: Number(params.id) },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menghapus transaksi' }, { status: 500 });
  }
}