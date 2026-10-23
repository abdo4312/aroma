import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Coffee } from 'lucide-react';
import { useProducts } from '@/features/products/useProducts';
import { ProductCard } from '@/features/products/ProductCard';
import type { Product } from '@/shared/types/product.types';
import { QueryState } from '@/shared/components/QueryState';

const roastTypes = ['All', 'Light', 'Medium', 'Dark'];

export function CoffeeList() {
  const navigate = useNavigate();
  const [activeRoast, setActiveRoast] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Pass filters to the server via useProducts
  const { products, isLoading, error, setFilter, clearFilters } = useProducts();

  // When roast filter changes, update the server-side filter
  const handleRoastChange = (roast: string) => {
    setActiveRoast(roast);
    if (roast === 'All') {
      setFilter('category', null);
    } else {
      setFilter('category', roast.toLowerCase());
    }
  };

  // When search term changes, update the server-side filter
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setFilter('q', value || null);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setActiveRoast('All');
    setSearchTerm('');
    clearFilters();
  };

  return (
    <div dir="ltr" className="min-h-screen bg-brand-cream relative overflow-hidden font-sans pb-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed left-6 top-24 z-50 p-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl text-coffee-900 hover:bg-coffee-900 hover:text-white transition-all duration-300 group"
      >
        <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-black text-coffee-900">
            Beans <span className="text-coffee-500">Menu</span>
          </h1>
          <p className="text-coffee-700/70 max-w-lg mx-auto italic font-medium">
            Explore the finest specialty coffee carefully selected from around the world.
          </p>
        </header>

        {/* Search & Filter Bar */}
        <div className="sticky top-6 z-30 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-md bg-white/40 p-4 rounded-3xl border border-white/60 shadow-xl">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {roastTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleRoastChange(type)}
                className={`px-6 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeRoast === type
                    ? 'bg-coffee-900 text-white shadow-lg scale-105'
                    : 'bg-white/50 text-coffee-900 hover:bg-white'
                  }`}
              >
                {type === 'All' ? 'All Roasts' : `${type} Roast`}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-coffee-500/50 group-focus-within:text-coffee-500 transition-colors" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search for your favorite beans..."
              className="w-full pr-12 pl-6 py-3 rounded-2xl bg-white/50 border border-transparent focus:border-coffee-500/30 outline-none transition-all placeholder:text-neutral-400 font-medium"
            />
          </div>
        </div>

        {/* Product Grid with Unified States */}
        <QueryState
          isLoading={isLoading}
          error={error}
          isEmpty={!isLoading && !error && products.length === 0}
          loadingMessage="Loading coffee beans..."
          errorMessage="Failed to load products. Please try again."
          onRetry={handleClearFilters}
          emptyConfig={{
            icon: <Coffee className="w-8 h-8" />,
            title: 'No Beans Found',
            description: 'No products match your current filters. Try adjusting your search or roast type.',
            action: (
              <button
                onClick={handleClearFilters}
                className="px-8 py-3 rounded-xl bg-coffee-800 text-white font-bold hover:bg-coffee-600 transition-all shadow-lg"
              >
                Clear Filters
              </button>
            ),
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </QueryState>
      </div>
    </div>
  );
}