// components/layout/Navbar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeStore, themes, ThemeName } from "../../store/themeStore";
import { useCart } from "../../hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { currentTheme, setTheme } = useThemeStore();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  // Add refs for the menus
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const themeTriggerRef = useRef<HTMLButtonElement>(null);

  const themeOptions: ThemeName[] = [
    "forest",
    "retro",
    "ocean",
    "blossom",
    "midnight",
    "sunshine",
    "minimal",
    "cosmic",
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Cart", href: "/cart" },
    { name: "Checkout", href: "/checkout" },
  ];

  // Handle clicks outside the menus
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close mobile menu when clicking outside
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }

      // Close theme menu when clicking outside, but not when clicking the trigger button
      if (
        isThemeMenuOpen &&
        themeMenuRef.current &&
        !themeMenuRef.current.contains(event.target as Node) &&
        !themeTriggerRef.current?.contains(event.target as Node)
      ) {
        setIsThemeMenuOpen(false);
      }
    }

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isThemeMenuOpen]);

  return (
    <nav
      className="sticky top-0 z-50 w-full transition-colors duration-200"
      style={{ backgroundColor: currentTheme.navbarBackground }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter transition-transform hover:scale-105"
            style={{ color: currentTheme.accentColor }}
          >
            EcoShop
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group"
                  style={{
                    color:
                      pathname === link.href
                        ? currentTheme.accentColor
                        : "white",
                  }}
                >
                  {link.name}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 ease-out group-hover:w-full"
                    style={{ backgroundColor: currentTheme.accentColor }}
                  ></span>
                </Link>
              ))}
            </div>

            {/* Theme switcher */}
            <div className="relative">
              <button
                ref={themeTriggerRef}
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center p-2 rounded-lg transition-all hover:opacity-80"
                style={{ backgroundColor: `${currentTheme.primaryColor}40` }}
              >
                <span className="text-white mr-2">Theme</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 3v12"></path>
                  <path d="m8 11 4 4 4-4"></path>
                  <path d="M8 5H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"></path>
                </svg>
              </button>

              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    ref={themeMenuRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden z-50"
                    style={{
                      backgroundColor: currentTheme.cardBackground,
                      boxShadow: currentTheme.boxShadow,
                    }}
                  >
                    {themeOptions.map((themeName) => (
                      <button
                        key={themeName}
                        onClick={() => {
                          setTheme(themeName);
                          setIsThemeMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-left transition-colors hover:opacity-80"
                        style={{
                          color:
                            currentTheme.name === themeName
                              ? themes[themeName].primaryColor
                              : currentTheme.textColor,
                          fontWeight:
                            currentTheme.name === themeName ? "bold" : "normal",
                          backgroundColor:
                            currentTheme.name === themeName
                              ? `${themes[themeName].accentColor}20`
                              : "transparent",
                        }}
                      >
                        <div
                          className="w-4 h-4 mr-3 rounded-full"
                          style={{
                            backgroundColor: themes[themeName].primaryColor,
                          }}
                        />
                        {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart with counter */}
            <Link href="/cart" className="relative">
              <div
                className="p-2 rounded-full transition-transform hover:scale-110"
                style={{ backgroundColor: `${currentTheme.primaryColor}40` }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              {totalItems > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full"
                  style={{
                    backgroundColor: currentTheme.accentColor,
                    color: currentTheme.headingColor,
                  }}
                >
                  {totalItems}
                </motion.div>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-2"
                    style={{
                      color:
                        pathname === link.href
                          ? currentTheme.accentColor
                          : "white",
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="py-2">
                  <p className="text-white mb-2">Themes</p>
                  <div className="flex flex-wrap gap-2">
                    {themeOptions.map((themeName) => (
                      <button
                        key={themeName}
                        onClick={() => setTheme(themeName)}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: themes[themeName].primaryColor,
                          color: "white",
                          opacity: currentTheme.name === themeName ? 1 : 0.7,
                        }}
                      >
                        {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
