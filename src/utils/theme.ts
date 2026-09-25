import type { TrackType } from '../types/game';

export interface TrackTheme {
  name: string;
  primary: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  panelBg: string;
  panelHeaderBg: string;
  panelBorder: string;
  buttonGrad: string;
  headerGrad: string;
  canvasBg: string;
  workspaceBgHex: string;
  toolboxBgHex: string;
  modalBg: string;
  modalBorder: string;
  modalGlow1: string;
  modalGlow2: string;
  accentBoxBg: string;
  accentBoxBorder: string;
  iconColor: string;
  robotGrad: [string, string, string];
  robotEyeColor: string;
  robotAuraColor: string;
}

export const TRACK_THEMES: Record<TrackType, TrackTheme> = {
  python: {
    name: 'Python',
    primary: '#3776AB',
    badgeBg: 'bg-[#3776AB]/20',
    badgeBorder: 'border-[#3776AB]/40',
    badgeText: 'text-[#60A5FA]',
    panelBg: 'bg-[#09101E]',
    panelHeaderBg: 'bg-[#0E192E]',
    panelBorder: 'border-[#3776AB]/50',
    buttonGrad: 'from-[#3776AB] to-[#2563EB] hover:from-[#60A5FA] hover:to-[#3776AB] text-white font-bold',
    headerGrad: 'from-blue-400 via-sky-400 to-indigo-400',
    canvasBg: '#09101E',
    workspaceBgHex: '#09101E',
    toolboxBgHex: '#09101E',
    modalBg: 'bg-[#09101E]',
    modalBorder: 'border-[#3776AB]/50',
    modalGlow1: 'bg-[#3776AB]/20',
    modalGlow2: 'bg-[#2563EB]/20',
    accentBoxBg: 'bg-[#3776AB]/10',
    accentBoxBorder: 'border-[#3776AB]/30',
    iconColor: 'text-[#60A5FA]',
    robotGrad: ['#60A5FA', '#3776AB', '#1D4ED8'],
    robotEyeColor: '#60A5FA',
    robotAuraColor: 'rgba(55, 118, 171, 0.6)',
  },
  javascript: {
    name: 'JavaScript',
    primary: '#F7DF1E',
    badgeBg: 'bg-[#F7DF1E]/20',
    badgeBorder: 'border-[#F7DF1E]/40',
    badgeText: 'text-[#F7DF1E]',
    panelBg: 'bg-[#141208]',
    panelHeaderBg: 'bg-[#1E1B0B]',
    panelBorder: 'border-[#F7DF1E]/50',
    buttonGrad: 'from-[#F7DF1E] to-[#EAB308] hover:from-[#FDE047] hover:to-[#F7DF1E] text-slate-950 font-bold',
    headerGrad: 'from-yellow-300 via-amber-400 to-yellow-500',
    canvasBg: '#121006',
    workspaceBgHex: '#141208',
    toolboxBgHex: '#141208',
    modalBg: 'bg-[#141208]',
    modalBorder: 'border-[#F7DF1E]/50',
    modalGlow1: 'bg-[#F7DF1E]/20',
    modalGlow2: 'bg-[#EAB308]/20',
    accentBoxBg: 'bg-[#F7DF1E]/10',
    accentBoxBorder: 'border-[#F7DF1E]/30',
    iconColor: 'text-[#F7DF1E]',
    robotGrad: ['#FDE047', '#F7DF1E', '#CA8A04'],
    robotEyeColor: '#FDE047',
    robotAuraColor: 'rgba(247, 223, 30, 0.6)',
  },
  django: {
    name: 'Django',
    primary: '#44B78B',
    badgeBg: 'bg-[#44B78B]/20',
    badgeBorder: 'border-[#44B78B]/40',
    badgeText: 'text-[#44B78B]',
    panelBg: 'bg-[#05140E]',
    panelHeaderBg: 'bg-[#082217]',
    panelBorder: 'border-[#44B78B]/50',
    buttonGrad: 'from-[#44B78B] to-[#10B981] hover:from-[#34D399] hover:to-[#44B78B] text-slate-950 font-bold',
    headerGrad: 'from-emerald-300 via-teal-400 to-green-400',
    canvasBg: '#05140E',
    workspaceBgHex: '#05140E',
    toolboxBgHex: '#05140E',
    modalBg: 'bg-[#05140E]',
    modalBorder: 'border-[#44B78B]/50',
    modalGlow1: 'bg-[#44B78B]/20',
    modalGlow2: 'bg-[#10B981]/20',
    accentBoxBg: 'bg-[#44B78B]/10',
    accentBoxBorder: 'border-[#44B78B]/30',
    iconColor: 'text-[#44B78B]',
    robotGrad: ['#6EE7B7', '#44B78B', '#047857'],
    robotEyeColor: '#34D399',
    robotAuraColor: 'rgba(68, 183, 139, 0.6)',
  },
  react: {
    name: 'React',
    primary: '#61DAFB',
    badgeBg: 'bg-[#61DAFB]/20',
    badgeBorder: 'border-[#61DAFB]/40',
    badgeText: 'text-[#61DAFB]',
    panelBg: 'bg-[#061320]',
    panelHeaderBg: 'bg-[#0A1F33]',
    panelBorder: 'border-[#61DAFB]/50',
    buttonGrad: 'from-[#61DAFB] to-[#0284C7] hover:from-[#38BDF8] hover:to-[#61DAFB] text-slate-950 font-bold',
    headerGrad: 'from-cyan-300 via-sky-400 to-blue-400',
    canvasBg: '#061320',
    workspaceBgHex: '#061320',
    toolboxBgHex: '#061320',
    modalBg: 'bg-[#061320]',
    modalBorder: 'border-[#61DAFB]/50',
    modalGlow1: 'bg-[#61DAFB]/20',
    modalGlow2: 'bg-[#0284C7]/20',
    accentBoxBg: 'bg-[#61DAFB]/10',
    accentBoxBorder: 'border-[#61DAFB]/30',
    iconColor: 'text-[#61DAFB]',
    robotGrad: ['#61DAFB', '#0284C7', '#0369A1'],
    robotEyeColor: '#61DAFB',
    robotAuraColor: 'rgba(97, 218, 251, 0.6)',
  }
};
