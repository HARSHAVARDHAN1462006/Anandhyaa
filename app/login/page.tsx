'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [phone,       setPhone]       = useState('');
  const [otp,         setOtp]         = useState('');
  const [step,        setStep]        = useState<'phone' | 'otp'>('phone');
  const [loading,     setLoading]     = useState(false);

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast.error('Enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setStep('otp');
        toast.success('OTP sent! Check your phone');
        // In dev mode, check your terminal for the OTP
        if (process.env.NODE_ENV === 'development') {
          toast('Dev mode: check your terminal for OTP', { icon: '🔐' });
        }
      } else {
        toast.error(data.error || 'Failed to send OTP');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        phone,
        otp,
        redirect: false,
      });
      if (result?.ok) {
        toast.success('Welcome to Anandhyaa!');
        router.push('/');
        router.refresh();
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-800">Anandhyaa</h1>
          <p className="text-gray-500 text-sm mt-1">Pure A2 Dairy Products</p>
        </div>

        {step === 'phone' ? (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Login / Sign up</h2>
            <p className="text-gray-500 text-sm mb-6">Enter your mobile number to continue</p>

            <div className="flex border border-gray-200 rounded-xl overflow-hidden mb-4 focus-within:border-green-500 transition-colors">
              <span className="bg-gray-50 px-3 flex items-center text-gray-500 text-sm border-r border-gray-200">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="9876543210"
                className="flex-1 px-3 py-3 text-sm outline-none"
                onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={loading || phone.length !== 10}
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setStep('phone')}
                className="text-green-700 text-sm hover:underline"
              >
                ← Back
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Enter OTP</h2>
                <p className="text-gray-500 text-sm">Sent to +91 {phone}</p>
              </div>
            </div>

            <input
              type="tel"
              maxLength={6}
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="6-digit OTP"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 transition-colors text-center tracking-widest text-lg font-semibold mb-4"
              onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()}
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              onClick={handleSendOtp}
              className="w-full text-green-700 text-sm mt-3 hover:underline"
            >
              Resend OTP
            </button>
          </>
        )}

        <p className="text-xs text-gray-400 text-center mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </main>
  );
}
