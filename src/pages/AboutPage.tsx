import { Coffee, Target, Award, Users, Heart } from 'lucide-react';

export function AboutPage() {
  return (
    <div dir="ltr" className="relative min-h-screen overflow-hidden bg-[#FAF7F2] font-sans">
      {/* 1. Liquid background effects — Liquid Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-[10%] top-[5%] h-[500px] w-[500px] animate-pulse rounded-full bg-[#8C6239]/10 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[10%] h-[600px] w-[600px] animate-bounce rounded-full bg-[#4A3B32]/5 blur-[150px]" />
        {/* Sparkles Effect */}
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#8C6239_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        {/* Header Section */}
        <header className="mb-20 text-center">
          <div className="inline-block rounded-full bg-white/40 px-6 py-2 backdrop-blur-md border border-white/60 mb-6">
            <span className="text-sm font-bold tracking-widest text-[#8C6239] uppercase">Our Story - From the Beginning</span>
          </div>
          <h1 className="text-6xl font-black text-[#4A3B32] md:text-7xl">
            We are more than just a <br />
            <span className="text-[#8C6239]">Coffee Store</span>
          </h1>
        </header>

        {/* Main Glass Card - Our Story */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="group relative overflow-hidden rounded-[3rem] border border-white/60 bg-white/30 p-10 backdrop-blur-2xl shadow-2xl transition-all hover:bg-white/40">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-bold text-[#4A3B32]">Our Premium Mission</h2>
              <p className="leading-relaxed text-[#6B4423]/80 text-lg">
                At <span className="font-bold text-[#8C6239]">Aroma Corner</span>, we believe every cup of coffee is a journey starting from high-altitude farms to end in a moment of clarity in your day. We don't just sell beans; we select "crops" that carry the land's identity and the flavor of passion.
              </p>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2 rounded-2xl bg-[#4A3B32] p-4 text-white w-28">
                  <Award size={24} />
                  <span className="text-xs">Global Quality</span>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/60 p-4 text-[#4A3B32] w-28 border border-white">
                  <Heart size={24} className="text-[#8C6239]" />
                  <span className="text-xs">Pure Passion</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[400px] w-full overflow-hidden rounded-[3rem] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800" 
                alt="Coffee Brewing" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B32]/60 to-transparent" />
            </div>
            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white/80 p-6 backdrop-blur-xl shadow-xl border border-white animate-float">
               <Coffee size={40} className="text-[#8C6239]" />
            </div>
          </div>
        </div>

        {/* Values Section - Grid */}
        <div className="mt-32 grid gap-8 md:grid-cols-3">
          <ValueCard 
            icon={<Target size={32} />} 
            title="Our Vision" 
            description="To become the primary reference for specialty coffee enthusiasts in the region, while maintaining farm sustainability and roast quality."
          />
          <ValueCard 
            icon={<Users size={32} />} 
            title="Our Community" 
            description="We build a community that appreciates aromatic notes and understands the art of extraction, sharing all that's new in the world of coffee with you."
          />
          <ValueCard 
            icon={<Award size={32} />} 
            title="Our Commitment" 
            description="We are committed to providing fresh crops, roasted with love, and packaged with techniques that preserve the aromatic scent until it reaches your doorstep."
          />
        </div>

        {/* Call to Action */}
        <div className="mt-32 rounded-[3.5rem] bg-[#4A3B32] p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8C6239]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-4xl font-black mb-6">Are you ready for the authentic taste experience?</h2>
          <button className="rounded-2xl bg-white px-10 py-4 text-lg font-bold text-[#4A3B32] transition-all hover:bg-[#FAF7F2] hover:scale-105 active:scale-95">
            Browse Beans Now
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Sub-component for values
function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="rounded-[2.5rem] border border-white/50 bg-white/20 p-8 backdrop-blur-xl transition-all hover:-translate-y-2 hover:bg-white/30">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8C6239] text-white shadow-lg shadow-[#8C6239]/20">
        {icon}
      </div>
      <h3 className="mb-4 text-2xl font-bold text-[#4A3B32]">{title}</h3>
      <p className="leading-relaxed text-[#6B4423]/70">{description}</p>
    </div>
  );
}