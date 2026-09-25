import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import type { ActionStep } from '../../core/interpreter/CodeRunner';
import type { Direction, Position, TileType, LevelItem } from '../../types/game';
import confetti from 'canvas-confetti';
import { MissionChecklist } from '../ui/MissionChecklist';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    currentLevel,
    speed,
    setCurrentBlockId,
    setExecutionState,
    setSuccess,
    addLog,
    recordLevelCompletion,
    setVictoryModalOpen
  } = useGameStore();

  // Internal Animated State
  const [playerPos, setPlayerPos] = useState<Position>({ ...currentLevel.startPos });
  const [playerDir, setPlayerDir] = useState<Direction>(currentLevel.startDirection);
  const [mapState, setMapState] = useState<TileType[][]>(currentLevel.map.map(r => [...r]));
  const [itemsState, setItemsState] = useState<LevelItem[]>(
    currentLevel.items ? currentLevel.items.map(i => ({ ...i, collected: false })) : []
  );

  // Animation Refs
  const animRef = useRef<number | null>(null);
  const stepIndexRef = useRef<number>(0);
  const actionsRef = useRef<ActionStep[]>([]);
  const isExecutingRef = useRef<boolean>(false);

  // Reset local state whenever level changes
  useEffect(() => {
    setPlayerPos({ ...currentLevel.startPos });
    setPlayerDir(currentLevel.startDirection);
    setMapState(currentLevel.map.map(r => [...r]));
    setItemsState(currentLevel.items ? currentLevel.items.map(i => ({ ...i, collected: false })) : []);
    stepIndexRef.current = 0;
    actionsRef.current = [];
    isExecutingRef.current = false;
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, [currentLevel.id]);

  // Main Canvas Render Function
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: gridW, height: gridH } = currentLevel.gridSize;
    const canvasW = canvas.width;
    const canvasH = canvas.height;

    // Calculate tile size and centering offset
    const tileSize = Math.min((canvasW - 40) / gridW, (canvasH - 40) / gridH);
    if (tileSize <= 0 || canvasW <= 0 || canvasH <= 0) return;

    const offsetX = (canvasW - tileSize * gridW) / 2;
    const offsetY = (canvasH - tileSize * gridH) / 2;

    // Clear Background
    ctx.fillStyle = '#0F172A'; // Dark Slate Blue
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Draw Board Tiles
    for (let r = 0; r < gridH; r++) {
      for (let c = 0; c < gridW; c++) {
        const x = offsetX + c * tileSize;
        const y = offsetY + r * tileSize;
        const tileType = mapState[r] ? mapState[r][c] : 'EMPTY';

        // Base Tile background
        if (tileType === 'WALL') {
          ctx.fillStyle = '#334155';
          ctx.fillRect(x, y, tileSize, tileSize);
          // Wall border 3D effect
          ctx.fillStyle = '#1E293B';
          ctx.fillRect(x, y + tileSize - 6, tileSize, 6);
          ctx.fillStyle = '#475569';
          ctx.fillRect(x + 2, y + 2, tileSize - 4, 4);
        } else if (tileType === 'RIVER') {
          ctx.fillStyle = '#0284C7'; // River Water Blue
          ctx.fillRect(x, y, tileSize, tileSize);
          // Water Ripple Effect
          ctx.strokeStyle = '#38BDF8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          const waveOffset = (Date.now() / 300) % (tileSize / 2);
          ctx.arc(x + tileSize / 2, y + tileSize / 2, waveOffset + 4, 0, Math.PI * 2);
          ctx.stroke();
        } else if (tileType === 'BRIDGE') {
          // Water background
          ctx.fillStyle = '#0284C7';
          ctx.fillRect(x, y, tileSize, tileSize);
          // Wooden Bridge Planks
          ctx.fillStyle = '#B45309';
          ctx.fillRect(x + 4, y + 4, tileSize - 8, tileSize - 8);
          ctx.fillStyle = '#78350F';
          ctx.lineWidth = 2;
          for (let p = 1; p < 4; p++) {
            ctx.beginPath();
            ctx.moveTo(x + 4, y + (tileSize / 4) * p);
            ctx.lineTo(x + tileSize - 4, y + (tileSize / 4) * p);
            ctx.stroke();
          }
        } else {
          // Grass Grid
          const isEven = (r + c) % 2 === 0;
          ctx.fillStyle = isEven ? '#1E293B' : '#0F172A';
          ctx.fillRect(x, y, tileSize, tileSize);
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, tileSize, tileSize);
        }

        // Draw Goal Flag
        if (currentLevel.goalPos.x === c && currentLevel.goalPos.y === r) {
          ctx.fillStyle = '#EF4444'; // Red Flag
          ctx.beginPath();
          ctx.moveTo(x + tileSize * 0.3, y + tileSize * 0.2);
          ctx.lineTo(x + tileSize * 0.8, y + tileSize * 0.35);
          ctx.lineTo(x + tileSize * 0.3, y + tileSize * 0.5);
          ctx.fill();

          // Flag Pole
          ctx.fillStyle = '#F8FAFC';
          ctx.fillRect(x + tileSize * 0.3 - 2, y + tileSize * 0.2, 4, tileSize * 0.65);
          ctx.beginPath();
          ctx.arc(x + tileSize * 0.3, y + tileSize * 0.2, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();
        }
      }
    }

    // Draw Collectible Items
    itemsState.forEach(item => {
      if (item.collected) return;
      const x = offsetX + item.x * tileSize + tileSize / 2;
      const y = offsetY + item.y * tileSize + tileSize / 2;

      if (item.type === 'SHEEP') {
        // Draw Cute Sheep 🐑
        ctx.fillStyle = '#F8FAFC';
        ctx.beginPath();
        ctx.arc(x, y - 2, tileSize * 0.28, 0, Math.PI * 2);
        ctx.fill();
        // Sheep head
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.arc(x + tileSize * 0.15, y - 4, tileSize * 0.12, 0, Math.PI * 2);
        ctx.fill();
        // Eyes
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x + tileSize * 0.18, y - 6, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (item.type === 'CRYSTAL') {
        // Draw Emerald Crystal 💎
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.moveTo(x, y - tileSize * 0.3);
        ctx.lineTo(x + tileSize * 0.22, y);
        ctx.lineTo(x, y + tileSize * 0.3);
        ctx.lineTo(x - tileSize * 0.22, y);
        ctx.closePath();
        ctx.fill();
        // Crystal inner shine
        ctx.fillStyle = '#6EE7B7';
        ctx.beginPath();
        ctx.moveTo(x, y - tileSize * 0.22);
        ctx.lineTo(x + tileSize * 0.1, y);
        ctx.lineTo(x, y + tileSize * 0.22);
        ctx.closePath();
        ctx.fill();
      }
    });

    // Draw Player Bot 🤖
    const px = offsetX + playerPos.x * tileSize + tileSize / 2;
    const py = offsetY + playerPos.y * tileSize + tileSize / 2;
    const radius = tileSize * 0.32;

    // Glowing Halo
    const gradient = ctx.createRadialGradient(px, py, radius * 0.5, px, py, radius * 1.4);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(px, py, radius * 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Robot Body
    ctx.fillStyle = '#3B82F6';
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#60A5FA';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Eye / Direction Arrow Pointer
    ctx.fillStyle = '#FFFFFF';
    let eyeX = px;
    let eyeY = py;
    switch (playerDir) {
      case 'NORTH': eyeY -= radius * 0.4; break;
      case 'EAST':  eyeX += radius * 0.4; break;
      case 'SOUTH': eyeY += radius * 0.4; break;
      case 'WEST':  eyeX -= radius * 0.4; break;
    }

    ctx.beginPath();
    ctx.arc(eyeX, eyeY, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, radius * 0.15, 0, Math.PI * 2);
    ctx.fill();
  };

  // Canvas Resize Listener
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
        renderCanvas();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef, currentLevel, playerPos, playerDir, mapState, itemsState]);

  // Re-render canvas when animated state updates
  useEffect(() => {
    renderCanvas();
  }, [playerPos, playerDir, mapState, itemsState]);

  // Trigger Action Execution Animation Loop
  const triggerActionQueue = (actions: ActionStep[], totalBlocks: number) => {
    actionsRef.current = actions;
    stepIndexRef.current = 0;
    isExecutingRef.current = true;
    setExecutionState('RUNNING');

    const executeNextStep = () => {
      if (stepIndexRef.current >= actionsRef.current.length) {
        // Completed all actions successfully
        isExecutingRef.current = false;
        setExecutionState('SUCCESS');
        setCurrentBlockId(null);
        
        // Stars calculation
        let stars = 1;
        if (totalBlocks <= currentLevel.maxBlocks) {
          stars = 3;
        } else if (totalBlocks <= currentLevel.maxBlocks + 2) {
          stars = 2;
        }

        recordLevelCompletion(currentLevel.id, stars, totalBlocks);
        setSuccess("¡Excelente trabajo! Has completado el nivel con éxito.");

        // Confetti celebration
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}

        setTimeout(() => {
          setVictoryModalOpen(true);
        }, 600);
        return;
      }

      const step = actionsRef.current[stepIndexRef.current];
      setCurrentBlockId(step.blockId);
      setPlayerPos({ ...step.toPos });
      setPlayerDir(step.direction);
      setMapState(step.mapState.map(r => [...r]));
      setItemsState(step.itemsState.map(i => ({ ...i })));

      if (step.logMsg) {
        addLog(step.logMsg);
      }

      stepIndexRef.current++;

      // Speed delay
      const currentSpeed = useGameStore.getState().speed;
      const delayMs = 600 / currentSpeed;

      setTimeout(() => {
        if (useGameStore.getState().executionState === 'RUNNING') {
          executeNextStep();
        }
      }, delayMs);
    };

    executeNextStep();
  };

  // Expose step execution globally via custom window dispatcher for controls
  useEffect(() => {
    (window as any).__runActionQueue = triggerActionQueue;
  }, [currentLevel]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[350px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Concept Badge */}
      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/50 text-xs font-semibold text-cyan-400 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        <span>{currentLevel.conceptName}</span>
      </div>

      {/* Speed Indicator */}
      <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/50 text-xs font-medium text-slate-300">
        Velocidad: <span className="text-amber-400 font-bold">{speed}x</span>
      </div>
      {/* Mission Checklist Overlay */}
      <MissionChecklist />
    </div>
  );
};
