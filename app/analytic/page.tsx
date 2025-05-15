import { PrismaClient } from '@prisma/client';
import AnalyticClient from '@/app/analytic/AnalyticClient';

const prisma = new PrismaClient();

export default async function AnalyticPage() {
  const produkList = await prisma.produk.findMany();
  const transaksiList = await prisma.transaksi.findMany({
    include: { produk: true },
  });

  return <AnalyticClient produkList={produkList} transaksiList={transaksiList} />;
}
