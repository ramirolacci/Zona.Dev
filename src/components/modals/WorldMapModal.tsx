import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { LEVELS } from '../../data/levels';
import { X, Lock, Star, CheckCircle2 } from 'lucide-react';

export const WorldMapModal: React.FC = () => {
  const {
    isWorldMapOpen,
    setWorldMapOpen,
    userProgress,
    currentLevelId,
    setLevel
  } = useGameStore();

  if (!isWorldMapOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-100">Mapa de Niveles</h2>
            <p className="text-xs text-slate-400">Selecciona un nivel desbloqueado para jugar</p>
          </div>
          <button
            onClick={() => setWorldMapOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800 rounded-xl transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Level List Grid */}
        <div className="flex-1 overflow-y-auto py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pr-1">
          {LEVELS.map(level => {
            const progress = userProgress[level.id];
            const isUnlocked = level.id === 1 || !!progress;
            const isCompleted = progress?.completed;
            const stars = progress?.stars || 0;
            const isCurrent = level.id === currentLevelId;

            return (
              <div
                key={level.id}
                onClick={() => {
                  if (isUnlocked) {
                    setLevel(level.id);
                    setWorldMapOpen(false);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                    : isUnlocked
                    ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      Mundo {level.world} • {level.conceptName}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100">{level.title}</h3>
                  </div>

                  {!isUnlocked ? (
                    <Lock size={18} className="text-slate-600" />
                  ) : isCompleted ? (
                    <CheckCircle2 size={18} className="text-emerald-400" />
                  ) : null}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map(st => (
                      <Star
                        key={st}
                        size={14}
                        className={st <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] text-slate-400">
                    Max: <strong className="text-slate-200">{level.maxBlocks} bloques</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
