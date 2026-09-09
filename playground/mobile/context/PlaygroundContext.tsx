import React, { createContext, useContext, useState } from 'react';
import {
  heliosLightTheme,
  heliosDarkTheme,
  uranusLightTheme,
  uranusDarkTheme,
} from '../theme';
import type { AureaTheme } from '../theme';

type Product = 'helios' | 'uranus';
type Mode = 'light' | 'dark';

const THEMES: Record<Product, Record<Mode, AureaTheme>> = {
  helios: { light: heliosLightTheme, dark: heliosDarkTheme },
  uranus: { light: uranusLightTheme, dark: uranusDarkTheme },
};

type PlaygroundContextType = {
  product: Product;
  mode: Mode;
  theme: AureaTheme;
  setProduct: (product: Product) => void;
  setMode: (mode: Mode) => void;
};

const PlaygroundContext = createContext<PlaygroundContextType | null>(null);

export function PlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [product, setProductState] = useState<Product>('helios');
  const [mode, setModeState] = useState<Mode>('light');

  const theme = THEMES[product][mode];

  const setProduct = (newProduct: Product) => setProductState(newProduct);
  const setMode = (newMode: Mode) => setModeState(newMode);

  return (
    <PlaygroundContext.Provider value={{ product, mode, theme, setProduct, setMode }}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground(): PlaygroundContextType {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error('usePlayground deve ser usado dentro de PlaygroundProvider');
  return ctx;
}
