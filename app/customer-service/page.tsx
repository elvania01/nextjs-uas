"use client";

import { motion } from "framer-motion";

export default function CustomerServicePage() {
  return (
    <div className="min-h-screen bg-[#fff8f9] text-purple px-6 py-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-8 max-w-3xl w-full shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center drop-shadow-md">
          Butuh Bantuan? Kunjungi Halaman Bantuan di Noona Florist
        </h1>
        <p className="mb-4 leading-relaxed text-lg">
          Apakah Anda memiliki pertanyaan atau keluhan terkait layanan Gojek? Kini Anda dapat menemukan solusinya langsung di halaman Bantuan Noona Florist!
        </p>
        <p className="mb-4 leading-relaxed text-lg">
          Di halaman Bantuan, kami telah menyediakan solusi untuk masalah Anda. Anda juga dapat menelepon dan mengirim email langsung ke agen Layanan Pelanggan Noona Florist dari sini jika Anda memerlukan bantuan lebih lanjut.
        </p>
        <p className="mb-4 leading-relaxed text-lg">
          Dapat membantu Anda melacak status laporan yang telah Anda buat dengan lebih mudah. Anda juga dapat memeriksa respons agen Layanan Pelanggan Noona Florist langsung dari aplikasi. Keren, bukan?
        </p>
        <ul className="list-disc list-inside mt-6 space-y-3 text-lg">
          <li>
            Noona Twitter Account:{" "}
            <span className="font-semibold hover:underline hover:text-yellow-200 cursor-pointer transition duration-200">
              @NoonaFloristIndonesia
            </span>
          </li>
          <li>
            Noona Facebook Account:{" "}
            <span className="font-semibold hover:underline hover:text-yellow-200 cursor-pointer transition duration-200">
              NoonaFloristIndonesia
            </span>
          </li>
          <li>
            Noona Instagram Account:{" "}
            <span className="font-semibold hover:underline hover:text-yellow-200 cursor-pointer transition duration-200">
              NoonaFloristIndonesia
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
