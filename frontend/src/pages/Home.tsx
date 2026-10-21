import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, CreditCard, MapPin } from 'lucide-react';
import api from '../lib/api';
import type { Category, Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products?limit=8&sort=newest'),
    ]).then(([catRes, prodRes]) => {
      setCategories(catRes.data);
      setFeatured(prodRes.data.products);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 flex flex-col sm:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Shop Everyday Essentials<br />
              <span className="text-orange-400">Delivered Across India</span>
            </h1>
            <p className="mt-4 text-slate-300 text-lg max-w-lg">
              Electronics, fashion, home & more. Pay with UPI, Cards, Net Banking or Cash on Delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products?category=electronics" className="inline-flex items-center gap-2 border border-slate-500 hover:border-orange-400 text-white px-6 py-3 rounded-lg">
                Electronics
              </Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 max-w-md">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹499' },
              { icon: CreditCard, title: 'Secure Payments', desc: 'UPI • Cards • NetBanking' },
              { icon: MapPin, title: 'COD Available', desc: 'Pay when you receive' },
              { icon: Shield, title: 'Trusted Store', desc: 'Easy returns & support' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <Icon className="w-6 h-6 text-orange-400 mb-2" />
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-slate-300 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (<div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse" />))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((c) => (
              <Link key={c.id} to={`/products?category=${c.slug}`} className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-200">
                {c.image && (<img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />)}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                  <span className="text-white font-semibold text-sm">{c.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-orange-500 font-medium text-sm flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (<div key={i} className="h-72 bg-slate-200 rounded-xl animate-pulse" />))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        )}
      </section>
    </div>
  );
}
