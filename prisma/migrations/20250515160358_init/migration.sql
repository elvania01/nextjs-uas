-- CreateTable
CREATE TABLE "Produk" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "category" TEXT,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id_transaksi" SERIAL NOT NULL,
    "produkId" TEXT NOT NULL,
    "nama_pembeli" TEXT NOT NULL,
    "tanggal_transaksi" TIMESTAMP(3) NOT NULL,
    "total_harga" INTEGER NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id_transaksi")
);

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
