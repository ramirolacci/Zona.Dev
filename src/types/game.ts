export type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

export interface Position {
  x: number;
  y: number;
}

export type TileType = 
  | 'EMPTY' 
  | 'WALL' 
  | 'RIVER' 
  | 'BRIDGE' 
  | 'GOAL' 
  | 'ITEM' 
  | 'ICE';

export interface LevelItem {
  id: string;
  x: number;
  y: number;
  type: 'SHEEP' | 'CRYSTAL' | 'KEY' | 'STAR';
  collected?: boolean;
}

export interface LevelObjective {
  id: string;
  label: string;
  isCompleted?: boolean;
  isOptional?: boolean;
}

export interface LevelConfig {
  id: number;
  title: string;
  world: number;
  worldTitle: string;
  description: string;
  story: string; // Contexto narrativo pedagógico
  learningObjective: string; // Qué aprenderá el estudiante
  stepByStepGuide: string[]; // Instrucciones paso a paso
  objectives: LevelObjective[]; // Lista de objetivos
  gridSize: { width: number; height: number };
  startPos: Position;
  startDirection: Direction;
  map: TileType[][];
  items?: LevelItem[];
  goalPos: Position;
  maxBlocks: number;
  availableBlocks: string[]; // e.g. ['move_forward', 'turn_left', 'turn_right', 'build_bridge', 'collect', 'repeat_times', 'if_river']
  hint: string;
  conceptName: string; // e.g., "Secuencia", "Bucles", "Condicionales"
}

export type ActionType = 
  | 'MOVE_FORWARD' 
  | 'TURN_LEFT' 
  | 'TURN_RIGHT' 
  | 'BUILD_BRIDGE' 
  | 'COLLECT' 
  | 'WAIT';

export interface StepAction {
  type: ActionType;
  blockId?: string;
  payload?: any;
}

export interface ExecutionResult {
  success: boolean;
  message: string;
  actions: StepAction[];
}

export interface UserLevelProgress {
  levelId: number;
  completed: boolean;
  stars: number; // 0..3
  bestBlockCount: number;
}
