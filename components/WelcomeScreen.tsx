import React from 'react';
import { Music, ArrowRight, Star } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-6 text-white z-50 animate-in fade-in duration-500 overflow-hidden">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2574&auto=format&fit=crop" 
          alt="Christmas Background" 
          className="w-full h-full object-cover"
        />
        {/* Darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40"></div>
      </div>

      {/* CSS Snowflakes */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="snowflake" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            animationDuration: `${5 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.7
          }}
        >
          ❄
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center w-full max-w-md text-center">
        
        {/* Animated Icon */}
        <div className="mb-10 p-6 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-white/20 flex items-center justify-center relative">
           <div className="absolute -top-3 -right-3 text-amber-400 animate-pulse">
             <Star className="w-8 h-8 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
           </div>
           <span className="text-7xl filter drop-shadow-2xl">🎄</span>
        </div>
        
        <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-center mb-4 leading-tight tracking-wide text-amber-50 drop-shadow-lg">
          St. George<br/>
          <span className="text-amber-400">Mission</span>
        </h1>
        
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent my-6 opacity-80"></div>
        
        <h2 className="text-lg font-medium tracking-[0.3em] uppercase mb-12 text-slate-200 font-cinzel drop-shadow-md">
          Carol Song Book
        </h2>
        
        <button 
          onClick={onStart}
          className="group w-full max-w-xs bg-white text-christmas-green font-bold text-lg py-4 px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all flex items-center justify-between hover:bg-amber-50"
        >
          <span className="flex items-center gap-3">
            <Music className="w-5 h-5 text-amber-600" />
            <span className="font-cinzel font-bold text-slate-900">Open Book</span>
          </span>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
        </button>
        
        <div className="mt-16 text-center space-y-4 opacity-80">
            <p className="text-white text-[10px] font-medium uppercase tracking-[0.2em] font-sans">
              Joy to the World
            </p>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">Designed & Created by</span>
              <span className="text-xs font-cinzel text-amber-100/90">Jobby Kuttamperoor Tom</span>
            </div>
        </div>
      </div>
    </div>
  );
};