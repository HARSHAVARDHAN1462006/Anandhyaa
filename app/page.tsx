import Link from 'next/link';

const categories = [
  { name: 'A2 Milk',  slug: 'milk',   emoji: '🥛', desc: 'Fresh daily from Gir cows' },
  { name: 'Pure Ghee', slug: 'ghee',  emoji: '🫙', desc: 'Bilona hand-churned ghee' },
  { name: 'Paneer',   slug: 'paneer', emoji: '🧀', desc: 'Soft fresh-set paneer' },
  { name: 'Curd',     slug: 'curd',   emoji: '🥣', desc: 'Thick probiotic curd' },
  { name: 'Lassi',    slug: 'lassi',  emoji: '🥤', desc: 'Natural flavoured lassi' },
  { name: 'Butter',   slug: 'butter', emoji: '🧈', desc: 'Unsalted white butter' },
];

const features = [
  { title: '100% A2 Protein',    desc: 'Only genuine Gir cow A2 beta-casein milk' },
  { title: 'Farm to Door',       desc: 'Packed and shipped within hours of milking' },
  { title: 'No Preservatives',   desc: 'Pure natural dairy — nothing added, nothing removed' },
  { title: 'Morning & Evening',  desc: 'Choose your preferred delivery slot' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen font-sans">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <span className="text-2xl font-bold text-green-800">Anandhyaa</span>
        <div className="flex gap-6 text-sm text-gray-600">
          <Link href="/products" className="hover:text-green-700 transition-colors">Products</Link>
          <Link href="/checkout" className="hover:text-green-700 transition-colors">Cart</Link>
          <Link href="/account" className="bg-green-700 text-white px-4 py-1.5 rounded-full hover:bg-green-800 transition-colors">Login</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 px-6 py-24 text-center">
        <p className="text-green-600 text-sm font-medium tracking-widest uppercase mb-4">
          Pure · Natural · A2
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6 leading-tight">
          The Joy of<br />Pure A2 Dairy
        </h1>
        <p className="text-green-700 text-lg max-w-xl mx-auto mb-10">
          Farm-fresh A2 milk, hand-churned ghee, paneer and more — delivered straight
          from our Gir cow dairy farm to your family.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/products"
            className="bg-green-700 text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-green-800 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            href="/products?category=milk"
            className="border border-green-700 text-green-700 px-8 py-3 rounded-full text-base font-semibold hover:bg-green-50 transition-colors"
          >
            Subscribe to Milk
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Our Products</h2>
        <p className="text-gray-500 text-center mb-12">Everything pure, nothing artificial</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="bg-green-50 hover:bg-green-100 rounded-2xl p-5 text-center transition-colors group"
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <div className="font-semibold text-green-900 text-sm mb-1">{cat.name}</div>
              <div className="text-green-600 text-xs">{cat.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Anandhyaa */}
      <section className="bg-green-900 text-white px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Why Choose Anandhyaa?</h2>
          <p className="text-green-300 text-center mb-14">We don't just sell dairy. We deliver trust.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-green-800 rounded-2xl p-6">
                <div className="w-10 h-10 bg-green-600 rounded-xl mb-4 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm" />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-green-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-amber-50 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-amber-900 mb-4">
          Start your daily A2 milk subscription
        </h2>
        <p className="text-amber-700 mb-8 max-w-md mx-auto">
          Fresh A2 milk delivered every morning at your doorstep. Cancel or pause anytime.
        </p>
        <Link
          href="/products?category=milk"
          className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors"
        >
          Start Subscription
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Anandhyaa</h3>
            <p className="text-sm leading-relaxed">
              A2 Dairy Products Pvt. Limited.<br />
              Pure dairy from our farm to your family.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Products</h4>
            <ul className="space-y-2 text-sm">
              {categories.map(c => (
                <li key={c.slug}>
                  <Link href={`/products?category=${c.slug}`} className="hover:text-white transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>WhatsApp: +91 XXXXXXXXXX</li>
              <li>Email: hello@anandhyaa.com</li>
              <li>Instagram: @anandhyaa</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-800 text-sm text-center">
          © {new Date().getFullYear()} Anandhyaa A2 Dairy Products Pvt. Limited. All rights reserved.
        </div>
      </footer>

    </main>
  );
}