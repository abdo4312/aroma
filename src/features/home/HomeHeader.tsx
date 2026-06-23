import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Search, ShoppingBag, User, X } from "lucide-react";
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useProducts } from '../products/useProducts';
import type { Product } from '@/features/products/product.types';

const navItems = [
  { label: 'Beans', to: '/shop-beans' },
  { label: 'Booking', to: '/book-table' },
  { label: 'Brew Gear', to: '/brew-gear' },
  { label: 'Gift Cards', to: '/gift-cards' },
];

export function HomeHeader() {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());

  const { products = [] } = useProducts();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const searchResults = query
    ? (products as Product[]).filter((p: Product) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(`/coffee/${id}`);
  };

  return (
    <>
      {/* Search Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Product search"
        >
          <div className="absolute inset-0 bg-[#4A3B32]/40 backdrop-blur-md" onClick={() => setIsSearchOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/60 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-3 p-8 border-b border-[#8C6239]/10">
              <Search className="text-[#8C6239]" size={28} aria-hidden="true" />
              <label htmlFor="header-search" className="sr-only">Search products</label>
              <input
                id="header-search"
                type="text"
                placeholder="Search for coffee, gear..."
                className="flex-1 bg-transparent text-2xl text-[#4A3B32] placeholder-[#6B4423]/40 outline-none font-black"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full hover:bg-rose-50 text-rose-500 transition-colors"
                aria-label="Close search"
              >
                <X size={28} aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-6 custom-scrollbar" role="listbox" aria-label="Search results">
              {searchResults.length === 0 && query && (
                <p className="text-center text-[#6B4423]/60 py-8 text-sm">No products match "{query}"</p>
              )}
              {searchResults.map((product: Product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="w-full flex items-center gap-6 p-5 rounded-[2rem] hover:bg-[#8C6239]/5 transition-all text-left group"
                  role="option"
                  aria-selected="false"
                >
                  <img src={product.images[0]} alt={product.name} className="w-20 h-20 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-[#4A3B32] group-hover:text-[#8C6239] transition-colors">{product.name}</h4>
                    <p className="text-sm font-bold text-[#6B4423]/50 uppercase tracking-widest">{product.category}</p>
                  </div>
                  <span className="text-lg font-black text-[#4A3B32]">{formatCurrency(product.price)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Header Container */}
      <header className="sticky top-4 z-[100] mx-4 mb-10 overflow-hidden rounded-[2.8rem] border border-white/60 bg-white/40 px-6 py-5 shadow-2xl backdrop-blur-2xl md:px-10 transition-all duration-500">

        {/* Animated Background Blobs */}
        <div className="liquid-blob absolute -left-9 -top-8 h-32 w-32 bg-[#D4B895]/40 blur-3xl" style={{ '--blob-duration': '19s' } as React.CSSProperties} aria-hidden="true" />
        <div className="liquid-blob absolute right-16 -top-10 h-32 w-32 bg-[#8C6239]/20 blur-3xl" style={{ '--blob-duration': '24s' } as React.CSSProperties} aria-hidden="true" />

        <div className="relative flex items-center justify-between gap-6">

          {/* Logo Area */}
          <Link to="/" className="inline-flex items-center gap-4 rounded-2xl bg-white/50 px-5 py-3 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 shadow-sm border border-white" aria-label="Aroma Corner home">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A3B32] text-[#D4B895] shadow-lg" aria-hidden="true">
              <Coffee className="h-6 w-6" />
            </span>
            <span className="text-xl font-black tracking-tighter uppercase text-[#4A3B32]">Aroma Corner</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-3 rounded-[1.8rem] border border-white/40 bg-white/20 p-2 md:flex shadow-inner backdrop-blur-md" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="relative group px-10 py-5 transition-all duration-300"
              >
                <span className="relative z-10 text-[15px] font-black uppercase tracking-[0.25em] text-[#4A3B32] group-hover:text-[#8C6239] transition-colors">
                  {item.label}
                </span>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 w-0 h-[2.5px] bg-[#8C6239] transition-all duration-300 group-hover:w-1/2 opacity-70" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/40 text-[#4A3B32] backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg active:scale-90"
              aria-label="Open search"
            >
              <Search className="h-6 w-6" aria-hidden="true" />
            </button>

            <Link
              to="/login"
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/40 text-[#4A3B32] backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg active:scale-90"
              aria-label="Login or register"
            >
              <User className="h-6 w-6" aria-hidden="true" />
            </Link>

            <Link
              to="/cart"
              className="relative inline-flex items-center gap-4 rounded-2xl bg-[#4A3B32] px-8 py-4.5 text-[12px] font-black uppercase tracking-[0.2em] text-white transition-all hover:-translate-y-1 hover:bg-[#5F3A26] hover:shadow-2xl active:scale-95"
              aria-label={`Cart with ${totalItems} item${totalItems === 1 ? '' : 's'}`}
            >
              <ShoppingBag className="h-6 w-6" aria-hidden="true" />
              <span className="hidden lg:inline">Cart</span>

              {totalItems > 0 && (
                <span
                  className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#D4B895] text-[12px] font-black text-[#4A3B32] ring-4 ring-[#FAF7F2] shadow-xl animate-bounce"
                  aria-hidden="true"
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}