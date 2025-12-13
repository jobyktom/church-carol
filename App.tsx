import React, { useState, useEffect } from 'react';
import { SongListSidebar } from './components/SongListSidebar';
import { LyricsEditor } from './components/LyricsEditor';
import { BookletView } from './components/BookletView';
import { WelcomeScreen } from './components/WelcomeScreen';
import { INITIAL_SONGS, APP_TITLE } from './constants';
import { Song, BookletMetadata } from './types';

const App: React.FC = () => {
  const [songs] = useState<Song[]>(INITIAL_SONGS);
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'editor'>('list');
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [metadata] = useState<BookletMetadata>({
    title: APP_TITLE,
    subtitle: "Christmas Carols"
  });

  const selectedSong = songs.find(s => s.id === selectedSongId) || songs[0];

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!showWelcome) {
        e.preventDefault();
        e.returnValue = ''; 
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [showWelcome]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (showWelcome) return;

      const state = event.state;
      if (state && state.view === 'editor') {
        setMobileView('editor');
        setSelectedSongId(state.songId);
      } else {
        setMobileView('list');
        setSelectedSongId(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showWelcome]);

  const handleStartApp = () => {
    setShowWelcome(false);
  };

  const handleSelectSong = (id: number) => {
    setSelectedSongId(id);
    setMobileView('editor');
    window.history.pushState({ view: 'editor', type: 'song', songId: id }, '');
  };

  const handleBackToMenu = () => {
    if (window.history.state?.view === 'editor') {
      window.history.back();
    } else {
      setMobileView('list');
      setSelectedSongId(null);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-christmas-cream overflow-hidden print:bg-white print:h-auto print:overflow-visible text-slate-800">
      
      {showWelcome && (
        <WelcomeScreen onStart={handleStartApp} />
      )}

      {/* Header: Premium Dark Green */}
      <header className="bg-christmas-green border-b border-christmas-gold/30 h-16 md:h-20 flex items-center px-4 md:px-6 shadow-xl print:hidden flex-shrink-0 z-20 relative">
        <div className="flex items-center gap-4 relative z-10 w-full">
          {/* Logo Icon */}
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white border border-white/20 shadow-inner">
            <span className="text-2xl filter drop-shadow-md">🎄</span>
          </div>
          
          <div className="flex flex-col">
             <h1 className="font-cinzel font-bold text-amber-50 text-lg md:text-2xl leading-none tracking-wide">
               St. George Mission
             </h1>
             <span className="text-[10px] md:text-xs text-christmas-gold font-bold uppercase tracking-[0.25em] mt-1.5 md:mt-1 opacity-90">
               Song Book
             </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden print:hidden relative w-full">
        
        {/* Sidebar / List View */}
        <div className={`
          absolute inset-0 z-10 bg-white md:static md:w-[26rem] md:block h-full transition-transform duration-300 ease-out will-change-transform border-r border-stone-200
          ${mobileView === 'list' ? 'translate-x-0' : '-translate-x-[20%] opacity-0 md:opacity-100 md:translate-x-0'}
        `}>
          <SongListSidebar 
            songs={songs} 
            selectedSongId={selectedSongId} 
            onSelectSong={handleSelectSong} 
            onHome={() => setShowWelcome(true)}
          />
        </div>
        
        {/* Detail / Lyrics View */}
        <div className={`
          absolute inset-0 z-20 md:static md:flex-1 h-full transition-transform duration-300 ease-out will-change-transform shadow-2xl md:shadow-none bg-christmas-cream
          ${mobileView === 'editor' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}>
          <LyricsEditor 
            song={selectedSong} 
            onBack={handleBackToMenu}
          />
        </div>
      </div>

      {/* Hidden Print Component */}
      <BookletView songs={songs} metadata={metadata} />
      
      <style>{`
        @media print {
          @page { margin: 0; size: A4; }
          body { background-color: white; -webkit-print-color-adjust: exact; }
          .page-break-after { page-break-after: always; }
          .fixed { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default App;