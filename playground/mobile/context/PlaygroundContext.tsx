import React, { createContext, useContext, useState } from 'react';
import { aureaLightTheme, aureaDarkTheme } from '../theme';
import type { AureaTheme } from '../theme';

type Mode = 'light' | 'dark';

const THEMES: Record<Mode, AureaTheme> = {
  light: aureaLightTheme,
  dark: aureaDarkTheme,
};

type PlaygroundContextType = {
  mode: Mode;
  theme: AureaTheme;
  setMode: (mode: Mode) => void;
};

const PlaygroundContext = createContext<PlaygroundContextType | null>(null);

export function PlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>('light');

  const theme = THEMES[mode];

  const setMode = (newMode: Mode) => setModeState(newMode);

  return (
    <PlaygroundContext.Provider value={{ mode, theme, setMode }}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground(): PlaygroundContextType {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error('usePlayground deve ser usado dentro de PlaygroundProvider');
  return ctx;
}
