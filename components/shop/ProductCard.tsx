'use client';
import { useCart } from '@/components/providers/CartProvider';

interface Product {
  id:          string;
  name:        string;
  slug:        string;
  price:       number;
  mrp:         number;
  unit:        string;
  images:      string[];
  stock:       number;
  category:    { name: string; slug: string };
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const emoji: Record<string, string> = {
    milk: '🥛', ghee: '🫙', paneer: '🧀',
    curd: '🥣', lassi: '🥤', butter: '🧈',
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
      <div className="bg-green-50 h-40 flex items-center justify-center text-5xl relative">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{emoji[product.category.slug] ?? '🥛'}</span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-green-700 text-white text-xs px-2 py-0.5 rounded-full font-medium">
            {discount}% off
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-green-600 font-medium mb-1">{product.category.name}</p>
        <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">{product.name}</h3>
        <p className="text-xs text-gray-400 mb-3">{product.unit}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-gray-900">₹{(product.price / 100).toFixed(0)}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through ml-1">
                ₹{(product.mrp / 100).toFixed(0)}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart({
              productId: product.id,
              name:      product.name,
              price:     product.price,
              unit:      product.unit,
              image:     product.images?.[0] ?? '',
            })}
            disabled={product.stock === 0}
            className="bg-green-700 text-white text-xs px-3 py-2 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-medium"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
