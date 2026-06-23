import { useNavigate } from 'react-router-dom';
import { Home, Coffee } from 'lucide-react';

export function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F5F0EB] relative overflow-hidden font-sans flex items-center justify-center">
            {/* Animated backdrops (Blobs) — using classes from index.css */}
            <div className="coffee-blob coffee-blob-a" />
            <div className="coffee-blob coffee-blob-b" />
            <div className="coffee-blob coffee-blob-c" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 py-16 max-w-lg mx-4 bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[3rem]">

                {/* 404 number in translucent background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-[3rem]">
                    <span className="text-[14rem] font-black text-[#4A3B32]/5 select-none">
                        404
                    </span>
                </div>

                {/* أيقونة القهوة */}
                <div className="relative mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#8C6239] to-[#5F3A26] text-white shadow-lg animate-bounce">
                    <Coffee size={36} strokeWidth={1.5} />
                </div>

                {/* العنوان */}
                <h1 className="relative text-3xl md:text-4xl font-extrabold text-[#4A3B32] mb-3">
                    Oops! Page Not Found
                </h1>

                {/* الوصف */}
                <p className="relative text-[#6B4423]/80 mb-10 text-base font-medium leading-relaxed">
                    Looks like this page was spilled. Don't worry, the coffee is still brewing back home.
                </p>

                {/* Back to home button */}
                <button
                    onClick={() => navigate('/')}
                    className="relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-[#553220] text-white font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#422617] hover:shadow-[0_15px_30px_-10px_rgba(54,31,21,0.8)] active:scale-95"
                >
                    <Home size={22} />
                    Back to Home
                </button>
            </div>
        </div>
    );
}