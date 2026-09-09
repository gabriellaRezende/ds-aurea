import React, { createContext, useContext, useState } from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';

type Product = 'helios' | 'uranus';
type Mode = 'light' | 'dark';
type ThemeName = 'heliosLight' | 'heliosDark' | 'uranusLight' | 'uranusDark';

function buildThemeName(product: Product, mode: Mode): ThemeName {
  return `${product}${mode === 'light' ? 'Light' : 'Dark'}` as ThemeName;
}

type PlaygroundContextType = {
  product: Product;
  mode: Mode;
  setProduct: (product: Product) => void;
  setMode: (mode: Mode) => void;
};

const PlaygroundContext = createContext<PlaygroundContextType | null>(null);

export function PlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [product, setProductState] = useState<Product>('helios');
  const [mode, setModeState] = useState<Mode>('light');

  const setProduct = (newProduct: Product) => {
    setProductState(newProduct);
    UnistylesRuntime.setTheme(buildThemeName(newProduct, mode));
  };

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    UnistylesRuntime.setTheme(buildThemeName(product, newMode));
  };

  return (
    <PlaygroundContext.Provider value={{ product, mode, setProduct, setMode }}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground(): PlaygroundContextType {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error('usePlayground deve ser usado dentro de PlaygroundProvider');
  return ctx;
}
