"use client";

import Link from "next/link";
import { useTheme } from "./theme/ThemeContext";

export default function LandingPage() {
  const { theme } = useTheme();

  // Define custom CSS classes with theme variables
  const buttonPrimary = {
    backgroundColor: "var(--primary-color)",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "var(--border-radius)",
    fontWeight: 600,
    transition: `all var(--transition-duration) var(--transition-timing)`,
  };

  const buttonSecondary = {
    backgroundColor: "transparent",
    color: "var(--primary-color)",
    border: "2px solid var(--primary-color)",
    padding: "0.75rem 1.5rem",
    borderRadius: "var(--border-radius)",
    fontWeight: 600,
    transition: `all var(--transition-duration) var(--transition-timing)`,
  };

  const card = {
    backgroundColor: "white",
    borderRadius: "var(--border-radius)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    padding: "var(--spacing-medium)",
    transition: `all var(--transition-duration) var(--transition-timing)`,
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-family)",
        color: "var(--text-color)",
        backgroundColor: "var(--background-color)",
      }}
    >
      {/* Navigation */}
      <nav
        className="border-b border-gray-200"
        style={{ backgroundColor: "white" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                Brand
              </span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <a
                  href="#features"
                  className="hover:text-opacity-75"
                  style={{ color: "var(--text-color)" }}
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="hover:text-opacity-75"
                  style={{ color: "var(--text-color)" }}
                >
                  Testimonials
                </a>
                <a
                  href="#pricing"
                  className="hover:text-opacity-75"
                  style={{ color: "var(--text-color)" }}
                >
                  Pricing
                </a>
                <a
                  href="#contact"
                  className="hover:text-opacity-75"
                  style={{ color: "var(--text-color)" }}
                >
                  Contact
                </a>

                <Link
                  href="/customize"
                  className="ml-4 hover:opacity-90 text-white px-4 py-2"
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    borderRadius: "var(--border-radius)",
                  }}
                >
                  Customize Site
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="py-20"
        style={{
          background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
          padding: "var(--spacing-large) 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            style={{
              fontSize: "calc(var(--font-size-xxl) * 2)",
              color: "white",
              marginBottom: "var(--spacing-medium)",
            }}
          >
            Build Beautiful Websites
          </h1>
          <p
            style={{
              fontSize: "var(--font-size-large)",
              color: "white",
              opacity: 0.9,
              marginBottom: "var(--spacing-medium)",
              maxWidth: "800px",
              margin: "0 auto var(--spacing-medium) auto",
            }}
          >
            This template includes a complete theme customization system. Change
            colors, typography, spacing, and effects using the customize page.
          </p>
          <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4">
            <Link
              href="#features"
              className="hover-effect"
              style={buttonPrimary}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `scale(var(--hover-scale))`;
                e.currentTarget.style.filter = `brightness(var(--hover-brightness))`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "brightness(100%)";
              }}
            >
              Get Started
            </Link>
            <Link
              href="/customize"
              style={buttonSecondary}
              className="hover-effect"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Customize Theme
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: "var(--spacing-large) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              style={{
                fontSize: "var(--font-size-xxl)",
                color: "var(--heading-color)",
                marginBottom: "var(--spacing-small)",
              }}
            >
              Powerful Features
            </h2>
            <p
              style={{
                fontSize: "var(--font-size-large)",
                color: "var(--text-color)",
                opacity: 0.8,
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              This template comes with a comprehensive theming system that
              allows you to customize every aspect of your site
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Color Customization",
                description:
                  "Change primary, secondary, and accent colors to match your brand",
                icon: "🎨",
              },
              {
                title: "Typography Control",
                description:
                  "Adjust font families and sizes throughout your site",
                icon: "📝",
              },
              {
                title: "Layout & Spacing",
                description: "Fine-tune border radius and spacing variables",
                icon: "📏",
              },
              {
                title: "Animation Effects",
                description:
                  "Customize hover effects, transitions, and animations",
                icon: "✨",
              },
              {
                title: "Persistent Settings",
                description: "Your theme settings are saved in localStorage",
                icon: "💾",
              },
              {
                title: "Real-time Preview",
                description: "See your changes instantly as you make them",
                icon: "👁️",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="hover-effect"
                style={{
                  ...card,
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `translateY(-5px)`;
                  e.currentTarget.style.boxShadow =
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "var(--spacing-small)",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "var(--font-size-large)",
                    color: "var(--heading-color)",
                    marginBottom: "var(--spacing-small)",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--text-color)",
                    opacity: 0.8,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theme Demo Section */}
      <section
        style={{
          padding: "var(--spacing-large) 0",
          backgroundColor: "var(--accent-color)",
          color: "var(--text-color)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              style={{
                fontSize: "var(--font-size-xxl)",
                color: "var(--heading-color)",
                marginBottom: "var(--spacing-small)",
              }}
            >
              Theme Showcase
            </h2>
            <p
              style={{
                fontSize: "var(--font-size-large)",
                opacity: 0.8,
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              See how different elements are styled based on your theme settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div style={card}>
              <h3
                style={{
                  fontSize: "var(--font-size-xl)",
                  color: "var(--heading-color)",
                  marginBottom: "var(--spacing-small)",
                }}
              >
                Typography
              </h3>
              <div style={{ marginBottom: "var(--spacing-medium)" }}>
                <h4
                  style={{
                    fontSize: "var(--font-size-large)",
                    color: "var(--heading-color)",
                    marginBottom: "var(--spacing-small)",
                  }}
                >
                  Headings and Text
                </h4>
                <p
                  style={{
                    fontSize: "var(--font-size-base)",
                    marginBottom: "var(--spacing-small)",
                  }}
                >
                  This is a paragraph with the base font size. Your content
                  should be easy to read and properly spaced.
                </p>
                <p style={{ fontSize: "var(--font-size-small)", opacity: 0.8 }}>
                  This is smaller text, typically used for captions or auxiliary
                  information.
                </p>
              </div>
            </div>

            <div style={card}>
              <h3
                style={{
                  fontSize: "var(--font-size-xl)",
                  color: "var(--heading-color)",
                  marginBottom: "var(--spacing-small)",
                }}
              >
                Colors
              </h3>
              <div
                className="grid grid-cols-2 gap-4"
                style={{ marginBottom: "var(--spacing-medium)" }}
              >
                <div
                  className="flex items-center justify-center p-4 text-white"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    borderRadius: "var(--border-radius)",
                  }}
                >
                  Primary
                </div>
                <div
                  className="flex items-center justify-center p-4 text-white"
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    borderRadius: "var(--border-radius)",
                  }}
                >
                  Secondary
                </div>
                <div
                  className="flex items-center justify-center p-4 col-span-2"
                  style={{
                    backgroundColor: "var(--accent-color)",
                    borderRadius: "var(--border-radius)",
                  }}
                >
                  Accent
                </div>
              </div>
            </div>

            <div style={card}>
              <h3
                style={{
                  fontSize: "var(--font-size-xl)",
                  color: "var(--heading-color)",
                  marginBottom: "var(--spacing-small)",
                }}
              >
                Buttons
              </h3>
              <div className="flex flex-wrap gap-4">
                <button
                  className="hover-effect"
                  style={{
                    ...buttonPrimary,
                    fontSize: "var(--font-size-base)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `scale(var(--hover-scale))`;
                    e.currentTarget.style.filter = `brightness(var(--hover-brightness))`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "brightness(100%)";
                  }}
                >
                  Primary Button
                </button>

                <button
                  className="hover-effect"
                  style={{
                    ...buttonSecondary,
                    fontSize: "var(--font-size-base)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(var(--primary-color-rgb), 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Secondary Button
                </button>

                <button
                  style={{
                    backgroundColor: "var(--accent-color)",
                    color: "var(--text-color)",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "var(--border-radius)",
                    fontSize: "var(--font-size-base)",
                    fontWeight: 600,
                    transition: `all var(--transition-duration) var(--transition-timing)`,
                  }}
                >
                  Accent Button
                </button>
              </div>
            </div>

            <div style={card}>
              <h3
                style={{
                  fontSize: "var(--font-size-xl)",
                  color: "var(--heading-color)",
                  marginBottom: "var(--spacing-small)",
                }}
              >
                Cards & Borders
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  style={{
                    padding: "var(--spacing-small)",
                    borderRadius: "var(--border-radius)",
                    border: "1px solid var(--primary-color)",
                    textAlign: "center",
                  }}
                >
                  Card with Primary Border
                </div>
                <div
                  style={{
                    padding: "var(--spacing-small)",
                    borderRadius: "var(--border-radius)",
                    border: "1px solid var(--secondary-color)",
                    textAlign: "center",
                  }}
                >
                  Card with Secondary Border
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        style={{
          padding: "var(--spacing-large) 0",
          background: `linear-gradient(135deg, var(--secondary-color), var(--primary-color))`,
          color: "white",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            style={{
              fontSize: "var(--font-size-xxl)",
              marginBottom: "var(--spacing-small)",
            }}
          >
            Ready to Customize?
          </h2>
          <p
            style={{
              fontSize: "var(--font-size-large)",
              opacity: 0.9,
              maxWidth: "800px",
              margin: "0 auto var(--spacing-medium) auto",
            }}
          >
            Click the button below to access the theme customization page and
            make this template your own
          </p>
          <Link
            href="/customize"
            className="inline-block hover-effect"
            style={{
              ...buttonPrimary,
              backgroundColor: "white",
              color: "var(--primary-color)",
              fontSize: "var(--font-size-large)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `scale(var(--hover-scale))`;
              e.currentTarget.style.filter = `brightness(var(--hover-brightness))`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.filter = "brightness(100%)";
            }}
          >
            Open Customization Panel
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#1a202c",
          color: "white",
          padding: "var(--spacing-medium) 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <span className="text-2xl font-bold" style={{ color: "white" }}>
                Brand
              </span>
              <p className="mt-2 text-sm opacity-70">
                A fully customizable Next.js template.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm opacity-70">
                © 2025 YourCompany. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
