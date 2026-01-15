"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type BackgroundContextType = {
  background: string;
  setBackground: (value: string) => void;
  setWhiteBackground: () => void;
  resetBackground: () => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [background, setBackground] = useState<string>("/blueprint.jpg");

  const setWhiteBackground = () => setBackground("bg-white");
  const resetBackground = () => setBackground("/blueprint.jpg");

  return (
    <BackgroundContext.Provider
      value={{
        background,
        setBackground,
        setWhiteBackground,
        resetBackground,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within BackgroundProvider");
  }
  return context;
}
