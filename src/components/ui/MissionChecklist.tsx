import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Target, CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react';

export const MissionChecklist: React.FC = () => {
  const { currentLevel, executionState } = useGameStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const workspace = (window as any).__blocklyWorkspace;
  const currentBlockCount = workspace ? workspace.getAllBlocks(false).length : 0;
  const isSuccess = executionState === 'SUCCESS';

  return (
    <div className="absolute bottom-4 left-4 z-20 max-w-xs bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-2xl p-3 shadow-2xl transition-all">
      {/* Header */}
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between gap-2 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Target size={16} className="text-cyan-400" />
          <span className="text-xs font-bold text-slate-200">Objetivos de la Misión</span>
        </div>
        <button className="text-slate-400 hover:text-slate-200">
          {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Objectives Checklist */}
      {!isCollapsed && (
        <div className="mt-2.5 pt-2.5 border-t border-slate-800 space-y-1.5">
          {currentLevel.objectives.map(obj => {
            let checked = false;
            if (obj.id === 'goal' && isSuccess) checked = true;
            if (obj.id === 'blocks' && currentBlockCount > 0 && currentBlockCount <= currentLevel.maxBlocks) checked = true;
            if (obj.id === 'bridge' && isSuccess) checked = true;
            if (obj.id === 'collect_sheep' && isSuccess) checked = true;
            if (obj.id === 'collect_all' && isSuccess) checked = true;
            if (obj.id === 'loop_use' && isSuccess) checked = true;
            if (obj.id === 'if_use' && isSuccess) checked = true;
            if (obj.id === 'bridges_all' && isSuccess) checked = true;

            return (
              <div key={obj.id} className="flex items-start gap-2 text-[11px]">
                {checked ? (
                  <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Circle size={14} className="text-slate-500 shrink-0 mt-0.5" />
                )}
                <span className={checked ? 'text-slate-200 font-bold opacity-90' : 'text-slate-400 font-medium'}>
                  {obj.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
