"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useThemeStore, themes, ThemeName } from "./store/themeStore";

// Dummy data - would come from API in real app
const featuredProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    description:
      "High-quality wireless headphones with noise cancellation technology.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
  },
  {
    id: "3",
    name: "Smart Watch Pro",
    price: 249.99,
    description:
      "Advanced smartwatch with health tracking features and notifications.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000",
  },
  {
    id: "6",
    name: "Organic Skincare Set",
    price: 79.99,
    description:
      "Complete skincare routine with natural and organic ingredients.",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1000",
  },
];

const benefits = [
  {
    title: "Fast & Free Shipping",
    description: "Free shipping on all orders over $100",
    icon: (
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
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
      </svg>
    ),
  },
  {
    title: "30-Day Returns",
    description: "Not satisfied? Return within 30 days for a full refund",
    icon: (
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
        <polyline points="23 4 23 10 17 10"></polyline>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
      </svg>
    ),
  },
  {
    title: "Secure Payment",
    description: "Your payment information is always safe and encrypted",
    icon: (
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
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description: "Questions? Our customer support team is always here to help",
    icon: (
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
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
  },
];

const categories = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000",
  },
  {
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000",
  },
  {
    name: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?q=80&w=1000",
  },
];

const HomePage = () => {
  const { currentTheme, setTheme } = useThemeStore();
  const [previewTheme, setPreviewTheme] = useState<ThemeName | null>(null);
  const [activeTheme, setActiveTheme] = useState<ThemeName>(currentTheme.name);

  // For handling the theme preview hover effects
  useEffect(() => {
    if (previewTheme) {
      const timer = setTimeout(() => {
        setActiveTheme(previewTheme);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setActiveTheme(currentTheme.name);
    }
  }, [previewTheme, currentTheme.name]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonHoverEffect = (effect: string) => {
    if (effect.includes("translate")) {
      return effect;
    }
    return `scale(${effect.replace(/[^\d.]/g, "")})`;
  };

  return (
    <div className="pb-16">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: currentTheme.backgroundColor,
            backgroundImage: `linear-gradient(to bottom, ${currentTheme.primaryColor}15, ${currentTheme.backgroundColor})`,
          }}
        />

        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: currentTheme.patternBackground || "",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: currentTheme.headingColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Discover Your Perfect Style with{" "}
              <span style={{ color: currentTheme.primaryColor }}>EcoShop</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              style={{ color: currentTheme.textColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Shop our collection of sustainable, high-quality products and
              personalize your experience with our unique themes.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/products"
                className="px-8 py-3 rounded-lg text-white font-medium text-lg"
                style={{
                  background: currentTheme.buttonGradient,
                  borderRadius: currentTheme.borderRadius,
                  transition: currentTheme.transition,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = buttonHoverEffect(
                    currentTheme.hoverEffect
                  );
                  e.currentTarget.style.boxShadow =
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Shop Now
              </Link>

              <Link
                href="/customize"
                className="px-8 py-3 rounded-lg font-medium text-lg border-2"
                style={{
                  color: currentTheme.primaryColor,
                  borderColor: currentTheme.primaryColor,
                  borderRadius: currentTheme.borderRadius,
                  transition: currentTheme.transition,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.backgroundColor = `${currentTheme.primaryColor}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Customize Theme
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Hero decorative shapes */}
        <div className="hidden lg:block">
          <div
            className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-20"
            style={{ background: currentTheme.buttonGradient }}
          />
          <div
            className="absolute top-20 -right-10 w-28 h-28 rounded-full opacity-10"
            style={{ background: currentTheme.buttonGradient }}
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: currentTheme.headingColor }}
            >
              Featured Products
            </h2>

            <Link
              href="/products"
              className="flex items-center group"
              style={{
                color: currentTheme.primaryColor,
                transition: currentTheme.transition,
              }}
            >
              <span>View All</span>
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
                className="ml-2 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <Link href={`/products/${product.id}`}>
                  <div
                    className="group h-full rounded-lg overflow-hidden flex flex-col transition-all duration-300"
                    style={{
                      backgroundColor: currentTheme.cardBackground,
                      boxShadow: currentTheme.boxShadow,
                      borderRadius: currentTheme.borderRadius,
                    }}
                    onMouseEnter={(e) => {
                      if (currentTheme.cardHoverEffect.includes("translate")) {
                        e.currentTarget.style.transform =
                          currentTheme.cardHoverEffect;
                      } else {
                        e.currentTarget.style.transform = `scale(${currentTheme.cardHoverEffect.replace(
                          /[^\d.]/g,
                          ""
                        )})`;
                      }
                      e.currentTarget.style.boxShadow =
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = currentTheme.boxShadow;
                    }}
                  >
                    <div className="relative pt-[66%] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3
                        className="text-xl font-semibold mb-2 group-hover:text-opacity-80 transition-colors"
                        style={{ color: currentTheme.headingColor }}
                      >
                        {product.name}
                      </h3>

                      <p className="text-sm mb-4 flex-grow opacity-80">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <span
                          className="text-xl font-bold"
                          style={{ color: currentTheme.primaryColor }}
                        >
                          ${product.price.toFixed(2)}
                        </span>

                        <span
                          className="text-sm font-medium px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `${currentTheme.accentColor}30`,
                            color: currentTheme.primaryColor,
                          }}
                        >
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        className="py-16 bg-opacity-50"
        style={{ backgroundColor: `${currentTheme.backgroundColor}` }}
      >
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold mb-10 text-center"
            style={{ color: currentTheme.headingColor }}
          >
            Shop By Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="relative rounded-lg overflow-hidden h-64"
                style={{ borderRadius: currentTheme.borderRadius }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover brightness-75"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <h3
                    className="text-2xl font-bold text-white drop-shadow-lg px-4 py-2 rounded-lg"
                    style={{
                      backgroundColor: `${currentTheme.primaryColor}80`,
                      borderRadius: currentTheme.borderRadius,
                    }}
                  >
                    {category.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Theme Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 text-center"
            style={{ color: currentTheme.headingColor }}
          >
            Customize Your Experience
          </h2>

          <p className="text-center max-w-2xl mx-auto mb-10">
            Choose from our curated themes to personalize your shopping
            experience. Each theme offers a unique look and feel.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {(Object.keys(themes) as ThemeName[]).map((themeName) => (
              <motion.div
                key={themeName}
                className={`rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                  activeTheme === themeName ? "ring-2" : ""
                }`}
                style={{
                  backgroundColor: themes[themeName].cardBackground,
                  boxShadow: themes[themeName].boxShadow,
                  borderRadius: themes[themeName].borderRadius,
                  // ringColor: themes[themeName].primaryColor,
                  transform:
                    activeTheme === themeName ? "scale(1.05)" : "scale(1)",
                }}
                onMouseEnter={() => setPreviewTheme(themeName)}
                onMouseLeave={() => setPreviewTheme(null)}
                onClick={() => setTheme(themeName)}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{ background: themes[themeName].buttonGradient }}
                  />

                  {currentTheme.name === themeName && (
                    <div
                      className="px-2 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: `${themes[themeName].accentColor}40`,
                        color: themes[themeName].primaryColor,
                      }}
                    >
                      Active
                    </div>
                  )}
                </div>

                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: themes[themeName].headingColor }}
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </h3>

                <div className="flex gap-2 mb-3">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: themes[themeName].primaryColor }}
                  />
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{
                      backgroundColor: themes[themeName].secondaryColor,
                    }}
                  />
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: themes[themeName].accentColor }}
                  />
                </div>

                <button
                  className="w-full py-2 text-center text-sm rounded-lg text-white"
                  style={{
                    background: themes[themeName].buttonGradient,
                    borderRadius: themes[themeName].borderRadius,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme(themeName);
                  }}
                >
                  Apply Theme
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="py-16"
        style={{
          backgroundColor: `${currentTheme.primaryColor}08`,
          backgroundImage: currentTheme.patternBackground || "",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold mb-12 text-center"
            style={{ color: currentTheme.headingColor }}
          >
            Why Shop With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                }}
                viewport={{ once: true }}
              >
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${currentTheme.primaryColor}20`,
                    color: currentTheme.primaryColor,
                  }}
                >
                  {React.cloneElement(benefit.icon, {
                    style: { color: currentTheme.primaryColor },
                  })}
                </div>

                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: currentTheme.headingColor }}
                >
                  {benefit.title}
                </h3>

                <p className="text-sm opacity-80">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{
              background: currentTheme.buttonGradient,
              borderRadius: currentTheme.borderRadius,
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Join Our Newsletter
            </h2>

            <p className="text-white text-opacity-90 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter to receive updates on new products,
              special offers, and exclusive discounts.
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none"
                style={{
                  borderRadius: currentTheme.borderRadius,
                  boxShadow: `0 0 4px ${currentTheme.accentColor}`, // ✅ Valid CSS property
                }}
              />

              <button
                className="px-6 py-3 bg-white font-medium rounded-lg transition-transform"
                style={{
                  color: currentTheme.primaryColor,
                  borderRadius: currentTheme.borderRadius,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = buttonHoverEffect(
                    currentTheme.hoverEffect
                  );
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
