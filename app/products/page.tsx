'use client';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import Link from 'next/link';

const categories = [
  { name: 'All',    slug: '' },
  { name: 'Milk',   slug: 'milk' },
  { name: 'Ghee',   slug: 'ghee' },
  { name: 'Paneer', slug: 'paneer' },
  { name: 'Curd',   slug: 'curd' },
  { name: 'Lassi',  slug: 'lassi' },
  { name: 'Butter', slug: 'butter' },
];

export default function ProductsPage() {
  const [products,  setProducts]  = useState([]);
  const [category,  setCategory]  = useState('');
  const [search,    setSearch]    = useState('');
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search)   params.set('search',   search);

    fetch(`/api/products?${params}`)
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category, search]);

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-green-800">Anandhyaa</Link>
        <Link href="/cart" className="text-sm text-green-700 font-medium">View Cart</Link>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
        <p className="text-gray-500 mb-8">Pure A2 dairy from our farm to your door</p>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-500 transition-colors mb-6"
        />

        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat.slug
                  ? 'bg-green-700 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-green-500'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🔍</div>
            <p>No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
