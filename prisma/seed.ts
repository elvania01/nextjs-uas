import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Hapus data lama (opsional)
  await prisma.transaksi.deleteMany()
  await prisma.produk.deleteMany()

  // Buat produk dummy
  const produk1 = await prisma.produk.create({
    data: {
      name: 'Buket Mawar Merah',
      price: 150000,
      image: 'https://example.com/buket-mawar.jpg',
      description: 'Buket bunga mawar merah elegan',
      category: 'wedding',
      stock: 10
    }
  })

  const produk2 = await prisma.produk.create({
    data: {
      name: 'Buket Ulang Tahun',
      price: 100000,
      image: 'https://example.com/buket-ultah.jpg',
      description: 'Buket ceria untuk ulang tahun',
      category: 'birthday',
      stock: 15
    }
  })

  // Transaksi dummy (opsional)
  await prisma.transaksi.create({
    data: {
      produkId: produk1.id,
      nama_pembeli: 'Putri',
      tanggal_transaksi: new Date(),
      total_harga: produk1.price
    }
  })
}

main()
  .then(() => {
    console.log('Seeding selesai!')
    prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
