import { prisma } from 'app/lib/prisma';
import { NextResponse } from 'next/server';

interface Params {
  id: string;
}

// GET customer by ID
export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(params.id) }, // konversi string → number
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

// UPDATE customer
export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    const data = await req.json();
    const updated = await prisma.customer.update({
      where: { id: Number(params.id) }, // konversi string → number
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json({ error: 'Customer not found or invalid data' }, { status: 400 });
  }
}

// DELETE customer
export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    await prisma.customer.delete({
      where: { id: Number(params.id) }, // konversi string → number
    });
    return NextResponse.json({ message: 'Customer deleted' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }
}
