"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

export interface ThemeOptions {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  borderRadius: string;
  fontSize: {
    small: string;
    base: string;
    large: string;
    xl: string;
    xxl: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  transition: {
    duration: string;
    timing: string;
  };
  hover: {
    scale: string;
    brightness: string;
  };
  fontFamily: string;
}

export const defaultTheme: ThemeOptions = {
  primaryColor: "#3182ce", // blue-600
  secondaryColor: "#4c1d95", // purple-900
  accentColor: "#e9d5ff", // purple-200
  backgroundColor: "#ffffff",
  textColor: "#1a202c", // gray-900
  headingColor: "#2d3748", // gray-800
  borderRadius: "0.375rem", // rounded-md
  fontSize: {
    small: "0.875rem", // text-sm
    base: "1rem", // text-base
    large: "1.125rem", // text-lg
    xl: "1.25rem", // text-xl
    xxl: "1.5rem", // text-2xl
  },
  spacing: {
    small: "1rem",
    medium: "2rem",
    large: "4rem",
  },
  transition: {
    duration: "300ms",
    timing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  hover: {
    scale: "1.05",
    brightness: "110%",
  },
  fontFamily: "system-ui, -apple-system, sans-serif",
};

interface ThemeContextProps {
  theme: ThemeOptions;
  updateTheme: (newTheme: Partial<ThemeOptions>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeOptions>(defaultTheme);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("site-theme");
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setTheme((current) => ({
          ...current,
          ...parsedTheme,
        }));
      } catch (e) {
        console.error("Failed to parse saved theme", e);
      }
    }
  }, []);

  // Update CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;

    // Basic colors
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--secondary-color", theme.secondaryColor);
    root.style.setProperty("--accent-color", theme.accentColor);
    root.style.setProperty("--background-color", theme.backgroundColor);
    root.style.setProperty("--text-color", theme.textColor);
    root.style.setProperty("--heading-color", theme.headingColor);

    // Typography
    root.style.setProperty("--font-family", theme.fontFamily);
    root.style.setProperty("--font-size-small", theme.fontSize.small);
    root.style.setProperty("--font-size-base", theme.fontSize.base);
    root.style.setProperty("--font-size-large", theme.fontSize.large);
    root.style.setProperty("--font-size-xl", theme.fontSize.xl);
    root.style.setProperty("--font-size-xxl", theme.fontSize.xxl);

    // Spacing
    root.style.setProperty("--spacing-small", theme.spacing.small);
    root.style.setProperty("--spacing-medium", theme.spacing.medium);
    root.style.setProperty("--spacing-large", theme.spacing.large);

    // Border radius
    root.style.setProperty("--border-radius", theme.borderRadius);

    // Transitions
    root.style.setProperty("--transition-duration", theme.transition.duration);
    root.style.setProperty("--transition-timing", theme.transition.timing);

    // Hover effects
    root.style.setProperty("--hover-scale", theme.hover.scale);
    root.style.setProperty("--hover-brightness", theme.hover.brightness);
  }, [theme]);

  const updateTheme = (newTheme: Partial<ThemeOptions>) => {
    const updatedTheme = { ...theme, ...newTheme };
    setTheme(updatedTheme);
    localStorage.setItem("site-theme", JSON.stringify(updatedTheme));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
    localStorage.removeItem("site-theme");
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
