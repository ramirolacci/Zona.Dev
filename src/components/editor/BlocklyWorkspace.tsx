import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
import { useGameStore } from '../../store/useGameStore';
import { initCustomBlocks, getToolboxForLevel } from '../../core/interpreter/BlocklyConfig';
import { TRACK_THEMES } from '../../utils/theme';

export const BlocklyWorkspace: React.FC = () => {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  const {
    currentLevel,
    activeTrack,
    currentBlockId,
    setGeneratedCode,
    executionState
  } = useGameStore();

  const theme = TRACK_THEMES[activeTrack] || TRACK_THEMES.python;

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
          colour: 'rgba(255, 255, 255, 0.08)',
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
        theme: Blockly.Theme.defineTheme(`theme_${activeTrack}`, {
          name: `theme_${activeTrack}`,
          base: Blockly.Themes.Classic,
          componentStyles: {
            workspaceBackgroundColour: theme.workspaceBgHex,
            toolboxBackgroundColour: theme.toolboxBgHex,
            flyoutBackgroundColour: theme.toolboxBgHex,
            flyoutOpacity: 1,
            scrollbarColour: 'rgba(255, 255, 255, 0.2)',
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
  }, [activeTrack]);

  // Update toolbox & clear workspace when level or track changes
  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.clear();
      const toolbox = getToolboxForLevel(currentLevel.availableBlocks);
      
      const newTheme = Blockly.Theme.defineTheme(`theme_${activeTrack}`, {
        name: `theme_${activeTrack}`,
        base: Blockly.Themes.Classic,
        componentStyles: {
          workspaceBackgroundColour: theme.workspaceBgHex,
          toolboxBackgroundColour: theme.toolboxBgHex,
          flyoutBackgroundColour: theme.toolboxBgHex,
          flyoutOpacity: 1,
          scrollbarColour: 'rgba(255, 255, 255, 0.2)',
          scrollbarOpacity: 0.6,
        }
      });
      workspaceRef.current.setTheme(newTheme);
      workspaceRef.current.updateToolbox(toolbox);
      
      const jsCode = javascriptGenerator.workspaceToCode(workspaceRef.current);
      const pyCode = pythonGenerator.workspaceToCode(workspaceRef.current);
      setGeneratedCode({ javascript: jsCode, python: pyCode });
    }
  }, [currentLevel.id, activeTrack]);

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
    <div
      className={`relative w-full h-full min-h-[350px] ${theme.panelBg} rounded-2xl overflow-hidden border ${theme.panelBorder} shadow-2xl transition-colors duration-500 flex flex-col`}
      style={{ '--blockly-toolbox-bg': theme.toolboxBgHex } as React.CSSProperties}
    >
      <div className={`px-4 py-2.5 ${theme.panelHeaderBg} backdrop-blur-md border-b ${theme.accentBoxBorder} flex items-center justify-between`}>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${theme.badgeBg} border ${theme.badgeBorder}`}></span>
          Área de Programación por Bloques
        </span>
        <span className="text-xs text-slate-400">
          Bloques sugeridos: <strong className={theme.badgeText}>{currentLevel.maxBlocks}</strong>
        </span>
      </div>
      <div ref={blocklyDivRef} className="w-full flex-1" />
    </div>
  );
};
