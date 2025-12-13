import React from 'react';
import { Song } from '../types';
import { ChevronRight } from 'lucide-react';

interface SongListSidebarProps {
  songs: Song[];
  selectedSongId: number | null;
  onSelectSong: (id: number) => void;
}

export const SongListSidebar: React.FC<SongListSidebarProps> = ({ 
  songs, 
  selectedSongId, 
  onSelectSong 
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      
      <div className="flex-1 overflow-y-auto overscroll-contain pb-safe-area scrollbar-thin">
        {/* Header Label */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Index of Songs</span>
        </div>

        <ul className="divide-y divide-slate-100">
          {songs.map((song) => {
            const isSelected = selectedSongId === song.id;
            return (
              <li key={song.id}>
                <button
                  onClick={() => onSelectSong(song.id)}
                  className={`
                    w-full text-left py-4 px-5 transition-all flex items-center gap-4 group relative
                    ${isSelected ? 'bg-amber-50/60' : 'bg-white hover:bg-slate-50'}
                  `}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-christmas-gold"></div>
                  )}

                  {/* Song Number */}
                  <div className={`
                    text-lg font-cinzel font-bold w-8 text-center flex-shrink-0 transition-colors
                    ${isSelected ? 'text-christmas-gold' : 'text-slate-300 group-hover:text-slate-400'}
                  `}>
                    {song.id < 10 ? `0${song.id}` : song.id}
                  </div>

                  {/* Song Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-[1.05rem] malayalam-text leading-tight mb-1.5 ${
                      isSelected ? 'text-christmas-green' : 'text-slate-800'
                    }`}>
                      {song.title}
                    </h3>
                    {song.originalTitle && song.originalTitle !== song.title && (
                      <p className={`text-xs font-medium uppercase tracking-wide truncate ${isSelected ? 'text-amber-700/80' : 'text-slate-400'}`}>
                        {song.originalTitle}
                      </p>
                    )}
                  </div>

                  {/* Chevron */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                     <ChevronRight className={`w-5 h-5 ${isSelected ? 'text-christmas-gold' : 'text-slate-300'}`} />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Footer Credits */}
        <div className="py-12 px-6 text-center">
           <div className="w-12 h-px bg-slate-200 mx-auto mb-4"></div>
           <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">Prepared by</p>
           <p className="text-xs font-cinzel text-slate-600">Jobby Kuttamperoor Tom</p>
        </div>

        <div className="h-20 md:hidden"></div>
      </div>
    </div>
  );
};