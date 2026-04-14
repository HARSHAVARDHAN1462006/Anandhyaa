import { NextRequest, NextResponse } from 'next/server';

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

    // Store OTP in memory for testing (bypasses Redis)
    (globalThis as any).__otpStore = (globalThis as any).__otpStore || {};
    (globalThis as any).__otpStore[phone] = otp;

    // Always log OTP to terminal in development
    console.log(`\n=============================`);
    console.log(`🔐 OTP for ${phone}: ${otp}`);
    console.log(`=============================\n`);

    return NextResponse.json({ success: true, message: 'OTP sent' });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
