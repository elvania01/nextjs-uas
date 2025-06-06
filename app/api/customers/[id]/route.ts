import { prisma } from 'app/lib/prisma';
import { NextResponse } from 'next/server';

// Tipe untuk params
interface Params {
  id: string;
}

// Ambil data customer berdasarkan ID
export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: params.id },
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update data customer
export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    const data = await req.json();
    const updated = await prisma.customer.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json({ error: 'Customer not found or invalid data' }, { status: 400 });
  }
}

// Hapus customer
export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    await prisma.customer.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Customer deleted' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }
}