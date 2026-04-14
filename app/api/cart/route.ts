import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { getServerSession } from 'next-auth';

function getCartKey(req: NextRequest): string {
  const sessionId = req.cookies.get('session_id')?.value ?? 'guest';
  return `cart:${sessionId}`;
}

export async function GET(req: NextRequest) {
  try {
    const key  = getCartKey(req);
    const data = await redis.get(key);
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { productId, name, price, unit, image, quantity } = await req.json();
    const key  = getCartKey(req);
    const data = await redis.get(key) as any[] | null;
    const cart: any[] = data ?? [];

    const existing = cart.findIndex((i: any) => i.productId === productId);
    if (existing >= 0) {
      cart[existing].quantity += quantity;
    } else {
      cart.push({ productId, name, price, unit, image, quantity });
    }

    await redis.set(key, cart, { ex: 60 * 60 * 24 * 7 });
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { productId } = await req.json();
    const key  = getCartKey(req);
    const data = await redis.get(key) as any[] | null;
    const cart = (data ?? []).filter((i: any) => i.productId !== productId);
    await redis.set(key, cart, { ex: 60 * 60 * 24 * 7 });
    return NextResponse.json(cart);
  } catch {
    return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 });
  }
}
