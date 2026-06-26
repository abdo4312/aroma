import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Coffee, Search, ShoppingBag, User, X, Menu } from "lucide-react";
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
  const location = useLocation();
  const totalItems = useCartStore((state) => state.getTotalItems());

  const { products = [] } = useProducts();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchResults = query
    ? (products as Product[]).filter((p: Product) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const isAnyOverlayOpen = isSearchOpen || isMobileMenuOpen;
    document.body.style.overflow = isAnyOverlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isSearchOpen, isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const timer = setTimeout(() => {
        const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>(
          'a, button, input, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      mobileMenuTriggerRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const panel = mobileMenuRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleTabKey);
    return () => window.removeEventListener('keydown', handleTabKey);
  }, [isMobileMenuOpen]);

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(`/coffee/${id}`);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const isActive = (to: string) => location.pathname === to;

  return (
    <>
      {/* ═══ SEARCH OVERLAY ═══ */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Product search"
        >
          <div className="absolute inset-0 bg-[#2e1a12]/50 backdrop-blur-md" onClick={() => setIsSearchOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/60 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-3 p-5 sm:p-8 border-b border-[#8C6239]/10">
              <Search className="text-[#8C6239] shrink-0" size={24} aria-hidden="true" />
              <label htmlFor="header-search" className="sr-only">Search products</label>
              <input
                id="header-search"
                ref={searchInputRef}
                type="text"
                placeholder="Search for coffee, gear..."
                className="flex-1 bg-transparent text-lg sm:text-2xl text-[#4A3B32] placeholder-[#6B4423]/40 outline-none font-black min-w-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="shrink-0 p-2 rounded-full hover:bg-rose-50 text-rose-500 transition-colors"
                aria-label="Close search"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 custom-scrollbar" role="listbox" aria-label="Search results">
              {searchResults.length === 0 && query && (
                <p className="text-center text-[#6B4423]/60 py-8 text-sm">No products match "{query}"</p>
              )}
              {searchResults.map((product: Product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="w-full flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl sm:rounded-[2rem] hover:bg-[#8C6239]/5 transition-all text-left group"
                  role="option"
                  aria-selected="false"
                >
                  <img src={product.images[0]} alt={product.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg font-black text-[#4A3B32] group-hover:text-[#8C6239] transition-colors truncate">{product.name}</h4>
                    <p className="text-xs sm:text-sm font-bold text-[#6B4423]/50 uppercase tracking-widest">{product.category}</p>
                  </div>
                  <span className="text-base sm:text-lg font-black text-[#4A3B32] shrink-0">{formatCurrency(product.price)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ MOBILE MENU DRAWER (slide-in from right) ═══ */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[150] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div
            className="absolute inset-0 bg-[#2e1a12]/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div
            ref={mobileMenuRef}
            className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-gradient-to-b from-[#FAF7F2] to-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#8C6239]/15 bg-white/60 backdrop-blur-sm">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="inline-flex items-center gap-3"
                aria-label="Aroma Corner home"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#4A3B32] text-[#D4B895]" aria-hidden="true">
                  <Coffee className="h-5 w-5" />
                </span>
                <span className="text-lg font-black tracking-tighter uppercase text-[#4A3B32]">Aroma Corner</span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-[#8C6239]/10 text-[#4A3B32] transition-colors"
                aria-label="Close menu"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile main navigation">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a46]">Menu</p>
              <ul className="space-y-1.5">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={closeMobileMenu}
                      className={`flex items-center justify-between rounded-2xl px-4 py-4 text-base font-bold transition-all active:scale-[0.98] ${isActive(item.to)
                          ? 'bg-[#4A3B32] text-white shadow-lg'
                          : 'text-[#3f2518] hover:bg-[#8C6239]/8 active:bg-[#8C6239]/15'
                        }`}
                    >
                      {item.label}
                      <span aria-hidden="true" className={isActive(item.to) ? 'text-white/70' : 'text-[#8C6239]'}>→</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="my-5 h-px bg-[#8C6239]/15" aria-hidden="true" />

              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a46]">Account</p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-semibold transition-all active:scale-[0.98] ${isActive('/login') ? 'bg-[#4A3B32] text-white' : 'text-[#3f2518] hover:bg-[#8C6239]/8'
                      }`}
                  >
                    <User className="h-5 w-5" aria-hidden="true" />
                    Login / Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-all active:scale-[0.98] ${isActive('/cart') ? 'bg-[#4A3B32] text-white' : 'text-[#3f2518] hover:bg-[#8C6239]/8'
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                      Cart
                    </span>
                    {totalItems > 0 && (
                      <span
                        className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#8C6239] px-2 text-xs font-bold text-white"
                        aria-label={`${totalItems} item${totalItems === 1 ? '' : 's'} in cart`}
                      >
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="p-5 border-t border-[#8C6239]/15 bg-white/40">
              <p className="text-xs text-[#7a5a46] text-center leading-relaxed">
                Freshly roasted. Delivered to your door.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══ MAIN HEADER — glassmorphism floating card on ALL screens ═══ */}
      <header className="sticky top-2 z-[100] mx-3 mb-6 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-2xl shadow-2xl px-4 py-3 sm:px-6 sm:py-4 md:mx-4 md:mb-10 md:rounded-[2.8rem] md:px-10 md:py-5 transition-all duration-500">
        {/* Animated Background Blobs */}
        <div className="liquid-blob absolute -left-9 -top-8 h-32 w-32 bg-[#D4B895]/40 blur-3xl" style={{ '--blob-duration': '19s' } as React.CSSProperties} aria-hidden="true" />
        <div className="liquid-blob absolute right-16 -top-10 h-32 w-32 bg-[#8C6239]/20 blur-3xl" style={{ '--blob-duration': '24s' } as React.CSSProperties} aria-hidden="true" />

        <div className="relative flex items-center justify-between gap-3 sm:gap-6">

          {/* ═══ Logo ═══ */}
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 sm:gap-4 rounded-2xl bg-white/50 px-3 py-2 sm:px-5 sm:py-3 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 shadow-sm border border-white shrink-0"
            aria-label="Aroma Corner home"
          >
            <span className="inline-flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#4A3B32] text-[#D4B895] shadow-lg shrink-0" aria-hidden="true">
              <Coffee className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <span className="text-base sm:text-xl font-black tracking-tighter uppercase text-[#4A3B32]">
              Aroma Corner
            </span>
          </Link>

          {/* ═══ Desktop Navigation ═══ */}
          <nav
            className="hidden items-center gap-2 rounded-[1.8rem] border border-white/40 bg-white/20 p-2 md:flex shadow-inner backdrop-blur-md"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`relative group px-6 lg:px-10 py-3 lg:py-5 transition-all duration-300 ${isActive(item.to) ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
              >
                <span className={`relative z-10 text-xs lg:text-[15px] font-black uppercase tracking-[0.2em] lg:tracking-[0.25em] transition-colors ${isActive(item.to) ? 'text-[#8C6239]' : 'text-[#4A3B32] group-hover:text-[#8C6239]'
                  }`}>
                  {item.label}
                </span>
                <span className={`absolute bottom-2 lg:bottom-3 left-1/2 -translate-x-1/2 h-[2.5px] bg-[#8C6239] transition-all duration-300 ${isActive(item.to) ? 'w-1/2 opacity-100' : 'w-0 group-hover:w-1/2 opacity-70'
                  }`} aria-hidden="true" />
              </Link>
            ))}
          </nav>

          {/* ═══ Action Buttons ═══ */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/40 backdrop-blur-sm text-[#4A3B32] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg active:scale-90"
              aria-label="Open search"
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </button>

            <Link
              to="/login"
              className={`inline-flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl border transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg active:scale-90 ${isActive('/login')
                  ? 'bg-[#4A3B32] text-white border-[#4A3B32]'
                  : 'border-white/60 bg-white/40 backdrop-blur-sm text-[#4A3B32]'
                }`}
              aria-label="Login or register"
            >
              <User className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </Link>

            <Link
              to="/cart"
              className={`relative inline-flex items-center gap-2 sm:gap-3 md:gap-4 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-95 px-3 sm:px-4 md:px-8 h-10 sm:h-12 md:h-auto md:py-4.5 text-[10px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] ${isActive('/cart')
                  ? 'bg-[#5F3A26] text-white'
                  : 'bg-[#4A3B32] text-white hover:bg-[#5F3A26]'
                }`}
              aria-label={`Cart with ${totalItems} item${totalItems === 1 ? '' : 's'}`}
            >
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>

              {totalItems > 0 && (
                <span
                  className="absolute -right-1.5 -top-1.5 sm:-right-2 sm:-top-2 md:-right-3 md:-top-3 flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-[#D4B895] text-[11px] sm:text-[12px] font-black text-[#4A3B32] ring-2 sm:ring-3 md:ring-4 ring-[#FAF7F2] shadow-xl animate-bounce"
                  aria-hidden="true"
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* ═══ Mobile hamburger ═══ */}
            <button
              ref={mobileMenuTriggerRef}
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/40 backdrop-blur-sm text-[#4A3B32] transition-all hover:bg-white hover:shadow-lg active:scale-90 md:hidden"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-drawer"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}