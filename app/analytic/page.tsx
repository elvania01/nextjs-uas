import { PrismaClient } from '@prisma/client';
import AnalyticClient from '@/app/analytic/AnalyticClient';
import TopNav2 from "@/components/topnav2"; // Pastikan path-nya sesuai struktur project

const prisma = new PrismaClient();

export default async function AnalyticPage() {
  const produkList = await prisma.produk.findMany();
  const transaksiList = await prisma.transaksi.findMany({
    include: { produk: true },
  });

  return (
    <div className="px-6 py-4">
      {/* Admin Navigation */}
      <TopNav2 />

      {/* Analytic Section */}
      <AnalyticClient produkList={produkList} transaksiList={transaksiList} />
    </div>
  );
}
