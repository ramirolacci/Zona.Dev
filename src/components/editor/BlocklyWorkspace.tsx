import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
import { useGameStore } from '../../store/useGameStore';
import { initCustomBlocks, getToolboxForLevel } from '../../core/interpreter/BlocklyConfig';

export const BlocklyWorkspace: React.FC = () => {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  const {
    currentLevel,
    currentBlockId,
    setGeneratedCode,
    executionState
  } = useGameStore();

  useEffect(() => {
    initCustomBlocks();

    if (blocklyDivRef.current && !workspaceRef.current) {
      const toolbox = getToolboxForLevel(currentLevel.availableBlocks);

      const workspace = Blockly.inject(blocklyDivRef.current, {
        toolbox,
        scrollbars: true,
        trashcan: true,
        sounds: true,
        grid: {
          spacing: 20,
          length: 3,
          colour: '#334155',
          snap: true,
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 2.0,
          minScale: 0.7,
          scaleSpeed: 1.2,
        },
        theme: Blockly.Theme.defineTheme('customDark', {
          name: 'customDark',
          base: Blockly.Themes.Classic,
          componentStyles: {
            workspaceBackgroundColour: '#0F172A', // Slate 900
            toolboxBackgroundColour: '#1E293B', // Slate 800
            flyoutBackgroundColour: '#1E293B',
            flyoutOpacity: 0.95,
            scrollbarColour: '#475569',
            scrollbarOpacity: 0.6,
          }
        })
      });

      workspaceRef.current = workspace;

      // Update generated code on change
      const onChange = () => {
        try {
          const jsCode = javascriptGenerator.workspaceToCode(workspace);
          const pyCode = pythonGenerator.workspaceToCode(workspace);
          setGeneratedCode({ javascript: jsCode, python: pyCode });
        } catch (e) {
          console.warn("Code generator change error", e);
        }
      };

      workspace.addChangeListener(onChange);
      onChange();

      // Store global reference for CodeRunner
      (window as any).__blocklyWorkspace = workspace;
    }

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, []);

  // Update toolbox when level changes
  useEffect(() => {
    if (workspaceRef.current) {
      const toolbox = getToolboxForLevel(currentLevel.availableBlocks);
      workspaceRef.current.updateToolbox(toolbox);
      workspaceRef.current.clear();
      
      const jsCode = javascriptGenerator.workspaceToCode(workspaceRef.current);
      const pyCode = pythonGenerator.workspaceToCode(workspaceRef.current);
      setGeneratedCode({ javascript: jsCode, python: pyCode });
    }
  }, [currentLevel.id]);

  // Handle Block Execution Highlight
  useEffect(() => {
    if (workspaceRef.current) {
      if (currentBlockId) {
        workspaceRef.current.highlightBlock(currentBlockId);
      } else {
        workspaceRef.current.highlightBlock(null);
      }
    }
  }, [currentBlockId]);

  // Lock workspace during execution
  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.options.readOnly = executionState === 'RUNNING';
    }
  }, [executionState]);

  return (
    <div className="relative w-full h-full min-h-[350px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
      <div className="px-4 py-2.5 bg-slate-800/80 backdrop-blur-md border-b border-slate-700/60 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Área de Programación por Bloques
        </span>
        <span className="text-xs text-slate-400">
          Bloques sugeridos: <strong className="text-cyan-400">{currentLevel.maxBlocks}</strong>
        </span>
      </div>
      <div ref={blocklyDivRef} className="w-full flex-1" />
    </div>
  );
};
