import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Trophy, Star, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { GSAPModal } from '../ui/GSAPModal';
import gsap from 'gsap';

export const VictoryModal: React.FC = () => {
  const {
    isVictoryModalOpen,
    currentLevel,
    userProgress,
    nextLevel,
    resetCurrentLevel,
    setVictoryModalOpen
  } = useGameStore();

  const starContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVictoryModalOpen && starContainerRef.current) {
      const starsEl = starContainerRef.current.querySelectorAll('.star-badge');
      gsap.fromTo(
        starsEl,
        { scale: 0, rotation: -45, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          delay: 0.2,
          ease: 'back.out(2)'
        }
      );
    }
  }, [isVictoryModalOpen]);

  const progress = userProgress[currentLevel.id];
  const stars = progress ? progress.stars : 1;

  return (
    <GSAPModal
      isOpen={isVictoryModalOpen}
      onClose={() => setVictoryModalOpen(false)}
      maxWidthClass="max-w-md"
    >
      <div className="p-6 text-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy Header */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-0.5 shadow-lg shadow-amber-500/30 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-100 mb-1">¡Nivel Completado!</h2>
        <p className="text-xs text-slate-400 mb-6">{currentLevel.title}</p>

        {/* Star Rating */}
        <div ref={starContainerRef} className="flex items-center justify-center gap-3 mb-6">
          {[1, 2, 3].map(st => (
            <div
              key={st}
              className={`star-badge p-3 rounded-2xl transition-all duration-500 transform ${
                st <= stars
                  ? 'bg-amber-500/20 border border-amber-500/40 scale-110 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800/50 border border-slate-800 opacity-40'
              }`}
            >
              <Star
                size={32}
                className={st <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}
              />
            </div>
          ))}
        </div>

        {/* Score Details */}
        <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800 mb-6 text-left space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 font-medium text-slate-400">
              <Award size={14} className="text-cyan-400" /> Concepto Aprendido:
            </span>
            <span className="font-bold text-cyan-400">{currentLevel.conceptName}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-medium text-slate-400">Meta de bloques:</span>
            <span className="font-bold text-slate-200">
              {progress?.bestBlockCount || 0} / {currentLevel.maxBlocks} bloques
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setVictoryModalOpen(false);
              resetCurrentLevel();
            }}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw size={16} />
            <span>Repetir</span>
          </button>

          <button
            onClick={nextLevel}
            className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <span>Siguiente Nivel</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </GSAPModal>
  );
};
