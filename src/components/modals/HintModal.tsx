import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Lightbulb, X } from 'lucide-react';
import { GSAPModal } from '../ui/GSAPModal';
import { TRACK_THEMES } from '../../utils/theme';

export const HintModal: React.FC = () => {
  const { isHintOpen, setHintOpen, currentLevel, activeTrack } = useGameStore();
  const theme = TRACK_THEMES[activeTrack] || TRACK_THEMES.python;

  return (
    <GSAPModal
      isOpen={isHintOpen}
      onClose={() => setHintOpen(false)}
      maxWidthClass="max-w-md"
    >
      <div className="p-6 text-center relative">
        <button
          onClick={() => setHintOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 bg-slate-800 rounded-xl transition-all hover:scale-105 active:scale-95"
        >
          <X size={16} />
        </button>

        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${theme.accentBoxBg} border ${theme.accentBoxBorder} flex items-center justify-center ${theme.iconColor} animate-bounce`}>
          <Lightbulb size={32} />
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2">Pista Pedagógica</h3>
        <p className="text-sm text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-left leading-relaxed mb-6 font-medium">
          {currentLevel.hint}
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => setHintOpen(false)}
            className={`px-8 py-3 bg-gradient-to-r ${theme.buttonGrad} rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2`}
          >
            <span>¡Entendido, a programar!</span>
          </button>
        </div>
      </div>
    </GSAPModal>
  );
};
