import React, { useRef, useEffect, useState } from 'react';
import { Song } from '../types';
import { ChevronLeft, Music } from 'lucide-react';

interface LyricsEditorProps {
  song: Song;
  onBack?: () => void;
}

export const LyricsEditor: React.FC<LyricsEditorProps> = ({ song, onBack }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showManglish, setShowManglish] = useState(false);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [song.id]);

  const hasManglish = !!song.lyricsManglish && 
    (song.lyrics.replace(/\s/g, '') !== song.lyricsManglish.replace(/\s/g, ''));

  return (
    <div className="flex-1 h-full flex flex-col bg-christmas-cream relative">
      
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      {/* Mobile Navbar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-stone-200/60 py-2 px-3 flex items-center justify-between shadow-sm z-30 sticky top-0 md:hidden h-14">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-700 px-2 py-1.5 rounded-lg active:bg-stone-100"
        >
          <ChevronLeft className="w-5 h-5 text-christmas-green" />
          <span className="font-cinzel font-bold text-sm text-christmas-green">Back</span>
        </button>
        
        {hasManglish && (
          <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200">
            <button
              onClick={() => setShowManglish(false)}
              className={`px-3 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-wide transition-all ${
                !showManglish 
                  ? 'bg-white text-christmas-green shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-400'
              }`}
            >
              Mal
            </button>
            <button
              onClick={() => setShowManglish(true)}
              className={`px-3 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-wide transition-all ${
                showManglish 
                  ? 'bg-white text-christmas-green shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-400'
              }`}
            >
              Eng
            </button>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex bg-white/60 backdrop-blur-sm border-b border-stone-200/60 px-8 py-4 items-center justify-between sticky top-0 z-20">
         <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-christmas-gold uppercase tracking-[0.2em] font-cinzel pt-0.5">
              Now Reading
            </span>
         </div>

         {hasManglish && (
           <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200/80">
             <button
               onClick={() => setShowManglish(false)}
               className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${!showManglish ? 'bg-white text-christmas-green shadow-sm ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Malayalam
             </button>
             <button
               onClick={() => setShowManglish(true)}
               className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${showManglish ? 'bg-white text-christmas-green shadow-sm ring-1 ring-black/5' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Manglish
             </button>
           </div>
         )}
      </div>

      {/* Content Area */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain relative z-10"
      >
        <div className="max-w-3xl mx-auto px-5 py-8 md:px-10 md:py-16">
            
            {/* Song Header */}
            <div className="mb-10 text-center">
              <span className="inline-block px-3 py-1 border border-christmas-gold/30 rounded-full text-christmas-gold text-xs font-bold font-cinzel mb-4 bg-amber-50/50">
                Song #{song.id}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-christmas-green malayalam-text leading-tight mb-3">
                {song.title}
              </h1>
              {song.originalTitle && song.originalTitle !== song.title && (
                <p className="text-slate-500 font-serif italic text-lg md:text-xl">
                  {song.originalTitle}
                </p>
              )}
            </div>
            
            {/* Lyrics Card */}
            <div className={`
              relative bg-white shadow-xl shadow-stone-200/50 rounded-xl md:rounded-2xl border border-stone-100
              p-6 md:p-16 transition-all duration-300
              ${showManglish ? 'font-serif' : 'malayalam-text'}
            `}>
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-christmas-gold/20"></div>
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-christmas-gold/20"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-christmas-gold/20"></div>
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-christmas-gold/20"></div>

                <div className={`
                  whitespace-pre-wrap text-center select-text w-full text-slate-800
                  ${showManglish ? 'text-[1.15rem] md:text-[1.35rem] leading-[2]' : 'text-[1.25rem] md:text-[1.5rem] leading-[1.8] font-medium'}
                `}>
                  {showManglish && hasManglish ? song.lyricsManglish : song.lyrics}
                </div>
                
                {showManglish && !hasManglish && (
                  <div className="text-slate-400 italic mt-8 text-center border-t border-slate-100 pt-6">
                    Transliteration available only in Malayalam mode.
                  </div>
                )}

                {!song.lyrics && (
                   <div className="text-slate-400 italic text-center py-10">
                    Lyrics not available.
                  </div>
                )}
            </div>
            
            {/* End Mark */}
            <div className="mt-12 flex justify-center opacity-30">
               <Music className="w-5 h-5 text-slate-400" />
            </div>
            
            {/* Bottom spacer for mobile */}
            <div className="h-20 md:hidden"></div>
        </div>
      </div>
    </div>
  );
};