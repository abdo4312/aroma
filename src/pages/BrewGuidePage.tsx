import { Coffee, Droplets, Thermometer, Timer, Scale, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const guides = [
  {
    id: 'v60',
    name: 'V60 Pour Over',
    ratio: '1:15',
    temp: '92°C',
    time: '3:00 min',
    grind: 'Medium Fine',
    image: 'https://images.unsplash.com/photo-1544787210-22da3ef59ba3?w=800',
    steps: [
      "Place the filter and wet it with hot water to remove any paper taste.",
      "Add 20 grams of ground coffee and start blooming (40 ml water).",
      "Pour water in steady circular motions until you reach 300 ml.",
      "Enjoy a clean cup of coffee with clear flavors."
    ]
  },
  {
    id: 'chemex',
    name: 'Chemex',
    ratio: '1:16',
    temp: '94°C',
    time: '4:30 min',
    grind: 'Medium Coarse',
    image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=800',
    steps: [
      "Use a thick Chemex filter for high clarity.",
      "Start by pouring water slowly in the center then move outwards.",
      "Maintain a steady flow of water.",
      "The result will be a balanced acidity and light body."
    ]
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    ratio: '1:13',
    temp: '85°C',
    time: '2:00 min',
    grind: 'Fine',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800',
    steps: [
      "Place the coffee in the tool and add hot water.",
      "Stir the mixture for 10 seconds for consistency.",
      "Wait for one minute then start pressing slowly.",
      "Ideal for obtaining a concentrated coffee similar to espresso."
    ]
  }
];

export function BrewGuidePage() {
  const navigate = useNavigate();

  return (
    <div dir="ltr" className="relative min-h-screen overflow-hidden bg-[#FAF7F2] font-sans">
      {/* Liquid Coffee Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-20 top-0 h-[600px] w-[600px] animate-pulse rounded-full bg-[#8C6239]/10 blur-[120px]" />
        <div className="absolute -left-20 bottom-0 h-[600px] w-[600px] animate-bounce rounded-full bg-[#4A3B32]/5 blur-[150px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        {/* Header */}
        <header className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/40 px-6 py-2 border border-white/60 backdrop-blur-md">
            <Coffee className="text-[#8C6239]" size={18} />
            <span className="text-xs font-bold tracking-[0.2em] text-[#8C6239] uppercase">Home Barista Guide</span>
          </div>
          <h1 className="text-5xl font-black text-[#4A3B32] md:text-7xl">
            The Art of <span className="text-[#8C6239]">Extraction</span>
          </h1>
          <p className="mt-6 text-[#6B4423]/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Since premium crops deserve precise preparation, we offer you the golden guide to extracting the hidden flavors within our beans.
          </p>
        </header>

        {/* Guides Grid */}
        <div className="grid gap-12">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="group relative overflow-hidden rounded-[3.5rem] border border-white/60 bg-white/30 backdrop-blur-2xl shadow-2xl transition-all hover:bg-white/40"
            >
              <div className="grid lg:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-[300px] lg:h-full overflow-hidden">
                  <img src={guide.image} alt={guide.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12">
                  <h2 className="text-4xl font-black text-[#4A3B32] mb-8">{guide.name}</h2>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <SpecItem icon={<Scale size={18} />} label="Ratio" value={guide.ratio} />
                    <SpecItem icon={<Thermometer size={18} />} label="Temp" value={guide.temp} />
                    <SpecItem icon={<Timer size={18} />} label="Time" value={guide.time} />
                    <SpecItem icon={<Droplets size={18} />} label="Grind" value={guide.grind} />
                  </div>

                  {/* Steps */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-black uppercase text-[#8C6239] tracking-widest mb-4">Brewing Method:</h4>
                    {guide.steps.map((step, index) => (
                      <div key={index} className="flex gap-4 items-start text-[#6B4423]/90">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4A3B32] text-[10px] font-bold text-white">
                          {index + 1}
                        </span>
                        <p className="text-md leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <button
            onClick={() => navigate('/shop-beans')}
            className="group flex items-center gap-3 mx-auto rounded-2xl bg-[#4A3B32] px-10 py-5 text-xl font-black text-white shadow-2xl transition-all hover:bg-[#2E1F18] hover:-translate-y-1"
          >
            Browse crops suitable for these tools
            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SpecItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="rounded-2xl bg-white/50 p-4 border border-white/60 text-center">
      <div className="flex justify-center text-[#8C6239] mb-2">{icon}</div>
      <p className="text-[10px] uppercase font-bold text-[#6B4423]/50 mb-1">{label}</p>
      <p className="text-sm font-black text-[#4A3B32]">{value}</p>
    </div>
  );
}