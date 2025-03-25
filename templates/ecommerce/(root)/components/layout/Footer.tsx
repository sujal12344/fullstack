// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { useThemeStore } from "../../store/themeStore";
import { motion } from "framer-motion";
import React from "react";

export default function Footer() {
  const { currentTheme } = useThemeStore();

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const categoryLinks = [
    { name: "Electronics", href: "#" },
    { name: "Clothing", href: "#" },
    { name: "Home & Garden", href: "#" },
    { name: "Beauty", href: "#" },
  ];

  const customerServiceLinks = [
    { name: "FAQ", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Track Orders", href: "#" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "#",
      icon: (
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
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
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
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "#",
      icon: (
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
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: "#",
      icon: (
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
        >
          <path d="M8 12a4 4 0 0 1 8 0c0 2.5-2 4-4 5-2-1-4-2.5-4-5"></path>
          <path d="M12 3v2"></path>
          <path d="M12 19v2"></path>
        </svg>
      ),
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: currentTheme.navbarBackground,
        color: "white",
        fontFamily: currentTheme.fontFamily,
      }}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter"
              style={{ color: currentTheme.accentColor }}
            >
              EcoShop
            </Link>
            <p className="mt-4 text-sm text-gray-300 max-w-xs">
              Discover sustainable and high-quality products with our unique
              themed shopping experience.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: `${currentTheme.primaryColor}40`,
                    color: currentTheme.accentColor,
                  }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: currentTheme.accentColor }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {mainLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span
                      className="mr-2 text-xs"
                      style={{ color: currentTheme.accentColor }}
                    >
                      ›
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: currentTheme.accentColor }}
            >
              Categories
            </h3>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span
                      className="mr-2 text-xs"
                      style={{ color: currentTheme.accentColor }}
                    >
                      ›
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: currentTheme.accentColor }}
            >
              Stay Updated
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 text-sm  bg-opacity-10 rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderRadius: currentTheme.borderRadius,
                  boxShadow: `0 0 5px ${currentTheme.accentColor}`, // ✅ Valid CSS property
                }}
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-300"
                style={{
                  background: currentTheme.buttonGradient,
                  borderRadius: currentTheme.borderRadius,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = currentTheme.hoverEffect;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full my-8 opacity-30"
          style={{ backgroundColor: currentTheme.accentColor }}
        />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EcoShop. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            {customerServiceLinks.map((link, i) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </Link>
                {i < customerServiceLinks.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Theme signature */}
        <div className="text-center mt-8 text-xs text-gray-500">
          <p>
            Currently using{" "}
            <span style={{ color: currentTheme.accentColor }}>
              {currentTheme.name.charAt(0).toUpperCase() +
                currentTheme.name.slice(1)}
            </span>{" "}
            theme
          </p>
        </div>
      </div>
    </footer>
  );
}
