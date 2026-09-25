import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import type { TrackType } from '../../types/game';
import { Code2, Copy, Check, Terminal } from 'lucide-react';

const formatCodeForTrack = (track: TrackType, rawPy: string, rawJs: string): string => {
  if (track === 'python') {
    if (!rawPy) return '';
    return `# --- CÓDIGO PYTHON (Sintaxis Limpia) ---\nfrom cody_robot import Robot\n\nbot = Robot()\n\n${rawPy}`;
  }
  if (track === 'django') {
    if (!rawPy) return '';
    const indentedPy = rawPy.split('\n').map(l => '        ' + l).join('\n');
    return `# --- VISTA BACKEND DJANGO (views.py) ---\nfrom rest_framework.views import APIView\nfrom rest_framework.response import Response\nfrom .models import RobotCody\n\nclass ExecuteMissionView(APIView):\n    """Controlador Backend Django API"""\n    def post(self, request, format=None):\n        bot = RobotCody.objects.get(id=request.data.get('bot_id', 1))\n\n${indentedPy}\n        return Response({"status": "success", "message": "Misión completada"})\n`;
  }
  if (track === 'react') {
    if (!rawJs) return '';
    const indentedJs = rawJs.split('\n').map(l => '    ' + l).join('\n');
    return `// --- COMPONENTE REACT FRONTEND (RobotMission.tsx) ---\nimport React, { useState } from 'react';\nimport { useCodyRobot } from '@zonadev/robot-hook';\n\nexport const RobotMissionController: React.FC = () => {\n  const { moveForward, turnLeft, turnRight, buildBridge, collectItem } = useCodyRobot();\n\n  const handleExecuteMission = async () => {\n${indentedJs}  };\n\n  return (\n    <button onClick={handleExecuteMission} className="btn-execute">\n      Ejecutar Misión React\n    </button>\n  );\n};\n`;
  }
  // javascript
  if (!rawJs) return '';
  return `// --- CÓDIGO JAVASCRIPT (ES6+ Web) ---\nimport { CodyRobot } from './CodyRobot.js';\n\nconst bot = new CodyRobot();\n\nasync function executeMission() {\n${rawJs.split('\n').map(l => '  ' + l).join('\n')}}\n\nexecuteMission();\n`;
};

export const CodeDrawer: React.FC = () => {
  const { generatedCode, activeTrack, codeOutput } = useGameStore();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'console'>('code');

  const formattedCode = formatCodeForTrack(activeTrack, generatedCode.python, generatedCode.javascript);

  const handleCopy = () => {
    if (!formattedCode) return;
    navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const trackBadgeInfo: Record<TrackType, { name: string; color: string }> = {
    python: { name: '🐍 Módulo Python', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
    javascript: { name: '⚡ Módulo JavaScript', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
    django: { name: '🎸 Módulo Django (Backend)', color: 'bg-green-500/20 text-green-400 border-green-500/40' },
    react: { name: '⚛️ Módulo React (Frontend)', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
  };

  const currentBadge = trackBadgeInfo[activeTrack] || trackBadgeInfo.python;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-full min-h-[200px] shadow-xl">
      {/* Header Tabs */}
      <div className="px-4 py-2 bg-slate-800/90 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'code'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 size={14} />
            Código Generado
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'console'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal size={14} />
            Consola ({codeOutput.length})
          </button>
        </div>

        {activeTab === 'code' && (
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded border text-[11px] font-bold ${currentBadge.color}`}>
              {currentBadge.name}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-700/50 transition-all"
              title="Copiar código"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed bg-slate-950 text-slate-200">
        {activeTab === 'code' ? (
          formattedCode ? (
            <pre className="whitespace-pre-wrap text-emerald-400">{formattedCode}</pre>
          ) : (
            <span className="text-slate-500 italic">
              // Conecta bloques en el panel superior para ver el código en tiempo real...
            </span>
          )
        ) : (
          <div className="space-y-1">
            {codeOutput.length === 0 ? (
              <span className="text-slate-500 italic">&gt; Consola lista. Presiona &apos;Ejecutar&apos; para ver registros.</span>
            ) : (
              codeOutput.map((log, idx) => (
                <div key={idx} className="text-cyan-300 font-mono flex items-start gap-2">
                  <span className="text-slate-600 font-bold">&gt;</span>
                  <span>{log}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
