import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Lightbulb, X } from 'lucide-react';

export const HintModal: React.FC = () => {
  const { isHintOpen, setHintOpen, currentLevel } = useGameStore();

  if (!isHintOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center">
        <button
          onClick={() => setHintOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-200 bg-slate-800 rounded-xl transition-all"
        >
          <X size={16} />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <Lightbulb size={32} />
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2">Pista Pedagógica</h3>
        <p className="text-sm text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-left leading-relaxed mb-6">
          {currentLevel.hint}
        </p>

        <button
          onClick={() => setHintOpen(false)}
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all active:scale-95 shadow-lg shadow-amber-500/20"
        >
          ¡Entendido, a programar!
        </button>
      </div>
    </div>
  );
};
