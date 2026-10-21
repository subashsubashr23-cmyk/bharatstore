import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Package, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../store/cart';
import { useAuthStore } from '../store/auth';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const totalItems = useCartStore((s) => s.totalItems());
  const { user, logout, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Package className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold text-slate-900">Bharat<span className="text-orange-500">Store</span></span>
            </Link>
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
            </form>
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/products" className="text-sm font-medium text-slate-700 hover:text-orange-500">Shop</Link>
              <Link to="/cart" className="relative p-2 text-slate-700 hover:text-orange-500">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (<span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{totalItems}</span>)}
              </Link>
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-orange-500">
                    <User className="w-5 h-5" /><span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-1">
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-slate-50">My Orders</Link>
                    {isAdmin() && (<Link to="/admin" className="block px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Admin</Link>)}
                    <button onClick={() => { logout(); navigate('/'); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 text-red-600"><LogOut className="w-4 h-4" /> Logout</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="text-sm font-medium bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">Login</Link>
              )}
            </nav>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
          {mobileOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <form onSubmit={handleSearch} className="flex">
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="flex-1 px-3 py-2 border rounded-l-lg" />
                <button type="submit" className="bg-orange-500 text-white px-3 rounded-r-lg"><Search className="w-4 h-4" /></button>
              </form>
              <Link to="/products" onClick={() => setMobileOpen(false)} className="block py-2">Shop</Link>
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="block py-2">Cart ({totalItems})</Link>
              {user ? (<>
                <Link to="/orders" onClick={() => setMobileOpen(false)} className="block py-2">My Orders</Link>
                {isAdmin() && <Link to="/admin" onClick={() => setMobileOpen(false)} className="block py-2">Admin</Link>}
                <button onClick={() => { logout(); navigate('/'); setMobileOpen(false); }} className="block py-2 text-red-600">Logout</button>
              </>) : (<Link to="/login" onClick={() => setMobileOpen(false)} className="block py-2 text-orange-500 font-medium">Login</Link>)}
            </div>
          )}
        </div>
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="bg-slate-900 text-slate-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3"><Package className="w-6 h-6 text-orange-500" /> BharatStore</div>
            <p className="text-sm">Your trusted online store for everyday products across India. Cash on Delivery & UPI available.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-orange-400">All Products</Link></li>
              <li><Link to="/products?category=electronics" className="hover:text-orange-400">Electronics</Link></li>
              <li><Link to="/products?category=fashion" className="hover:text-orange-400">Fashion</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <p className="text-sm">Email: support@bharatstore.in</p>
            <p className="text-sm mt-1">COD available • Free shipping over ₹499</p>
          </div>
        </div>
        <div className="border-t border-slate-800 text-center text-xs py-4">© {new Date().getFullYear()} BharatStore. Prices in Indian Rupees (₹).</div>
      </footer>
    </div>
  );
}
