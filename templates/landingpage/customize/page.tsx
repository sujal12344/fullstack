"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme, ThemeOptions } from "../theme/ThemeContext";

export default function CustomizePage() {
  const { theme, updateTheme, resetTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<
    "colors" | "typography" | "layout" | "effects"
  >("colors");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        fontFamily: "var(--font-family)",
        color: "var(--text-color)",
        backgroundColor: "var(--background-color)",
      }}
    >
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold"
              style={{ color: "var(--primary-color)" }}
            >
              Site Customizer
            </Link>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={resetTheme}
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300"
              style={{
                borderRadius: "var(--border-radius)",
                transition: `var(--transition-duration) var(--transition-timing)`,
              }}
            >
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md text-white"
              style={{
                backgroundColor: "var(--primary-color)",
                borderRadius: "var(--border-radius)",
                transition: `var(--transition-duration) var(--transition-timing)`,
              }}
            >
              {saved ? "Saved!" : "Save Changes"}
            </button>
            <Link
              href="/"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              style={{
                borderRadius: "var(--border-radius)",
                transition: `var(--transition-duration) var(--transition-timing)`,
              }}
            >
              View Site
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("colors")}
                className={`px-4 py-3 text-center w-1/4 ${
                  activeTab === "colors"
                    ? "border-b-2 font-medium"
                    : "text-gray-500"
                }`}
                style={{
                  borderColor:
                    activeTab === "colors"
                      ? "var(--primary-color)"
                      : "transparent",
                }}
              >
                Colors
              </button>
              <button
                onClick={() => setActiveTab("typography")}
                className={`px-4 py-3 text-center w-1/4 ${
                  activeTab === "typography"
                    ? "border-b-2 font-medium"
                    : "text-gray-500"
                }`}
                style={{
                  borderColor:
                    activeTab === "typography"
                      ? "var(--primary-color)"
                      : "transparent",
                }}
              >
                Typography
              </button>
              <button
                onClick={() => setActiveTab("layout")}
                className={`px-4 py-3 text-center w-1/4 ${
                  activeTab === "layout"
                    ? "border-b-2 font-medium"
                    : "text-gray-500"
                }`}
                style={{
                  borderColor:
                    activeTab === "layout"
                      ? "var(--primary-color)"
                      : "transparent",
                }}
              >
                Layout & Spacing
              </button>
              <button
                onClick={() => setActiveTab("effects")}
                className={`px-4 py-3 text-center w-1/4 ${
                  activeTab === "effects"
                    ? "border-b-2 font-medium"
                    : "text-gray-500"
                }`}
                style={{
                  borderColor:
                    activeTab === "effects"
                      ? "var(--primary-color)"
                      : "transparent",
                }}
              >
                Effects
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "colors" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorSetting
                  label="Primary Color"
                  value={theme.primaryColor}
                  onChange={(value) => updateTheme({ primaryColor: value })}
                  description="Used for buttons, links, and primary actions"
                />
                <ColorSetting
                  label="Secondary Color"
                  value={theme.secondaryColor}
                  onChange={(value) => updateTheme({ secondaryColor: value })}
                  description="Used for secondary elements and accents"
                />
                <ColorSetting
                  label="Accent Color"
                  value={theme.accentColor}
                  onChange={(value) => updateTheme({ accentColor: value })}
                  description="Used for highlights and special elements"
                />
                <ColorSetting
                  label="Background Color"
                  value={theme.backgroundColor}
                  onChange={(value) => updateTheme({ backgroundColor: value })}
                  description="Main background color"
                />
                <ColorSetting
                  label="Text Color"
                  value={theme.textColor}
                  onChange={(value) => updateTheme({ textColor: value })}
                  description="Main text color throughout the site"
                />
                <ColorSetting
                  label="Heading Color"
                  value={theme.headingColor}
                  onChange={(value) => updateTheme({ headingColor: value })}
                  description="Color for headings and titles"
                />

                <div className="md:col-span-2 mt-4">
                  <h3 className="text-lg font-medium mb-4">Color Preview</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className="h-16 flex items-center justify-center text-white"
                      style={{
                        backgroundColor: theme.primaryColor,
                        borderRadius: "var(--border-radius)",
                      }}
                    >
                      Primary
                    </div>
                    <div
                      className="h-16 flex items-center justify-center text-white"
                      style={{
                        backgroundColor: theme.secondaryColor,
                        borderRadius: "var(--border-radius)",
                      }}
                    >
                      Secondary
                    </div>
                    <div
                      className="h-16 flex items-center justify-center"
                      style={{
                        backgroundColor: theme.accentColor,
                        borderRadius: "var(--border-radius)",
                      }}
                    >
                      Accent
                    </div>
                    <div
                      className="h-16 flex items-center justify-center col-span-3 border"
                      style={{
                        backgroundColor: theme.backgroundColor,
                        color: theme.textColor,
                        borderRadius: "var(--border-radius)",
                      }}
                    >
                      <div>
                        <h4 style={{ color: theme.headingColor }}>
                          Sample Heading
                        </h4>
                        <p>Sample text with background and text colors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "typography" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Font Family
                  </label>
                  <select
                    title="Font Family"
                    value={theme.fontFamily}
                    onChange={(e) =>
                      updateTheme({ fontFamily: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                    style={{ borderRadius: "var(--border-radius)" }}
                  >
                    <option value="system-ui, -apple-system, sans-serif">
                      System UI (Default)
                    </option>
                    <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">
                      Helvetica
                    </option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="'Courier New', monospace">
                      Courier New
                    </option>
                    <option value="'Arial', sans-serif">Arial</option>
                    <option value="'Verdana', sans-serif">Verdana</option>
                  </select>
                </div>

                <RangeSetting
                  label="Small Font Size"
                  value={parseFloat(theme.fontSize.small.replace("rem", ""))}
                  min={0.5}
                  max={2}
                  step={0.05}
                  onChange={(value) =>
                    updateTheme({
                      fontSize: { ...theme.fontSize, small: `${value}rem` },
                    })
                  }
                  unit="rem"
                  description="Used for small text and captions"
                />

                <RangeSetting
                  label="Base Font Size"
                  value={parseFloat(theme.fontSize.base.replace("rem", ""))}
                  min={0.75}
                  max={2}
                  step={0.05}
                  onChange={(value) =>
                    updateTheme({
                      fontSize: { ...theme.fontSize, base: `${value}rem` },
                    })
                  }
                  unit="rem"
                  description="Default text size throughout the site"
                />

                <RangeSetting
                  label="Large Font Size"
                  value={parseFloat(theme.fontSize.large.replace("rem", ""))}
                  min={1}
                  max={3}
                  step={0.05}
                  onChange={(value) =>
                    updateTheme({
                      fontSize: { ...theme.fontSize, large: `${value}rem` },
                    })
                  }
                  unit="rem"
                  description="Used for larger text elements"
                />

                <RangeSetting
                  label="XL Font Size"
                  value={parseFloat(theme.fontSize.xl.replace("rem", ""))}
                  min={1.25}
                  max={3.5}
                  step={0.05}
                  onChange={(value) =>
                    updateTheme({
                      fontSize: { ...theme.fontSize, xl: `${value}rem` },
                    })
                  }
                  unit="rem"
                  description="Used for subheadings"
                />

                <RangeSetting
                  label="XXL Font Size"
                  value={parseFloat(theme.fontSize.xxl.replace("rem", ""))}
                  min={1.5}
                  max={4}
                  step={0.05}
                  onChange={(value) =>
                    updateTheme({
                      fontSize: { ...theme.fontSize, xxl: `${value}rem` },
                    })
                  }
                  unit="rem"
                  description="Used for headings"
                />

                <div className="md:col-span-2 mt-4">
                  <h3 className="text-lg font-medium mb-4">
                    Typography Preview
                  </h3>
                  <div
                    className="p-4 border rounded-md"
                    style={{
                      fontFamily: theme.fontFamily,
                      borderRadius: "var(--border-radius)",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: theme.fontSize.xxl,
                        color: theme.headingColor,
                        marginBottom: "0.5rem",
                      }}
                    >
                      Heading 1 (XXL)
                    </h1>
                    <h2
                      style={{
                        fontSize: theme.fontSize.xl,
                        color: theme.headingColor,
                        marginBottom: "0.5rem",
                      }}
                    >
                      Heading 2 (XL)
                    </h2>
                    <p
                      style={{
                        fontSize: theme.fontSize.large,
                        marginBottom: "0.5rem",
                      }}
                    >
                      This is large text (Large)
                    </p>
                    <p
                      style={{
                        fontSize: theme.fontSize.base,
                        marginBottom: "0.5rem",
                      }}
                    >
                      This is regular text content (Base). It demonstrates the
                      base font size and how the text appears in normal
                      paragraphs.
                    </p>
                    <p style={{ fontSize: theme.fontSize.small }}>
                      This is small text often used in captions or footnotes
                      (Small).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "layout" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RangeSetting
                  label="Border Radius"
                  value={parseFloat(theme.borderRadius.replace("rem", ""))}
                  min={0}
                  max={2}
                  step={0.05}
                  onChange={(value) =>
                    updateTheme({ borderRadius: `${value}rem` })
                  }
                  unit="rem"
                  description="Roundness of corners in UI elements"
                />

                <RangeSetting
                  label="Small Spacing"
                  value={parseFloat(theme.spacing.small.replace("rem", ""))}
                  min={0.25}
                  max={2}
                  step={0.25}
                  onChange={(value) =>
                    updateTheme({
                      spacing: { ...theme.spacing, small: `${value}rem` },
                    })
                  }
                  unit="rem"
                  description="Used for tight spacing between elements"
                />

                <RangeSetting
                  label="Medium Spacing"
                  value={parseFloat(theme.spacing.medium.replace("rem", ""))}
                  min={1}
                  max={4}
                  step={0.25}
                  onChange={(value) =>
                    updateTheme({
                      spacing: { ...theme.spacing, medium: `${value}rem` },
                    })
                  }
                  unit="rem"
                  description="Used for standard spacing between sections"
                />

                <RangeSetting
                  label="Large Spacing"
                  value={parseFloat(theme.spacing.large.replace("rem", ""))}
                  min={2}
                  max={8}
                  step={0.5}
                  onChange={(value) =>
                    updateTheme({
                      spacing: { ...theme.spacing, large: `${value}rem` },
                    })
                  }
                  unit="rem"
                  description="Used for substantial spacing between major sections"
                />

                <div className="md:col-span-2 mt-4">
                  <h3 className="text-lg font-medium mb-4">Layout Preview</h3>
                  <div
                    className="border rounded-md overflow-hidden"
                    style={{ borderRadius: "var(--border-radius)" }}
                  >
                    <div className="p-4 bg-gray-200 flex flex-col items-center">
                      <div
                        className="w-full h-16 bg-blue-500 mb-4"
                        style={{
                          borderRadius: theme.borderRadius,
                          marginBottom: theme.spacing.small,
                        }}
                      />
                      <div
                        className="w-full h-16 bg-purple-500"
                        style={{
                          borderRadius: theme.borderRadius,
                          marginBottom: theme.spacing.medium,
                        }}
                      />
                      <div
                        className="flex w-full"
                        style={{ gap: theme.spacing.small }}
                      >
                        <div
                          className="h-16 bg-green-500 flex-1"
                          style={{ borderRadius: theme.borderRadius }}
                        />
                        <div
                          className="h-16 bg-yellow-500 flex-1"
                          style={{ borderRadius: theme.borderRadius }}
                        />
                      </div>
                    </div>
                    <div
                      className="p-4 bg-white"
                      style={{ padding: theme.spacing.medium }}
                    >
                      <p>This container uses medium spacing for padding.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "effects" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RangeSetting
                  label="Transition Duration"
                  value={parseInt(theme.transition.duration.replace("ms", ""))}
                  min={0}
                  max={1000}
                  step={50}
                  onChange={(value) =>
                    updateTheme({
                      transition: {
                        ...theme.transition,
                        duration: `${value}ms`,
                      },
                    })
                  }
                  unit="ms"
                  description="Duration of animations and transitions"
                />

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Transition Timing
                  </label>
                  <select
                    title="Transition Timing"
                    value={theme.transition.timing}
                    onChange={(e) =>
                      updateTheme({
                        transition: {
                          ...theme.transition,
                          timing: e.target.value,
                        },
                      })
                    }
                    className="w-full p-2 border rounded-md"
                    style={{ borderRadius: "var(--border-radius)" }}
                  >
                    <option value="cubic-bezier(0.4, 0, 0.2, 1)">
                      Ease (Default)
                    </option>
                    <option value="linear">Linear</option>
                    <option value="ease-in">Ease In</option>
                    <option value="ease-out">Ease Out</option>
                    <option value="ease-in-out">Ease In Out</option>
                    <option value="cubic-bezier(0.175, 0.885, 0.32, 1.275)">
                      Bounce
                    </option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    The timing function of animations
                  </p>
                </div>

                <RangeSetting
                  label="Hover Scale"
                  value={parseFloat(theme.hover.scale)}
                  min={1}
                  max={1.2}
                  step={0.01}
                  onChange={(value) =>
                    updateTheme({
                      hover: { ...theme.hover, scale: value.toString() },
                    })
                  }
                  description="How much elements grow on hover"
                />

                <RangeSetting
                  label="Hover Brightness"
                  value={parseInt(theme.hover.brightness.replace("%", ""))}
                  min={80}
                  max={150}
                  step={5}
                  onChange={(value) =>
                    updateTheme({
                      hover: { ...theme.hover, brightness: `${value}%` },
                    })
                  }
                  unit="%"
                  description="Brightness change on hover"
                />

                <div className="md:col-span-2 mt-4">
                  <h3 className="text-lg font-medium mb-4">Effects Preview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className="p-4 bg-white border rounded-md shadow-md text-center cursor-pointer hover-effect"
                      style={{
                        borderRadius: theme.borderRadius,
                        backgroundColor: theme.primaryColor,
                        color: "white",
                        transition: `all ${theme.transition.duration} ${theme.transition.timing}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = `scale(${theme.hover.scale})`;
                        e.currentTarget.style.filter = `brightness(${theme.hover.brightness})`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.filter = "brightness(100%)";
                      }}
                    >
                      <p>Hover Me</p>
                      <p className="text-sm opacity-80">Scale + Brightness</p>
                    </div>

                    <div
                      className="p-4 bg-white border rounded-md shadow-md text-center overflow-hidden cursor-pointer"
                      style={{
                        borderRadius: theme.borderRadius,
                        backgroundColor: theme.secondaryColor,
                        color: "white",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          transform: "translateX(-100%)",
                          transition: `transform ${theme.transition.duration} ${theme.transition.timing}`,
                        }}
                        className="shine-effect"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateX(100%)";
                        }}
                      />
                      <p>Hover Me</p>
                      <p className="text-sm opacity-80">Shine Effect</p>
                    </div>

                    <div
                      className="p-4 bg-white border rounded-md shadow-md text-center cursor-pointer"
                      style={{
                        borderRadius: theme.borderRadius,
                        borderColor: theme.accentColor,
                        borderWidth: "2px",
                        transition: `all ${theme.transition.duration} ${theme.transition.timing}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          theme.accentColor;
                        e.currentTarget.style.color = theme.textColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.color = "inherit";
                      }}
                    >
                      <p>Hover Me</p>
                      <p className="text-sm opacity-80">Background Fill</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorSetting({
  label,
  value,
  onChange,
  description,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center">
        <input
          title="Color Value"
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 border rounded mr-2"
          style={{ borderRadius: "var(--border-radius)" }}
        />
        <input
          title="Color Value"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-2 border rounded-md"
          style={{ borderRadius: "var(--border-radius)" }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}

function RangeSetting({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = "",
  description,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  unit?: string;
  description: string;
}) {
  const displayValue = unit ? `${value}${unit}` : value.toString();

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium">{label}</label>
        <span className="text-sm">{displayValue}</span>
      </div>
      <input
        title="Range Value"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}
