import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { LEVELS } from '../../data/levels';
import { X, Lock, Star, CheckCircle2 } from 'lucide-react';
import { GSAPModal } from '../ui/GSAPModal';
import gsap from 'gsap';

export const WorldMapModal: React.FC = () => {
  const {
    isWorldMapOpen,
    setWorldMapOpen,
    userProgress,
    currentLevelId,
    setLevel
  } = useGameStore();

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isWorldMapOpen && gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.level-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          delay: 0.15,
          ease: 'power2.out'
        }
      );
    }
  }, [isWorldMapOpen]);

  return (
    <GSAPModal
      isOpen={isWorldMapOpen}
      onClose={() => setWorldMapOpen(false)}
      maxWidthClass="max-w-2xl"
    >
      <div className="p-6 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-100">Mapa de Niveles</h2>
            <p className="text-xs text-slate-400">Selecciona un nivel desbloqueado para jugar</p>
          </div>
          <button
            onClick={() => setWorldMapOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* Level List Grid */}
        <div ref={gridRef} className="flex-1 overflow-y-auto py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pr-1">
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
                className={`level-card p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                    : isUnlocked
                    ? 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-500 hover:scale-[1.02]'
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
    </GSAPModal>
  );
};
