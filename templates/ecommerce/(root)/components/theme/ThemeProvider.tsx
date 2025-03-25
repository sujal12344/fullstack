// components/theme/ThemeProvider.tsx
"use client";

import { useThemeStore } from "../../store/themeStore";
import { ReactNode, useEffect } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    const style = root.style;

    style.setProperty(
      "--primary-color",
      currentTheme.primaryColor || "#000000"
    );
    style.setProperty(
      "--secondary-color",
      currentTheme.secondaryColor || "#000000"
    );
    style.setProperty("--accent-color", currentTheme.accentColor || "#000000");
    style.setProperty(
      "--background-color",
      currentTheme.backgroundColor || "#ffffff"
    );
    style.setProperty(
      "--card-background",
      currentTheme.cardBackground || "#ffffff"
    );
    style.setProperty("--text-color", currentTheme.textColor || "#000000");
    style.setProperty(
      "--heading-color",
      currentTheme.headingColor || "#000000"
    );
    style.setProperty(
      "--button-gradient",
      currentTheme.buttonGradient || "none"
    );
    style.setProperty(
      "--navbar-background",
      currentTheme.navbarBackground || "#000000"
    );
    style.setProperty("--border-radius", currentTheme.borderRadius || "0");
    style.setProperty("--box-shadow", currentTheme.boxShadow || "none");
    style.setProperty(
      "--pattern-background",
      currentTheme.patternBackground || "none"
    );

    // Apply font-family
    document.body.style.fontFamily = currentTheme.fontFamily || "sans-serif";

    // Add Google Fonts
    const fontLinks = [
      "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
    ];

    fontLinks.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, [currentTheme]);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: currentTheme.backgroundColor || "#ffffff",
        color: currentTheme.textColor || "#000000",
      }}
    >
      {/* Apply pattern as a separate element to avoid CSS issues */}
      {currentTheme.patternBackground && (
        <div
          className="fixed inset-0 pointer-events-none z-[-1]"
          style={{
            backgroundImage: currentTheme.patternBackground,
            backgroundSize: "20px 20px",
            opacity: 0.5,
          }}
        />
      )}
      {children}
    </div>
  );
};
