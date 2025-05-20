import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const transaksi = await prisma.transaksi.findMany({
      include: {
        produk: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        tanggal_transaksi: 'desc',
      },
    });

    return NextResponse.json(transaksi);
  } catch (error) {
    return NextResponse.json({ error: "Fetch error" }, { status: 500 });
  }
}
