import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Bot, BookOpen, CheckCircle2, Play, Sparkles, X } from 'lucide-react';
import { GSAPModal } from '../ui/GSAPModal';

export const LevelIntroModal: React.FC = () => {
  const { isLevelIntroOpen, setLevelIntroOpen, currentLevel } = useGameStore();

  return (
    <GSAPModal
      isOpen={isLevelIntroOpen}
      onClose={() => setLevelIntroOpen(false)}
      maxWidthClass="max-w-xl"
    >
      {/* Glow Effects */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Close Button */}
      <button
        onClick={() => setLevelIntroOpen(false)}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 bg-slate-800 rounded-xl transition-all hover:scale-105 active:scale-95"
      >
        <X size={16} />
      </button>

      <div className="p-6 flex flex-col h-full overflow-hidden">
        {/* Header with Cody Avatar */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
              <Bot size={32} className="animate-bounce" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                {currentLevel.worldTitle}
              </span>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                <Sparkles size={10} /> {currentLevel.conceptName}
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-100 mt-1">{currentLevel.title}</h2>
          </div>
        </div>

        {/* Scrollable Story & Pedagogy Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Cody Dialogue */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 relative">
            <div className="text-xs font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
              <span>🤖 Cody dice:</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed italic">
              &quot;{currentLevel.story}&quot;
            </p>
          </div>

          {/* Learning Objective */}
          <div className="bg-cyan-950/30 border border-cyan-500/40 p-4 rounded-2xl">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <BookOpen size={16} /> ¿Qué aprenderás hoy?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {currentLevel.learningObjective}
            </p>
          </div>

          {/* Step-by-Step Guide */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" /> ¿Cómo resolver este nivel paso a paso?
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {currentLevel.stepByStepGuide.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={() => setLevelIntroOpen(false)}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Play size={18} className="fill-slate-950" />
            <span>¡Entendido, Empezar Misión!</span>
          </button>
        </div>
      </div>
    </GSAPModal>
  );
};
