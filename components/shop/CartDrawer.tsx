'use client';
import { useCart } from '@/components/providers/CartProvider';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, totalItems, totalPrice, removeFromCart, updateQty, isOpen, setIsOpen } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-xl">

        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-lg text-gray-900">
            Cart ({totalItems})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400">
            <div className="text-5xl">🛒</div>
            <p className="text-sm">Your cart is empty</p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-green-700 text-sm font-medium hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map(item => (
                <div key={item.productId} className="flex gap-3 items-start">
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                    ) : '🥛'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 mb-2">{item.unit}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.productId, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 text-sm flex items-center justify-center hover:border-green-500"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 text-sm flex items-center justify-center hover:border-green-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-sm text-gray-900">
                      ₹{(item.price * item.quantity / 100).toFixed(0)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-xs text-red-400 hover:text-red-600 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-gray-100">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Total</span>
                <span className="font-bold text-lg text-gray-900">
                  ₹{(totalPrice / 100).toFixed(0)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-green-700 text-white text-center py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
