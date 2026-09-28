import { create } from 'zustand';
import type { LevelConfig, UserLevelProgress, TrackType } from '../types/game';
import { LEVELS, getLevelsForTrack } from '../data/levels';

export type ExecutionState = 'IDLE' | 'RUNNING' | 'PAUSED' | 'SUCCESS' | 'FAILED';

interface GameState {
  // Navigation & Track Views
  currentView: 'home' | 'game';
  activeTrack: TrackType;

  // Current active level
  currentLevelId: number;
  currentLevel: LevelConfig;
  
  // Execution Control
  executionState: ExecutionState;
  speed: number; // 1, 2, 4
  currentBlockId: string | null;
  errorMessage: string | null;
  successMessage: string | null;
  codeOutput: string[];
  
  // Code Preview Drawer
  selectedLanguage: 'javascript' | 'python';
  generatedCode: { javascript: string; python: string };
  
  // Progress
  userProgress: Record<number, UserLevelProgress>;
  soundEnabled: boolean;
  
  // Modal Views
  isWorldMapOpen: boolean;
  isVictoryModalOpen: boolean;
  isHintOpen: boolean;
  isLevelIntroOpen: boolean;
  
  // Actions
  setCurrentView: (view: 'home' | 'game') => void;
  setActiveTrack: (track: TrackType) => void;
  setLevel: (levelId: number) => void;
  nextLevel: () => void;
  setExecutionState: (state: ExecutionState) => void;
  setSpeed: (speed: number) => void;
  setCurrentBlockId: (blockId: string | null) => void;
  setError: (msg: string | null) => void;
  setSuccess: (msg: string | null) => void;
  addLog: (log: string) => void;
  clearLogs: () => void;
  setGeneratedCode: (code: { javascript: string; python: string }) => void;
  setSelectedLanguage: (lang: 'javascript' | 'python') => void;
  toggleSound: () => void;
  setWorldMapOpen: (open: boolean) => void;
  setVictoryModalOpen: (open: boolean) => void;
  setHintOpen: (open: boolean) => void;
  setLevelIntroOpen: (open: boolean) => void;
  recordLevelCompletion: (levelId: number, stars: number, blockCount: number) => void;
  resetCurrentLevel: () => void;
}

const LOCAL_STORAGE_PROGRESS_KEY = 'codecraft_user_progress_v1';

const loadProgressFromStorage = (): Record<number, UserLevelProgress> => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_PROGRESS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load progress from localStorage", e);
  }
  return {
    1: { levelId: 1, completed: false, stars: 0, bestBlockCount: 0 },
    101: { levelId: 101, completed: false, stars: 0, bestBlockCount: 0 },
    201: { levelId: 201, completed: false, stars: 0, bestBlockCount: 0 },
    301: { levelId: 301, completed: false, stars: 0, bestBlockCount: 0 }
  };
};

export const useGameStore = create<GameState>((set, get) => ({
  currentView: 'home',
  activeTrack: 'python',

  currentLevelId: 1,
  currentLevel: LEVELS[0],
  
  executionState: 'IDLE',
  speed: 1,
  currentBlockId: null,
  errorMessage: null,
  successMessage: null,
  codeOutput: [],
  
  selectedLanguage: 'python',
  generatedCode: { javascript: '', python: '' },
  
  userProgress: loadProgressFromStorage(),
  soundEnabled: true,
  
  isWorldMapOpen: false,
  isVictoryModalOpen: false,
  isHintOpen: false,
  isLevelIntroOpen: true,
  
  setCurrentView: (currentView) => set({ currentView }),
  setActiveTrack: (track) => {
    const lang = (track === 'javascript' || track === 'react') ? 'javascript' : 'python';
    const trackLevels = getLevelsForTrack(track);
    const firstLevel = trackLevels[0];
    set({
      activeTrack: track,
      currentView: 'game',
      selectedLanguage: lang,
      currentLevelId: firstLevel.id,
      currentLevel: firstLevel,
      executionState: 'IDLE',
      currentBlockId: null,
      errorMessage: null,
      successMessage: null,
      codeOutput: [],
      isLevelIntroOpen: true
    });
  },
  
  setLevel: (levelId: number) => {
    const trackLevels = getLevelsForTrack(get().activeTrack);
    const target = trackLevels.find(l => l.id === levelId) || trackLevels[0];
    set({
      currentLevelId: target.id,
      currentLevel: target,
      executionState: 'IDLE',
      currentBlockId: null,
      errorMessage: null,
      successMessage: null,
      codeOutput: [],
      isVictoryModalOpen: false,
      isLevelIntroOpen: true, // Automatically open tutorial dialogue
    });
  },
  
  nextLevel: () => {
    const { currentLevelId, activeTrack } = get();
    const trackLevels = getLevelsForTrack(activeTrack);
    const currentIndex = trackLevels.findIndex(l => l.id === currentLevelId);
    if (currentIndex !== -1 && currentIndex + 1 < trackLevels.length) {
      const nextLevelObj = trackLevels[currentIndex + 1];
      get().setLevel(nextLevelObj.id);
    } else {
      set({ isWorldMapOpen: true, isVictoryModalOpen: false });
    }
  },
  
  setExecutionState: (state) => set({ executionState: state }),
  setSpeed: (speed) => set({ speed }),
  setCurrentBlockId: (currentBlockId) => set({ currentBlockId }),
  setError: (errorMessage) => set({ errorMessage, executionState: errorMessage ? 'FAILED' : get().executionState }),
  setSuccess: (successMessage) => set({ successMessage }),
  
  addLog: (log) => set((state) => ({ codeOutput: [...state.codeOutput, log] })),
  clearLogs: () => set({ codeOutput: [] }),
  
  setGeneratedCode: (generatedCode) => set({ generatedCode }),
  setSelectedLanguage: (selectedLanguage) => set({ selectedLanguage }),
  
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setWorldMapOpen: (isWorldMapOpen) => set({ isWorldMapOpen }),
  setVictoryModalOpen: (isVictoryModalOpen) => set({ isVictoryModalOpen }),
  setHintOpen: (isHintOpen) => set({ isHintOpen }),
  setLevelIntroOpen: (isLevelIntroOpen) => set({ isLevelIntroOpen }),
  
  recordLevelCompletion: (levelId: number, stars: number, blockCount: number) => {
    const { userProgress, activeTrack } = get();
    const existing = userProgress[levelId];
    const newStars = existing ? Math.max(existing.stars, stars) : stars;
    const newBest = existing && existing.bestBlockCount > 0 
      ? Math.min(existing.bestBlockCount, blockCount) 
      : blockCount;
      
    const trackLevels = getLevelsForTrack(activeTrack);
    const currentIndex = trackLevels.findIndex(l => l.id === levelId);
    const nextLevelObj = currentIndex !== -1 ? trackLevels[currentIndex + 1] : null;

    const updatedProgress: Record<number, UserLevelProgress> = {
      ...userProgress,
      [levelId]: {
        levelId,
        completed: true,
        stars: newStars,
        bestBlockCount: newBest
      }
    };

    if (nextLevelObj) {
      updatedProgress[nextLevelObj.id] = userProgress[nextLevelObj.id] || {
        levelId: nextLevelObj.id,
        completed: false,
        stars: 0,
        bestBlockCount: 0
      };
    }
    
    try {
      localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(updatedProgress));
    } catch (e) {
      console.error("Failed to save progress", e);
    }
    
    set({ userProgress: updatedProgress });
  },
  
  resetCurrentLevel: () => {
    set({
      executionState: 'IDLE',
      currentBlockId: null,
      errorMessage: null,
      successMessage: null,
      codeOutput: []
    });
  }
}));
