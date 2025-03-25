// components/products/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useThemeStore } from "../../store/themeStore";
import { motion } from "framer-motion";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-hot-toast";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    features: string[];
    specs: { [key: string]: string };
    reviews: { id: string; user: string; rating: number; comment: string }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { currentTheme } = useThemeStore();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{
        [currentTheme.cardHoverEffect.split("(")[0]]:
          currentTheme.cardHoverEffect.includes("translate")
            ? currentTheme.cardHoverEffect
            : `scale(${currentTheme.cardHoverEffect.replace(/[^\d.]/g, "")})`,
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden h-full"
      style={{ borderRadius: currentTheme.borderRadius }}
    >
      <div
        className="h-full flex flex-col"
        style={{
          backgroundColor: currentTheme.cardBackground,
          boxShadow: currentTheme.boxShadow,
        }}
      >
        <Link
          href={`/products/${product.id}`}
          className="block relative pt-[66%]"
        >
          <Image
            src={
              product.image ||
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000"
            }
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-110"
          />

          <div
            className="absolute top-0 left-0 m-3 px-2 py-1 text-xs font-semibold rounded"
            style={{
              backgroundColor: `${currentTheme.accentColor}B0`, // B0 for 70% opacity
              color: currentTheme.headingColor,
            }}
          >
            New
          </div>
        </Link>

        <div className="p-4 flex flex-col flex-grow">
          <Link href={`/products/${product.id}`}>
            <h3
              className="font-semibold mb-2 hover:underline transition-colors"
              style={{ color: currentTheme.headingColor }}
            >
              {product.name}
            </h3>
          </Link>

          <p className="text-sm mb-4 opacity-80 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-auto flex items-end justify-between">
            <span
              className="text-xl font-bold"
              style={{ color: currentTheme.primaryColor }}
            >
              ${product.price.toFixed(2)}
            </span>

            <motion.button
              whileHover={{
                [currentTheme.buttonHoverEffect.split("(")[0]]:
                  currentTheme.buttonHoverEffect.includes("translate")
                    ? currentTheme.buttonHoverEffect
                    : `scale(${currentTheme.buttonHoverEffect.replace(
                        /[^\d.]/g,
                        ""
                      )})`,
              }}
              className="px-3 py-2 text-white rounded-full"
              style={{
                background: currentTheme.buttonGradient,
                borderRadius: currentTheme.borderRadius,
              }}
              onClick={handleAddToCart}
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
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
                <path d="M12 10v11"></path>
                <path d="M7.5 16h9"></path>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
