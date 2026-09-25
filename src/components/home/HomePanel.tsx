import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import type { TrackType } from '../../types/game';
import { Code2, Zap, Server, Atom, ArrowRight, Sparkles, BookOpen, Bot } from 'lucide-react';
import gsap from 'gsap';

interface ModuleTrack {
  id: TrackType;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  borderColor: string;
  textColor: string;
  buttonGradient: string;
  levelsCount: number;
}

const MODULES: ModuleTrack[] = [
  {
    id: 'python',
    title: 'Python',
    badge: 'Fundamentos de Lógica',
    tagline: 'Sintaxis limpia y algoritmos',
    description: 'Aprende la base del pensamiento computacional: secuencias, variables, estructuras condicionales y bucles en Python.',
    icon: Code2,
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    textColor: 'text-emerald-400',
    buttonGradient: 'from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950',
    levelsCount: 10
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    badge: 'Web Interactiva',
    tagline: 'Lógica cliente y tiempo real',
    description: 'Domina la programación del navegador, funciones asíncronas, manipulación interactiva y eventos dinámicos con JS.',
    icon: Zap,
    gradient: 'from-amber-500/10 via-yellow-500/5 to-transparent',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    textColor: 'text-amber-400',
    buttonGradient: 'from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950',
    levelsCount: 10
  },
  {
    id: 'django',
    title: 'Django',
    badge: 'Framework Backend',
    tagline: 'Servidores, Rutas y APIs',
    description: 'Explora la lógica de servidores con Python: construcción de vistas, controladores de respuesta, endpoints y arquitectura web.',
    icon: Server,
    gradient: 'from-green-600/10 via-emerald-600/5 to-transparent',
    borderColor: 'border-green-500/40 hover:border-green-400',
    textColor: 'text-green-400',
    buttonGradient: 'from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-slate-950',
    levelsCount: 10
  },
  {
    id: 'react',
    title: 'React',
    badge: 'Framework Frontend',
    tagline: 'Componentes y Estado',
    description: 'Aprende la arquitectura reactiva del desarrollo moderno: declaración de componentes, estado dinámico y renderizado de UI.',
    icon: Atom,
    gradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    textColor: 'text-cyan-400',
    buttonGradient: 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950',
    levelsCount: 10
  }
];

export const HomePanel: React.FC = () => {
  const { setActiveTrack, userProgress } = useGameStore();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.module-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }
  }, []);

  // Total completed levels calculation across progress
  const totalCompleted = Object.values(userProgress).filter(p => p.completed).length;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-6xl mx-auto w-full overflow-y-auto">
      {/* Hero Welcome Header */}
      <div className="text-center mb-8 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-3 shadow-lg shadow-cyan-500/10 animate-pulse">
          <Sparkles size={14} />
          <span>Plataforma de Entrenamiento Gamificado</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mb-2 tracking-tight">
          SELECCIONA TU MÓDULO
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          Elige la tecnología que deseas aprender hoy. Cada módulo cuenta con sus propios retos pedagógicos, simulaciones y generación de código adaptado.
        </p>

        {/* Status Pills */}
        <div className="flex items-center justify-center gap-4 mt-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
            <Bot size={16} className="text-cyan-400" />
            <span>Mentor: <strong className="text-slate-200">Cody</strong></span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
            <BookOpen size={16} className="text-amber-400" />
            <span>Completados: <strong className="text-amber-400">{totalCompleted} Niveles</strong></span>
          </div>
        </div>
      </div>

      {/* 2x2 Modules Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
        {MODULES.map(module => {
          const IconComponent = module.icon;

          return (
            <div
              key={module.id}
              onClick={() => setActiveTrack(module.id)}
              className={`module-card bg-slate-900/90 bg-gradient-to-br ${module.gradient} border ${module.borderColor} rounded-3xl p-6 shadow-2xl relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group flex flex-col justify-between`}
            >
              {/* Background Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

              <div>
                {/* Top Row: Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-slate-950 border ${module.borderColor} flex items-center justify-center ${module.textColor} shadow-lg shadow-slate-950/50 group-hover:scale-110 transition-all`}>
                    <IconComponent size={28} />
                  </div>
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-lg bg-slate-950/80 border ${module.borderColor} ${module.textColor}`}>
                    {module.badge}
                  </span>
                </div>

                {/* Module Title & Tagline */}
                <h2 className="text-2xl font-black text-slate-100 mb-1 flex items-center gap-2">
                  {module.title}
                </h2>
                <p className={`text-xs font-bold ${module.textColor} mb-3`}>
                  {module.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-medium mb-6">
                  {module.description}
                </p>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  {module.levelsCount} Misiones de Aprendizaje
                </span>

                <button
                  className={`px-5 py-2.5 bg-gradient-to-r ${module.buttonGradient} font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition-all group-hover:px-6 active:scale-95`}
                >
                  <span>Iniciar {module.title}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
