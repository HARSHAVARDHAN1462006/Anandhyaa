import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items, deliverySlot, deliveryDate, deliveryAddress, paymentMethod, total } = await req.json();

    const user = await prisma.user.findUnique({
      where: { phone: session.user.phone },
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const order = await prisma.order.create({
      data: {
        userId:          user.id,
        deliverySlot,
        deliveryDate:    new Date(deliveryDate),
        deliveryAddress,
        paymentMethod,
        paymentStatus:   paymentMethod === 'cod' ? 'pending' : 'pending',
        status:          'confirmed',
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity:  item.quantity,
            price:     item.price,
          })),
        },
      },
    });

    return NextResponse.json({ orderId: order.id, success: true });
  } catch (error) {
    console.error('Order error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
