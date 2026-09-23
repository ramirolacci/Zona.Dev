import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
import type { Direction, LevelConfig, Position, TileType, LevelItem } from '../../types/game';
import { useGameStore } from '../../store/useGameStore';

export interface ActionStep {
  type: 'MOVE' | 'TURN_LEFT' | 'TURN_RIGHT' | 'BUILD_BRIDGE' | 'COLLECT';
  blockId: string;
  fromPos: Position;
  toPos: Position;
  direction: Direction;
  mapState: TileType[][];
  itemsState: LevelItem[];
  logMsg?: string;
}

export class CodeRunner {
  private level: LevelConfig;
  private currentPos: Position;
  private currentDir: Direction;
  private mapState: TileType[][];
  private itemsState: LevelItem[];
  private actionQueue: ActionStep[] = [];
  
  constructor(level: LevelConfig) {
    this.level = level;
    this.currentPos = { ...level.startPos };
    this.currentDir = level.startDirection;
    // Deep clone map & items
    this.mapState = level.map.map(row => [...row]);
    this.itemsState = level.items ? level.items.map(it => ({ ...it, collected: false })) : [];
  }

  private getNextPosition(pos: Position, dir: Direction): Position {
    switch (dir) {
      case 'NORTH': return { x: pos.x, y: pos.y - 1 };
      case 'EAST':  return { x: pos.x + 1, y: pos.y };
      case 'SOUTH': return { x: pos.x, y: pos.y + 1 };
      case 'WEST':  return { x: pos.x - 1, y: pos.y };
    }
  }

  private turnLeftDir(dir: Direction): Direction {
    switch (dir) {
      case 'NORTH': return 'WEST';
      case 'WEST':  return 'SOUTH';
      case 'SOUTH': return 'EAST';
      case 'EAST':  return 'NORTH';
    }
  }

  private turnRightDir(dir: Direction): Direction {
    switch (dir) {
      case 'NORTH': return 'EAST';
      case 'EAST':  return 'SOUTH';
      case 'SOUTH': return 'WEST';
      case 'WEST':  return 'NORTH';
    }
  }

  public async simulate(workspace: Blockly.WorkspaceSvg): Promise<{
    success: boolean;
    errorMsg?: string;
    actions: ActionStep[];
    blockCount: number;
  }> {
    const blocks = workspace.getAllBlocks(false);
    const blockCount = blocks.length;

    // Generate code string for state preview
    try {
      const jsCode = javascriptGenerator.workspaceToCode(workspace);
      const pyCode = pythonGenerator.workspaceToCode(workspace);
      useGameStore.getState().setGeneratedCode({ javascript: jsCode, python: pyCode });
    } catch (e) {
      console.warn("Error generating preview code", e);
    }

    this.actionQueue = [];
    let isTerminated = false;
    let failureReason: string | undefined = undefined;

    // Context object injected into JS execution sandbox
    const sandboxContext = {
      moveForward: async (blockId: string) => {
        if (isTerminated) return;
        const nextPos = this.getNextPosition(this.currentPos, this.currentDir);
        
        // Bounds check
        if (
          nextPos.y < 0 || nextPos.y >= this.mapState.length ||
          nextPos.x < 0 || nextPos.x >= this.mapState[0].length
        ) {
          isTerminated = true;
          failureReason = "¡Cuidado! Te has salido del área de juego.";
          return;
        }

        const targetTile = this.mapState[nextPos.y][nextPos.x];

        if (targetTile === 'WALL') {
          isTerminated = true;
          failureReason = "¡Oops! Te has chocado contra una pared.";
          return;
        }

        if (targetTile === 'RIVER') {
          isTerminated = true;
          failureReason = "¡Oh no! Te has caído al agua. Debes construir un puente primero.";
          return;
        }

        // Valid move
        const from = { ...this.currentPos };
        this.currentPos = nextPos;
        this.actionQueue.push({
          type: 'MOVE',
          blockId,
          fromPos: from,
          toPos: { ...this.currentPos },
          direction: this.currentDir,
          mapState: this.mapState.map(r => [...r]),
          itemsState: this.itemsState.map(i => ({ ...i })),
          logMsg: `Avanzó a (${nextPos.x}, ${nextPos.y})`
        });
      },

      turnLeft: async (blockId: string) => {
        if (isTerminated) return;
        this.currentDir = this.turnLeftDir(this.currentDir);
        this.actionQueue.push({
          type: 'TURN_LEFT',
          blockId,
          fromPos: { ...this.currentPos },
          toPos: { ...this.currentPos },
          direction: this.currentDir,
          mapState: this.mapState.map(r => [...r]),
          itemsState: this.itemsState.map(i => ({ ...i })),
          logMsg: `Giró a la izquierda (Mirando al ${this.currentDir})`
        });
      },

      turnRight: async (blockId: string) => {
        if (isTerminated) return;
        this.currentDir = this.turnRightDir(this.currentDir);
        this.actionQueue.push({
          type: 'TURN_RIGHT',
          blockId,
          fromPos: { ...this.currentPos },
          toPos: { ...this.currentPos },
          direction: this.currentDir,
          mapState: this.mapState.map(r => [...r]),
          itemsState: this.itemsState.map(i => ({ ...i })),
          logMsg: `Giró a la derecha (Mirando al ${this.currentDir})`
        });
      },

      buildBridge: async (blockId: string) => {
        if (isTerminated) return;
        const aheadPos = this.getNextPosition(this.currentPos, this.currentDir);
        
        if (
          aheadPos.y >= 0 && aheadPos.y < this.mapState.length &&
          aheadPos.x >= 0 && aheadPos.x < this.mapState[0].length
        ) {
          if (this.mapState[aheadPos.y][aheadPos.x] === 'RIVER') {
            this.mapState[aheadPos.y][aheadPos.x] = 'BRIDGE';
            this.actionQueue.push({
              type: 'BUILD_BRIDGE',
              blockId,
              fromPos: { ...this.currentPos },
              toPos: { ...this.currentPos },
              direction: this.currentDir,
              mapState: this.mapState.map(r => [...r]),
              itemsState: this.itemsState.map(i => ({ ...i })),
              logMsg: `¡Construyó un puente en (${aheadPos.x}, ${aheadPos.y})!`
            });
            return;
          }
        }
        
        this.actionQueue.push({
          type: 'BUILD_BRIDGE',
          blockId,
          fromPos: { ...this.currentPos },
          toPos: { ...this.currentPos },
          direction: this.currentDir,
          mapState: this.mapState.map(r => [...r]),
          itemsState: this.itemsState.map(i => ({ ...i })),
          logMsg: `Construyó un puente (No había agua)`
        });
      },

      collectItem: async (blockId: string) => {
        if (isTerminated) return;
        const targetItem = this.itemsState.find(
          it => !it.collected && it.x === this.currentPos.x && it.y === this.currentPos.y
        );

        if (targetItem) {
          targetItem.collected = true;
          this.actionQueue.push({
            type: 'COLLECT',
            blockId,
            fromPos: { ...this.currentPos },
            toPos: { ...this.currentPos },
            direction: this.currentDir,
            mapState: this.mapState.map(r => [...r]),
            itemsState: this.itemsState.map(i => ({ ...i })),
            logMsg: `¡Recogió ${targetItem.type === 'SHEEP' ? 'a la oveja' : 'el cristal'}!`
          });
        } else {
          this.actionQueue.push({
            type: 'COLLECT',
            blockId,
            fromPos: { ...this.currentPos },
            toPos: { ...this.currentPos },
            direction: this.currentDir,
            mapState: this.mapState.map(r => [...r]),
            itemsState: this.itemsState.map(i => ({ ...i })),
            logMsg: `Intentó recoger pero no había objetos aquí`
          });
        }
      },

      isRiverAhead: async (_blockId: string): Promise<boolean> => {
        const aheadPos = this.getNextPosition(this.currentPos, this.currentDir);
        if (
          aheadPos.y >= 0 && aheadPos.y < this.mapState.length &&
          aheadPos.x >= 0 && aheadPos.x < this.mapState[0].length
        ) {
          return this.mapState[aheadPos.y][aheadPos.x] === 'RIVER';
        }
        return false;
      }
    };

    // Synchronously execute generated JS in sandbox
    const jsCode = javascriptGenerator.workspaceToCode(workspace);

    if (!jsCode.trim()) {
      return {
        success: false,
        errorMsg: "¡El panel de programación está vacío! Arrastra bloques para darle órdenes al bot.",
        actions: [],
        blockCount: 0
      };
    }

    try {
      const runnerFn = new Function(
        'moveForward', 'turnLeft', 'turnRight', 'buildBridge', 'collectItem', 'isRiverAhead',
        `return (async () => { ${jsCode} })();`
      );

      // Await code execution completely before checking final state
      await runnerFn(
        sandboxContext.moveForward,
        sandboxContext.turnLeft,
        sandboxContext.turnRight,
        sandboxContext.buildBridge,
        sandboxContext.collectItem,
        sandboxContext.isRiverAhead
      );
    } catch (e: any) {
      return {
        success: false,
        errorMsg: `Error de ejecución: ${e.message || e}`,
        actions: this.actionQueue,
        blockCount
      };
    }

    if (failureReason) {
      return {
        success: false,
        errorMsg: failureReason,
        actions: this.actionQueue,
        blockCount
      };
    }

    // Check final position & item completion
    const reachedGoal = this.currentPos.x === this.level.goalPos.x && this.currentPos.y === this.level.goalPos.y;
    const uncollectedItems = this.itemsState.filter(it => !it.collected);

    if (!reachedGoal) {
      return {
        success: false,
        errorMsg: "El programa terminó, pero el personaje no llegó a la bandera de meta.",
        actions: this.actionQueue,
        blockCount
      };
    }

    if (uncollectedItems.length > 0) {
      return {
        success: false,
        errorMsg: "¡Llegaste a la meta pero olvidaste rescatar a las ovejas / cristales!",
        actions: this.actionQueue,
        blockCount
      };
    }

    return {
      success: true,
      actions: this.actionQueue,
      blockCount
    };
  }
}
