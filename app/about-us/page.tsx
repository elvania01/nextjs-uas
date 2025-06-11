'use client';

import React from 'react';

const teamMembers = [
  {
    name: 'Elvania',
    role: 'Founder & Florist Expert',
    image: '/team/owner2.jpg',
  },
  {
    name: 'Aditya Sendana',
    role: 'Marketing Manager',
    image: '/team/owner3.jpg',
  },
  {
    name: 'Vinsensius Dipo',
    role: 'Customer Service',
    image: '/team/owner1.jpg',
  },
];

export default function AboutUsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
      {/* Section 1: Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600">Tentang Noona Florist</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Menyediakan rangkaian bunga indah untuk setiap momen spesial Anda.
        </p>
      </div>

{/* Section 2: Informasi Toko */}
<section className="mb-24 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
  <div>
    <h2 className="text-3xl font-bold mb-4 text-pink-500">Informasi Toko</h2>
    <p className="text-base md:text-lg leading-relaxed text-gray-700">
      <span className="font-semibold">Noona Florist</span> berdiri sejak tahun <span className="font-semibold">2020</span> di Yogyakarta,
      dan telah melayani lebih dari <span className="font-semibold">10.000 pelanggan</span> di seluruh Indonesia.
      Kami menyediakan berbagai macam <span className="text-pink-500 font-medium">bunga segar</span> dan
      <span className="text-pink-500 font-medium"> rangkaian bunga</span> untuk pernikahan, ulang tahun, anniversary, dan acara spesial lainnya.
      <br /><br />
      <span className="italic text-gray-600">
        "Kami percaya setiap bunga memiliki cerita, dan kami hadir untuk merangkainya dengan cinta."
      </span>
    </p>
  </div>
  <div className="flex justify-center">
    <img
      src="/noona-logo.png"
      alt="Toko Noona Florist"
      className="w-[300px] h-[300px] rounded-lg shadow-lg border-2 border-pink-300 object-cover"
    />
  </div>
</section>

{/* Section 3: Latar Belakang */}
<section className="mb-24 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
  <div className="order-2 md:order-1 flex justify-center">
    <img
      src="/flower-gift-wrap-mockup.jpg"
      alt="Latar Belakang Noona Florist"
      className="w-[300px] h-[400px] rounded-lg shadow-lg border-2 border-pink-300 object-cover"
    />
  </div>
  <div className="order-1 md:order-2">
    <h2 className="text-3xl font-bold mb-4 text-pink-500">Latar Belakang</h2>
    <p className="text-base md:text-lg leading-relaxed text-gray-700">
      Berawal dari kecintaan terhadap bunga dan keinginan untuk menghadirkan keindahan dalam kehidupan sehari-hari,
      <span className="font-semibold"> Noona Amelia</span> mendirikan Noona Florist.
      Kami percaya bahwa bunga bukan hanya hiasan, tetapi juga <span className="text-pink-600 font-medium">cara menyampaikan perasaan</span> yang tulus.
      <br /><br />
      Setiap rangkaian bunga dibuat dengan penuh perhatian terhadap <span className="underline decoration-pink-400">detail</span> dan
      <span className="underline decoration-pink-400"> kualitas tinggi</span>, agar setiap pelanggan merasa istimewa.
    </p>
  </div>
</section>

      {/* Section 4: Tim Pengelola */}
      <section>
        <h2 className="text-2xl font-semibold mb-8 text-pink-500 text-center">Tim Pengelola</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-xl transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-pink-300"
              />
              <h3 className="text-lg font-semibold text-pink-700">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
