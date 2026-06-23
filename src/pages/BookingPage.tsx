import { Check, Star, Users, Coffee, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Booking plans interface (tables)
interface BookingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: React.ElementType;
  features: string[];
  isPopular?: boolean;
  color: string;
}

const bookingPlans: BookingPlan[] = [
  {
    id: 'single',
    name: 'Focus Corner',
    description: 'Ideal single table for study or remote work with total peace.',
    price: '25',
    duration: 'Hour',
    icon: Coffee,
    features: ['Comfortable seat & private charger', 'Ultra-fast internet', '10% discount on drinks'],
    color: 'from-[#D4B895] to-[#C3A077]',
  },
  {
    id: 'duo',
    name: "Friends' Spot",
    description: 'Cozy table for 2 to 4 people, perfect for conversation.',
    price: '45',
    duration: 'Hour',
    icon: Users,
    features: ['Premium view', 'Fast hospitality service', 'Pre-booking available', 'Quiet corner'],
    isPopular: true,
    color: 'from-[#8C6239] to-[#6B4423]',
  },
  {
    id: 'meeting',
    name: 'Meeting Room',
    description: 'Fully equipped private space for formal meetings or workshops.',
    price: '150',
    duration: 'Hour',
    icon: Star,
    features: ['Smart display screen', 'Whiteboard', 'Complimentary coffee', 'Total privacy'],
    color: 'from-[#4A3B32] to-[#2E1F18]',
  }
];

// Ensure the function name is BookingPage to match the import in App.tsx
export function BookingPage() {
  const navigate = useNavigate();

  return (
    <div dir="ltr" className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans pb-12">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#E8DCC8] opacity-60 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#D4B895] opacity-40 blur-[120px] pointer-events-none" />

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed left-6 top-24 z-50 p-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white transition-all duration-300 group"
      >
        <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold pb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#4A3B32] via-[#8C6239] to-[#4A3B32] animate-gradient">
            Book Your Private Space
          </h1>
          <p className="text-xl md:text-2xl text-[#6B4423]/80 max-w-2xl mx-auto font-medium">
            Pick the session that fits your needs, and leave the coffee and peace to us.
          </p>
        </div>

        {/* Booking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {bookingPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative group rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2
                  ${plan.isPopular
                    ? 'bg-white/45 border-2 border-[#8C6239]/40 shadow-2xl md:scale-105 z-10'
                    : 'bg-white/25 border border-white/50 shadow-xl'
                  } backdrop-blur-xl`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8C6239] text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${plan.color} text-white shadow-lg`}>
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#4A3B32]">{plan.name}</h3>
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-black text-[#4A3B32]">{plan.price}</span>
                  <span className="text-lg text-[#6B4423]/60 font-bold ml-1"> SAR / {plan.duration}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#4A3B32]">
                      <div className="mt-1 rounded-full p-1 bg-[#8C6239]/20 text-[#8C6239]">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="font-semibold text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    localStorage.setItem('selectedBookingPlanId', plan.id);
                    navigate('/booking-form');
                  }}
                  className={`w-full py-4 rounded-2xl font-black text-lg transition-all ${plan.isPopular ? 'bg-[#8C6239] text-white' : 'bg-[#4A3B32] text-white'
                    }`}
                >
                  Confirm Booking
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}