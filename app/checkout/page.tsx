'use client';
import { useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [slot,    setSlot]    = useState<'morning_6_9' | 'evening_5_8'>('morning_6_9');
  const [payment, setPayment] = useState<'cod' | 'razorpay'>('cod');
  const [address, setAddress] = useState({
    name: '', phone: '', line1: '', city: '', pincode: '',
  });
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.pincode) {
      toast.error('Please fill in all address fields');
      return;
    }
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    if (!session) {
      toast.error('Please login first');
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const res = await fetch('/api/orders', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          deliverySlot:    slot,
          deliveryDate:    tomorrow.toISOString(),
          deliveryAddress: address,
          paymentMethod:   payment,
          total:           totalPrice,
        }),
      });

      const data = await res.json();

      if (data.orderId) {
        clearCart();
        toast.success('Order placed successfully!');
        router.push(`/order-success?id=${data.orderId}`);
      } else {
        toast.error('Failed to place order');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-green-800">Anandhyaa</Link>
        <span className="text-gray-500 text-sm">Checkout</span>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Delivery Address</h2>
            <div className="space-y-3">
              {(['name','phone','line1','city','pincode'] as const).map(field => (
                <input
                  key={field}
                  type="text"
                  placeholder={field === 'line1' ? 'Address' : field.charAt(0).toUpperCase() + field.slice(1)}
                  value={address[field]}
                  onChange={e => setAddress(p => ({ ...p, [field]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Delivery Slot</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'morning_6_9',  label: 'Morning',  time: '6 AM – 9 AM'  },
                { value: 'evening_5_8',  label: 'Evening',  time: '5 PM – 8 PM'  },
              ].map(s => (
                <button
                  key={s.value}
                  onClick={() => setSlot(s.value as any)}
                  className={`p-4 rounded-xl border-2 text-left transition-colors ${
                    slot === s.value
                      ? 'border-green-700 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="font-semibold text-sm text-gray-900">{s.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.time}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Payment Method</h2>
            <div className="space-y-3">
              {[
                { value: 'cod',      label: 'Cash on Delivery',   desc: 'Pay when your order arrives' },
                { value: 'razorpay', label: 'UPI / Card / NetBanking', desc: 'Pay securely online' },
              ].map(p => (
                <button
                  key={p.value}
                  onClick={() => setPayment(p.value as any)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                    payment === p.value
                      ? 'border-green-700 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="font-semibold text-sm text-gray-900">{p.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} × {item.quantity}</span>
                  <span className="font-medium">₹{(item.price * item.quantity / 100).toFixed(0)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-green-700">
                  ₹{(totalPrice / 100).toFixed(0)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
            </div>
            <button
              onClick={handleOrder}
              disabled={loading || items.length === 0}
              className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-base hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing Order...' : `Place Order — ₹${(totalPrice / 100).toFixed(0)}`}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
