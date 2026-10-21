import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { formatINR, discountPercent } from '../lib/format';
import { useCartStore } from '../store/cart';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const disc = discountPercent(product.price, product.mrp);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
      <Link to={`/product/${product.slug}`} className="block aspect-square overflow-hidden bg-slate-100">
        <img src={product.images[0] || 'https://via.placeholder.com/400'} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      </Link>
      <div className="p-4">
        {product.category && (<p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{product.category.name}</p>)}
        <Link to={`/product/${product.slug}`}><h3 className="font-medium text-slate-900 line-clamp-2 hover:text-orange-600 min-h-[2.5rem]">{product.name}</h3></Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-900">{formatINR(product.price)}</span>
          {product.mrp && product.mrp > product.price && (<span className="text-sm text-slate-400 line-through">{formatINR(product.mrp)}</span>)}
          {disc && <span className="text-xs font-medium text-green-600">{disc}% off</span>}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>{product.stock > 0 ? (product.stock <= 5 ? `Only ${product.stock} left` : 'In stock') : 'Out of stock'}</span>
          <button onClick={() => product.stock > 0 && addItem(product)} disabled={product.stock === 0} className="flex items-center gap-1 text-sm bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"><ShoppingCart className="w-4 h-4" /> Add</button>
        </div>
      </div>
    </div>
  );
}
