import { prisma } from 'app/lib/prisma';
import { NextResponse } from 'next/server';

// Ambil semua data customer
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Tambah customer baru
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validasi sederhana
    if (!data.name || !data.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const newCustomer = await prisma.customer.create({
      data,
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}