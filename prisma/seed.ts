const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.transaksi.deleteMany();
  await prisma.produk.deleteMany();

  const produkData = [
    {
      name: 'Buket Mawar Merah',
      price: 150000,
      image: 'https://example.com/buket-mawar.jpg',
      description: 'Buket bunga mawar merah elegan',
      category: 'wedding',
      stock: 10,
    },
    {
      name: 'Buket Ulang Tahun',
      price: 100000,
      image: 'https://example.com/buket-ultah.jpg',
      description: 'Buket ceria untuk ulang tahun',
      category: 'birthday',
      stock: 15,
    },
    {
      name: 'Buket Anniversary Pink',
      price: 120000,
      image: 'https://example.com/buket-anniv.jpg',
      description: 'Buket bunga pink romantis',
      category: 'anniversary',
      stock: 8,
    },
    {
      name: 'Buket Graduation',
      price: 130000,
      image: 'https://example.com/buket-grad.jpg',
      description: 'Buket bunga kelulusan penuh harapan',
      category: 'special-event',
      stock: 12,
    },
    {
      name: 'Buket Lily Putih',
      price: 145000,
      image: 'https://example.com/buket-lily.jpg',
      description: 'Buket lily putih mewah',
      category: 'wedding',
      stock: 9,
    },
    {
      name: 'Buket Bunga Matahari',
      price: 110000,
      image: 'https://example.com/buket-sunflower.jpg',
      description: 'Buket bunga matahari ceria',
      category: 'birthday',
      stock: 14,
    },
    {
      name: 'Buket Mini Kuning',
      price: 80000,
      image: 'https://example.com/buket-mini.jpg',
      description: 'Buket mungil warna kuning',
      category: 'special-event',
      stock: 20,
    },
    {
      name: 'Buket Mix Flower',
      price: 160000,
      image: 'https://example.com/buket-mix.jpg',
      description: 'Campuran bunga premium',
      category: 'anniversary',
      stock: 6,
    },
    {
      name: 'Buket Mawar Putih',
      price: 150000,
      image: 'https://example.com/buket-putih.jpg',
      description: 'Buket bunga mawar putih elegan',
      category: 'wedding',
      stock: 11,
    },
    {
      name: 'Buket Romantis',
      price: 175000,
      image: 'https://example.com/buket-romantis.jpg',
      description: 'Buket bunga romantis untuk pasangan',
      category: 'anniversary',
      stock: 5,
    }
  ];

  const produkList = [];
  for (const data of produkData) {
    const produk = await prisma.produk.create({ data });
    produkList.push(produk);
  }

  // Buat transaksi
  const transaksiData = [
    {
      produkId: produkList[0].id,
      nama_pembeli: 'Putri',
      tanggal_transaksi: new Date('2025-05-10'),
      total_harga: produkList[0].price,
    },
    {
      produkId: produkList[1].id,
      nama_pembeli: 'Dewi',
      tanggal_transaksi: new Date('2025-05-11'),
      total_harga: produkList[1].price,
    },
    {
      produkId: produkList[2].id,
      nama_pembeli: 'Lestari',
      tanggal_transaksi: new Date('2025-05-12'),
      total_harga: produkList[2].price,
    },
    {
      produkId: produkList[3].id,
      nama_pembeli: 'Yuni',
      tanggal_transaksi: new Date('2025-05-13'),
      total_harga: produkList[3].price,
    },
    {
      produkId: produkList[4].id,
      nama_pembeli: 'Sinta',
      tanggal_transaksi: new Date('2025-05-14'),
      total_harga: produkList[4].price,
    },
    {
      produkId: produkList[5].id,
      nama_pembeli: 'Arum',
      tanggal_transaksi: new Date('2025-05-15'),
      total_harga: produkList[5].price,
    }
  ];

  for (const transaksi of transaksiData) {
    await prisma.transaksi.create({ data: transaksi });
  }

  console.log('✅ Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding gagal:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
