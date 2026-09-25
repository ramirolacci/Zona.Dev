import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Bot, BookOpen, CheckCircle2, Play, X } from 'lucide-react';
import { GSAPModal } from '../ui/GSAPModal';
import { TRACK_THEMES } from '../../utils/theme';

export const LevelIntroModal: React.FC = () => {
  const { isLevelIntroOpen, setLevelIntroOpen, currentLevel, activeTrack } = useGameStore();
  const theme = TRACK_THEMES[activeTrack] || TRACK_THEMES.python;

  return (
    <GSAPModal
      isOpen={isLevelIntroOpen}
      onClose={() => setLevelIntroOpen(false)}
      maxWidthClass="max-w-xl"
    >
      {/* Close Button */}
      <button
        onClick={() => setLevelIntroOpen(false)}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 bg-slate-800/80 rounded-xl transition-all hover:scale-105 active:scale-95 z-10"
      >
        <X size={16} />
      </button>

      <div className="p-6 flex flex-col h-full overflow-hidden">
        {/* Header with Cody Avatar */}
        <div className={`flex items-center gap-4 pb-4 border-b ${theme.accentBoxBorder}`}>
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${theme.buttonGrad} p-0.5 shadow-lg flex items-center justify-center shrink-0`}>
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot size={32} className={`${theme.iconColor} animate-bounce`} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${theme.badgeText} ${theme.badgeBg} px-2 py-0.5 rounded border ${theme.badgeBorder}`}>
                {currentLevel.worldTitle} • {theme.name}
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-100 mt-1">{currentLevel.title}</h2>
          </div>
        </div>

        {/* Scrollable Story & Pedagogy Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {/* Cody Dialogue */}
          <div className={`${theme.accentBoxBg} p-4 rounded-2xl border ${theme.accentBoxBorder} relative`}>
            <div className={`text-xs font-semibold ${theme.iconColor} mb-1 flex items-center gap-1.5`}>
              <span>🤖 Cody dice:</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed italic">
              &quot;{currentLevel.story}&quot;
            </p>
          </div>

          {/* Learning Objective */}
          <div className={`${theme.accentBoxBg} border ${theme.accentBoxBorder} p-4 rounded-2xl`}>
            <h3 className={`text-xs font-bold ${theme.iconColor} uppercase tracking-wider mb-1.5 flex items-center gap-2`}>
              <BookOpen size={16} /> ¿Qué aprenderás hoy en {theme.name}?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {currentLevel.learningObjective}
            </p>
          </div>

          {/* Step-by-Step Guide */}
          <div className={`${theme.accentBoxBg} border ${theme.accentBoxBorder} p-4 rounded-2xl`}>
            <h3 className={`text-xs font-bold ${theme.badgeText} uppercase tracking-wider mb-2.5 flex items-center gap-2`}>
              <CheckCircle2 size={16} className={theme.iconColor} /> ¿Cómo resolver este nivel paso a paso?
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {currentLevel.stepByStepGuide.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${theme.iconColor} bg-current shrink-0 mt-1.5`} />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Start Button */}
        <div className={`pt-4 border-t ${theme.accentBoxBorder} flex justify-center`}>
          <button
            onClick={() => setLevelIntroOpen(false)}
            className={`px-8 py-3.5 bg-gradient-to-r ${theme.buttonGrad} rounded-2xl inline-flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-95`}
          >
            <Play size={18} className="fill-current" />
            <span>¡Entendido, Empezar Misión!</span>
          </button>
        </div>
      </div>
    </GSAPModal>
  );
};
