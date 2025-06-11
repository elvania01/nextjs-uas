import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, username, password } = body;

    console.log("Data diterima dari frontend:", body);

    // Validasi sederhana
    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Cek apakah email atau username sudah dipakai
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingCustomer) {
      return NextResponse.json(
        { message: "Email atau Username sudah terdaftar" },
        { status: 400 }
      );
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan customer baru ke database
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    });

    // Return user data (excluding password)
    const { password: _, ...customerWithoutPassword } = newCustomer;

    return NextResponse.json(
      {
        message: "Registrasi berhasil!",
        user: customerWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saat registrasi:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan di server" },
      { status: 500 }
    );
  }
}
