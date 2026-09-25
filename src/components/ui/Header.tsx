import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Code2, Map, Lightbulb, Volume2, VolumeX, Sparkles, Bot, LayoutGrid } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentLevel,
    userProgress,
    soundEnabled,
    toggleSound,
    setWorldMapOpen,
    setHintOpen,
    setLevelIntroOpen,
    currentView,
    setCurrentView,
    activeTrack
  } = useGameStore();

  const progress = userProgress[currentLevel.id];
  const stars = progress ? progress.stars : 0;

  const trackLabels: Record<string, { label: string; color: string }> = {
    python: { label: '🐍 Python', color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' },
    javascript: { label: '⚡ JavaScript', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    django: { label: '🎸 Django', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
    react: { label: '⚛️ React', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
  };

  const trackInfo = trackLabels[activeTrack] || trackLabels.python;

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-lg border-b border-slate-800 px-6 py-3 flex items-center justify-between shadow-xl sticky top-0 z-40">
      {/* Brand & Logo & Home Switcher */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentView(currentView === 'home' ? 'game' : 'home')}
          className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Ver Módulos de Aprendizaje"
        >
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Code2 className="w-5 h-5 text-cyan-400" />
          </div>
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              CODEQUEST
            </h1>
            {currentView === 'game' && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${trackInfo.color}`}>
                {trackInfo.label}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Aprende a Programar Jugando</p>
        </div>
      </div>

      {/* Level Info & Stars (Only in game view) */}
      {currentView === 'game' && (
        <div className="hidden md:flex items-center gap-4 bg-slate-950/80 px-4 py-1.5 rounded-xl border border-slate-800/80 shadow-inner">
          <div>
            <div className="text-xs text-slate-400 font-semibold">{currentLevel.worldTitle}</div>
            <div className="text-sm font-bold text-slate-100">{currentLevel.title}</div>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 pl-3 border-l border-slate-800">
            {[1, 2, 3].map(st => (
              <Sparkles
                key={st}
                size={18}
                className={st <= stars ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-700'}
              />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Module Switcher Button */}
        <button
          onClick={() => setCurrentView(currentView === 'home' ? 'game' : 'home')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 border ${
            currentView === 'home'
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/20'
              : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
          }`}
        >
          <LayoutGrid size={16} />
          <span>{currentView === 'home' ? 'Volver al Juego' : 'Módulos'}</span>
        </button>

        {currentView === 'game' && (
          <>
            {/* Mentor Cody Mission Intro Button */}
            <button
              onClick={() => setLevelIntroOpen(true)}
              className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              title="Ver Guía del Mentor Cody"
            >
              <Bot size={16} />
              <span>Misión</span>
            </button>

            {/* Hint Button */}
            <button
              onClick={() => setHintOpen(true)}
              className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              title="Ver Pista"
            >
              <Lightbulb size={16} />
              <span>Pista</span>
            </button>

            {/* World Map Level Select */}
            <button
              onClick={() => setWorldMapOpen(true)}
              className="px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Map size={16} />
              <span>Mapa</span>
            </button>
          </>
        )}

        {/* Mute Sound */}
        <button
          onClick={toggleSound}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all active:scale-95"
          title={soundEnabled ? 'Silenciar' : 'Activar Sonido'}
        >
          {soundEnabled ? <Volume2 size={16} className="text-cyan-400" /> : <VolumeX size={16} className="text-slate-500" />}
        </button>
      </div>
    </header>
  );
};
