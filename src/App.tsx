import React from 'react';
import { useGameStore } from './store/useGameStore';
import { Header } from './components/ui/Header';
import { HomePanel } from './components/home/HomePanel';
import { GameCanvas } from './components/game/GameCanvas';
import { BlocklyWorkspace } from './components/editor/BlocklyWorkspace';
import { CodeDrawer } from './components/editor/CodeDrawer';
import { Controls } from './components/ui/Controls';
import { VictoryModal } from './components/modals/VictoryModal';
import { WorldMapModal } from './components/modals/WorldMapModal';
import { HintModal } from './components/modals/HintModal';
import { LevelIntroModal } from './components/modals/LevelIntroModal';

export const App: React.FC = () => {
  const { currentView } = useGameStore();

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Header Bar */}
      <Header />

      {/* Main Content: Home Menu vs Game Workspace */}
      {currentView === 'home' ? (
        <HomePanel />
      ) : (
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-hidden min-h-0">
          {/* Left Column: Game Canvas & Execution Controls */}
          <section className="lg:col-span-5 flex flex-col gap-3 h-full min-h-0">
            <div className="flex-1 min-h-[300px]">
              <GameCanvas />
            </div>
            <Controls />
          </section>

          {/* Right Column: Blockly Workspace & Real Code / Console Drawer */}
          <section className="lg:col-span-7 flex flex-col gap-3 h-full min-h-0">
            <div className="flex-[3] min-h-[300px]">
              <BlocklyWorkspace />
            </div>
            <div className="flex-[2] min-h-[160px]">
              <CodeDrawer />
            </div>
          </section>
        </main>
      )}

      {/* Modals (Active in Game View) */}
      {currentView === 'game' && (
        <>
          <LevelIntroModal />
          <VictoryModal />
          <WorldMapModal />
          <HintModal />
        </>
      )}
    </div>
  );
};

export default App;
