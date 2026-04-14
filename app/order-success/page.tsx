'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function OrderSuccessContent() {
  const params  = useSearchParams();
  const orderId = params.get('id');

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-2">Thank you for choosing Anandhyaa</p>
        {orderId && (
          <p className="text-sm text-green-700 font-medium mb-6">
            Order ID: #{orderId.slice(-8).toUpperCase()}
          </p>
        )}
        <p className="text-sm text-gray-400 mb-8">
          You will receive a WhatsApp confirmation shortly
        </p>
        <div className="space-y-3">
          <Link
            href="/products"
            className="block w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account"
            className="block w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense>
      <OrderSuccessContent />
    </Suspense>
  );
}
