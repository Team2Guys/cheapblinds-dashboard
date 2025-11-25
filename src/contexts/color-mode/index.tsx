// src/contexts/color-mode.tsx
import React, { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material"; // MUI ThemeProvider
import { RefineThemes } from "@refinedev/mui";

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({} as ColorModeContextType);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia("(prefers-color-scheme: dark)").matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(colorModeFromLocalStorage || systemPreference);

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ThemeProvider
        // Yellow / YellowDark instead of Blue / BlueDark
        theme={mode === "light" ? RefineThemes.Yellow : RefineThemes.YellowDark}
      >
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
