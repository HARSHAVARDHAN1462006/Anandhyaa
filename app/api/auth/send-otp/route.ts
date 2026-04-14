import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone || phone.length !== 10) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const otp = generateOTP();

    // Store OTP in Redis for 10 minutes
    await redis.set(`otp:${phone}`, otp, { ex: 600 });

    // In production: send via MSG91
    // For development: log to console
    if (process.env.NODE_ENV === 'development') {
      console.log(`\n🔐 OTP for ${phone}: ${otp}\n`);
    } else {
      // MSG91 integration (add later)
      await sendSMS(phone, otp);
    }

    return NextResponse.json({ success: true, message: 'OTP sent' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}

async function sendSMS(phone: string, otp: string) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  if (!authKey || !templateId) return;

  await fetch('https://api.msg91.com/api/v5/otp', {
    method:  'POST',
    headers: {
      authkey:        authKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      template_id: templateId,
      mobile:      `91${phone}`,
      otp,
    }),
  });
}
