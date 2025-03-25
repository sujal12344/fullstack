// app/(root)/products/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";
import ProductCard from "../components/products/ProductCard";
import { Product } from "../types/product";

// Mock data
const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    description:
      "High-quality wireless headphones with noise cancellation technology for immersive audio experience.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
    category: "Electronics",
    features: [
      "Active Noise Cancellation",
      "Bluetooth 5.0",
      "40mm Neodymium Drivers",
      "20-Hour Battery Life",
      "Touch Controls",
    ],
    specs: {
      Brand: "Symphony",
      Color: "Black",
      Connectivity: "Wireless",
      "Water Resistance": "IPX4",
    },
    reviews: [
      {
        id: "1",
        user: "John Doe",
        rating: 5,
        comment: "Great headphones, excellent sound quality.",
      },
      {
        id: "2",
        user: "Jane Smith",
        rating: 4,
        comment: "Comfortable to wear for long periods.",
      },
    ],
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description:
      "Comfortable and eco-friendly cotton t-shirt, perfect for everyday wear.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000",
    category: "Clothing",
    features: ["100% Organic Cotton", "Breathable", "Machine Washable"],
    specs: {
      Brand: "Cotton & Co.",
      Color: "White",
      Material: "Organic Cotton",
    },
    reviews: [
      {
        id: "4",
        user: "Alice Johnson",
        rating: 5,
        comment: "Soft and comfortable fabric, perfect fit.",
      },
      {
        id: "1",
        user: "Bob Brown",
        rating: 4,
        comment: "Great value for the price, highly recommended.",
      },
    ],
  },
  {
    id: "3",
    name: "Smart Watch Pro",
    price: 249.99,
    description:
      "Advanced smartwatch with health tracking features, GPS, and message notifications.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000",
    category: "Electronics",
    features: [
      "Heart Rate Monitor",
      "GPS Tracking",
      "Water Resistant",
      "Bluetooth",
    ],
    specs: {
      Brand: "TechWare",
      Color: "Black",
      "Water Resistance": "IP67",
      Connectivity: "Bluetooth",
    },
    reviews: [
      {
        id: "3",
        user: "Sarah Wilson",
        rating: 5,
        comment: "Very stylish design, accurate fitness tracking.",
      },
    ],
  },
  {
    id: "4",
    name: "Natural Bamboo Desk",
    price: 149.99,
    description:
      "Eco-friendly bamboo desk, perfect for your home office setup.",
    image:
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?q=80&w=1000",
    category: "Furniture",
    features: ["100% Bamboo", "Easy to Assemble", "Sturdy Design"],
    specs: {
      Material: "Bamboo",
      Dimensions: "120x60x75cm",
      "Weight Capacity": "100kg",
    },
    reviews: [
      {
        id: "2",
        user: "Jane Smith",
        rating: 4,
        comment: "Great design, fits well with my room decor.",
      },
      {
        id: "3",
        user: "Sarah Wilson",
        rating: 5,
        comment: "Sturdy and durable, easy to assemble.",
      },
    ],
  },
  {
    id: "5",
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    description:
      "Double-walled insulated bottle that keeps your drinks hot or cold for hours.",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000",
    category: "Accessories",
    features: ["Stainless Steel", "Insulated", "BPA Free"],
    specs: {
      Brand: "HydraPeak",
      Color: "Silver",
      Capacity: "750ml",
    },
    reviews: [
      {
        id: "4",
        user: "Alice Johnson",
        rating: 5,
        comment: "Keeps my drinks cold all day, very satisfied.",
      },
    ],
  },
  {
    id: "6",
    name: "Organic Skincare Set",
    price: 79.99,
    description:
      "Complete skincare routine with natural and organic ingredients.",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1000",
    category: "Beauty",
    features: ["Cruelty-Free", "Organic Ingredients", "Vegan"],
    specs: {
      Brand: "Nature's Beauty",
      SkinType: "All",
      "Number of Items": "5",
    },
    reviews: [
      {
        id: "5",
        user: "David Lee",
        rating: 4,
        comment: "Great products, noticeable difference in my skin.",
      },
    ],
  },
  {
    id: "7",
    name: "Ergonomic Office Chair",
    price: 189.99,
    description:
      "Comfortable chair designed for long working hours with proper back support.",
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1000",
    category: "Furniture",
    features: ["Ergonomic Design", "Adjustable Height", "Lumbar Support"],
    specs: {
      Brand: "ComfortPro",
      Color: "Black",
      Material: "Mesh Fabric",
    },
    reviews: [
      {
        id: "6",
        user: "Emily Davis",
        rating: 5,
        comment: "Very comfortable and sturdy, great for my back.",
      },
    ],
  },
  {
    id: "8",
    name: "Natural Scented Candles",
    price: 24.99,
    description:
      "Set of hand-poured soy wax candles with essential oil fragrances.",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Home",
    features: ["Soy Wax", "Essential Oils", "Long-Lasting Fragrance"],
    specs: {
      Brand: "AromaHome",
      Scents: "Lavender, Vanilla, Rose",
      "Number of Candles": "3",
    },
    reviews: [
      {
        id: "7",
        user: "Alex Turner",
        rating: 4,
        comment: "Lovely scents, very relaxing and calming.",
      },
    ],
  },
];

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Furniture",
  "Beauty",
  "Accessories",
  "Home",
];

export default function ProductsPage() {
  const { currentTheme } = useThemeStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on category and search query
  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "All" || product.category === activeCategory) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Animation variants
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div
        className="rounded-xl mb-8 p-8 text-center relative overflow-hidden"
        style={{
          background: currentTheme.buttonGradient,
          borderRadius: currentTheme.borderRadius,
        }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore Our Products
          </h1>
          <p className="text-white text-opacity-90 max-w-lg mx-auto mb-6">
            Discover our collection of high-quality, sustainable products for
            your everyday needs.
          </p>
        </div>
        <div className="absolute inset-0 opacity-20">
          {/* Pattern overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E')",
            }}
          />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow" style={{ maxWidth: "500px" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border border-gray-200 transition-shadow focus:ring-2 focus:outline-none"
            style={{
              borderRadius: currentTheme.borderRadius,
              borderColor: `${currentTheme.primaryColor}30`,
              color: currentTheme.textColor,
              backgroundColor: currentTheme.cardBackground,
              boxShadow: `0 0 5px ${currentTheme.accentColor}`, // ✅ Valid
              outline: `1px solid ${currentTheme.primaryColor}`,
              outlineOffset: "-1px",
            }}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: currentTheme.primaryColor }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-4 py-2 text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor:
                  activeCategory === category
                    ? currentTheme.primaryColor
                    : `${currentTheme.primaryColor}20`,
                color:
                  activeCategory === category
                    ? "white"
                    : currentTheme.textColor,
                borderRadius: currentTheme.borderRadius,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-4 opacity-30"
              style={{ color: currentTheme.primaryColor }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <h3
              className="text-xl font-medium mb-2"
              style={{ color: currentTheme.headingColor }}
            >
              No products found
            </h3>
            <p className="opacity-70">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
