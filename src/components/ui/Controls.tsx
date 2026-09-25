import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CodeRunner } from '../../core/interpreter/CodeRunner';
import { Play, RotateCcw, FastForward, AlertCircle } from 'lucide-react';
import { TRACK_THEMES } from '../../utils/theme';

export const Controls: React.FC = () => {
  const {
    currentLevel,
    activeTrack,
    executionState,
    speed,
    setSpeed,
    setExecutionState,
    setError,
    clearLogs,
    addLog,
    errorMessage,
    resetCurrentLevel
  } = useGameStore();

  const theme = TRACK_THEMES[activeTrack] || TRACK_THEMES.python;

  const handleRun = async () => {
    if (executionState === 'RUNNING') return;

    resetCurrentLevel();
    clearLogs();
    setError(null);

    const workspace = (window as any).__blocklyWorkspace;
    if (!workspace) {
      setError("No se encontró el espacio de trabajo de bloques.");
      return;
    }

    const runner = new CodeRunner(currentLevel);
    const result = await runner.simulate(workspace);

    if (!result.actions || result.actions.length === 0) {
      if (result.errorMsg) {
        setError(result.errorMsg);
      } else {
        setError("Agrega bloques al espacio de trabajo para dar órdenes.");
      }
      return;
    }

    // Trigger action queue execution on canvas
    const triggerFn = (window as any).__runActionQueue;
    if (triggerFn) {
      addLog(`🚀 Iniciando simulación de ${result.actions.length} acciones...`);
      triggerFn(result.actions, result.blockCount);

      // If simulation ends with failure reason, schedule error banner display
      if (!result.success && result.errorMsg) {
        const failDelayMs = (result.actions.length * (600 / speed)) + 100;
        setTimeout(() => {
          setError(result.errorMsg || "Error en la ejecución.");
          setExecutionState('FAILED');
        }, failDelayMs);
      }
    }
  };

  const handleReset = () => {
    resetCurrentLevel();
  };

  const toggleSpeed = () => {
    if (speed === 1) setSpeed(2);
    else if (speed === 2) setSpeed(4);
    else setSpeed(1);
  };

  return (
    <div className={`w-full ${theme.panelBg} border ${theme.panelBorder} p-4 rounded-2xl flex flex-col gap-3 shadow-2xl transition-colors duration-500`}>
      {/* Action Buttons Row */}
      <div className="flex items-center justify-between gap-3 w-full flex-wrap">
        {/* Play Button */}
        <button
          onClick={handleRun}
          disabled={executionState === 'RUNNING'}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 flex-1 sm:flex-none ${
            executionState === 'RUNNING'
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60'
              : `bg-gradient-to-r ${theme.buttonGrad}`
          }`}
        >
          <Play size={18} className="fill-slate-950" />
          <span>{executionState === 'RUNNING' ? 'Ejecutando...' : 'Ejecutar Programa'}</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all active:scale-95"
          title="Reiniciar Nivel"
        >
          <RotateCcw size={16} />
          <span>Reiniciar</span>
        </button>

        {/* Speed Toggle */}
        <button
          onClick={toggleSpeed}
          className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
          title="Cambiar velocidad"
        >
          <FastForward size={16} />
          <span>{speed}x</span>
        </button>
      </div>

      {/* Error / Alert Status Banner (Stacked & Full Width) */}
      {errorMessage && (
        <div className="w-full bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-medium flex items-start gap-2.5 animate-shake leading-snug break-words">
          <AlertCircle size={16} className="shrink-0 text-red-400 mt-0.5" />
          <span className="flex-1">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
