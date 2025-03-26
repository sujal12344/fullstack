// store/themeStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeName =
  | "forest"
  | "retro"
  | "ocean"
  | "blossom"
  | "midnight"
  | "sunshine"
  | "minimal"
  | "cosmic";

interface ThemeConfig {
  name: ThemeName;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardBackground: string;
  textColor: string;
  headingColor: string;
  buttonGradient: string;
  navbarBackground: string;
  borderRadius: string;
  boxShadow: string;
  fontFamily: string;
  buttonHoverEffect: string;
  cardHoverEffect: string;
  patternBackground?: string;
  // Add the missing properties
  transition: string;
  hoverEffect: string;
}

export const themes: Record<ThemeName, ThemeConfig> = {
  forest: {
    name: "forest",
    primaryColor: "#2D6A4F",
    secondaryColor: "#40916C",
    accentColor: "#95D5B2",
    backgroundColor: "#F8FAF7",
    cardBackground: "#ffffff",
    textColor: "#1B4332",
    headingColor: "#1B4332",
    buttonGradient: "linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)",
    navbarBackground: "#1B4332",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 12px rgba(29, 78, 44, 0.15)",
    fontFamily: '"Quicksand", sans-serif',
    buttonHoverEffect: "scale(1.03)",
    cardHoverEffect: "translateY(-5px)",
    patternBackground: "radial-gradient(#95D5B2 1px, transparent 1px)",
    // Added missing properties
    transition: "all 0.3s ease",
    hoverEffect: "scale(1.03)",
  },
  retro: {
    name: "retro",
    primaryColor: "#E76F51",
    secondaryColor: "#F4A261",
    accentColor: "#E9C46A",
    backgroundColor: "#FFF8E8",
    cardBackground: "#ffffff",
    textColor: "#264653",
    headingColor: "#2A9D8F",
    buttonGradient: "linear-gradient(135deg, #E76F51 0%, #F4A261 100%)",
    navbarBackground: "#264653",
    borderRadius: "0px",
    boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.2)",
    fontFamily: '"Space Mono", monospace',
    buttonHoverEffect: "translateY(-2px) translateX(2px)",
    cardHoverEffect: "rotate(1deg)",
    patternBackground:
      "repeating-linear-gradient(45deg, #f4a26122 0px, #f4a26122 2px, transparent 2px, transparent 8px)",
    // Added missing properties
    transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    hoverEffect: "translateY(-2px) translateX(2px)",
  },
  ocean: {
    name: "ocean",
    primaryColor: "#0077B6",
    secondaryColor: "#00B4D8",
    accentColor: "#90E0EF",
    backgroundColor: "#F6FEFF",
    cardBackground: "#ffffff",
    textColor: "#023E8A",
    headingColor: "#03045E",
    buttonGradient: "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)",
    navbarBackground: "#023E8A",
    borderRadius: "1rem",
    boxShadow: "0 6px 20px rgba(0, 180, 216, 0.15)",
    fontFamily: '"Montserrat", sans-serif',
    buttonHoverEffect: "scale(1.05)",
    cardHoverEffect: "translateY(-8px)",
    patternBackground:
      "linear-gradient(135deg, #90E0EF22 25%, transparent 25%, transparent 50%, #90E0EF22 50%, #90E0EF22 75%, transparent 75%, transparent)",
    // Added missing properties
    transition: "all 0.3s ease-in-out",
    hoverEffect: "scale(1.05)",
  },
  blossom: {
    name: "blossom",
    primaryColor: "#FF5C8D",
    secondaryColor: "#FF99AC",
    accentColor: "#FFCCD5",
    backgroundColor: "#FFF5F7",
    cardBackground: "#ffffff",
    textColor: "#590D22",
    headingColor: "#A4133C",
    buttonGradient: "linear-gradient(135deg, #FF5C8D 0%, #FF99AC 100%)",
    navbarBackground: "#A4133C",
    borderRadius: "1.25rem",
    boxShadow: "0 4px 15px rgba(255, 92, 141, 0.2)",
    fontFamily: '"Poppins", sans-serif',
    buttonHoverEffect: "scale(1.04) translateY(-2px)",
    cardHoverEffect: "scale(1.02)",
    patternBackground: "radial-gradient(#FFCCD5 1.5px, transparent 1.5px)",
    // Added missing properties
    transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
    hoverEffect: "scale(1.04) translateY(-2px)",
  },
  midnight: {
    name: "midnight",
    primaryColor: "#8B5CF6",
    secondaryColor: "#7C3AED",
    accentColor: "#C4B5FD",
    backgroundColor: "#111827",
    cardBackground: "#1F2937",
    textColor: "#E5E7EB",
    headingColor: "#F9FAFB",
    buttonGradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
    navbarBackground: "#0F172A",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
    fontFamily: '"Inter", sans-serif',
    buttonHoverEffect: "scale(1.05)",
    cardHoverEffect: "translateY(-5px)",
    patternBackground: "radial-gradient(#C4B5FD22 1px, transparent 1px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    hoverEffect: "scale(1.03)",
  },

  sunshine: {
    name: "sunshine",
    primaryColor: "#F59E0B",
    secondaryColor: "#FBBF24",
    accentColor: "#FDE68A",
    backgroundColor: "#FFFBEB",
    cardBackground: "#ffffff",
    textColor: "#78350F",
    headingColor: "#92400E",
    buttonGradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    navbarBackground: "#92400E",
    borderRadius: "0.75rem",
    boxShadow: "0 8px 16px rgba(245, 158, 11, 0.15)",
    fontFamily: '"Nunito", sans-serif',
    buttonHoverEffect: "scale(1.05) brightness(1.1)",
    cardHoverEffect: "translateY(-5px) rotate(1deg)",
    patternBackground:
      "linear-gradient(45deg, #FDE68A22 25%, transparent 25%, transparent 50%, #FDE68A22 50%, #FDE68A22 75%, transparent 75%, transparent)",
    transition: "all 0.3s ease",
    hoverEffect: "scale(1.03) brightness(1.05)",
  },

  minimal: {
    name: "minimal",
    primaryColor: "#374151",
    secondaryColor: "#4B5563",
    accentColor: "#9CA3AF",
    backgroundColor: "#F9FAFB",
    cardBackground: "#ffffff",
    textColor: "#1F2937",
    headingColor: "#111827",
    buttonGradient: "linear-gradient(to right, #374151, #4B5563)",
    navbarBackground: "#111827",
    borderRadius: "0.25rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    fontFamily: '"IBM Plex Sans", sans-serif',
    buttonHoverEffect: "translateY(-1px)",
    cardHoverEffect: "translateY(-2px)",
    patternBackground: "none",
    transition: "all 0.2s ease",
    hoverEffect: "translateY(-2px)",
  },

  cosmic: {
    name: "cosmic",
    primaryColor: "#6D28D9",
    secondaryColor: "#8B5CF6",
    accentColor: "#DDD6FE",
    backgroundColor: "#0F172A",
    cardBackground: "#1E293B",
    textColor: "#E2E8F0",
    headingColor: "#F8FAFC",
    buttonGradient: "linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)",
    navbarBackground: "#0F172A",
    borderRadius: "1rem",
    boxShadow: "0 8px 20px rgba(124, 58, 237, 0.3)",
    fontFamily: '"Space Grotesk", sans-serif',
    buttonHoverEffect: "scale(1.05) translateY(-3px)",
    cardHoverEffect: "scale(1.03) rotate(0.5deg)",
    patternBackground:
      "radial-gradient(circle at 50% 50%, #8B5CF630 0%, transparent 25%, transparent 100%)",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    hoverEffect: "scale(1.02) translateY(-3px)",
  },
};

interface ThemeStore {
  currentTheme: ThemeConfig;
  setTheme: (theme: ThemeName) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      currentTheme: themes.forest,
      setTheme: (themeName: ThemeName) =>
        set({ currentTheme: themes[themeName] }),
    }),
    {
      name: "theme-storage",
    }
  )
);
