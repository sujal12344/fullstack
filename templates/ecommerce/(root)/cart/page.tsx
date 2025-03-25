// app/(root)/cart/page.tsx
"use client";

import { useThemeStore } from "../store/themeStore";
import { useCart } from "../hooks/useCart";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { currentTheme } = useThemeStore();
  const {
    cartItems,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
    isEmpty,
  } = useCart();

  const buttonHoverEffect = (effect: string) => {
    if (effect.includes("translate")) {
      return effect;
    }
    return `scale(${effect.replace(/[^\d.]/g, "")})`;
  };

  if (isEmpty) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
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
            className="mx-auto mb-6 opacity-50"
            style={{ color: currentTheme.primaryColor }}
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: currentTheme.headingColor }}
          >
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven&apos;t added any products to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 rounded-lg text-white"
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
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-2xl font-bold mb-6"
        style={{ color: currentTheme.headingColor }}
      >
        Your Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="lg:w-2/3">
          <div
            className="rounded-lg p-6 mb-6"
            style={{
              backgroundColor: currentTheme.cardBackground,
              boxShadow: currentTheme.boxShadow,
              borderRadius: currentTheme.borderRadius,
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-lg font-semibold"
                style={{ color: currentTheme.headingColor }}
              >
                {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
              </h2>
              <button
                onClick={clearCart}
                className="text-sm px-3 py-1 rounded transition-all duration-300 hover:opacity-80"
                style={{
                  backgroundColor: `${currentTheme.accentColor}20`,
                  color: currentTheme.primaryColor,
                  borderRadius: currentTheme.borderRadius,
                  transition: currentTheme.transition,
                }}
              >
                Clear Cart
              </button>
            </div>

            {/* Cart items list */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center p-4 border-b"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    borderColor: `${currentTheme.primaryColor}20`,
                  }}
                >
                  <div className="flex flex-1 mb-4 sm:mb-0">
                    <div
                      className="relative w-20 h-20 mr-4 rounded overflow-hidden flex-shrink-0"
                      style={{ borderRadius: currentTheme.borderRadius }}
                    >
                      <Image
                        src={item.image || "https://placehold.co/200"}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3
                        className="font-medium"
                        style={{ color: currentTheme.headingColor }}
                      >
                        {item.name}
                      </h3>
                      <span
                        className="text-lg font-bold mt-1"
                        style={{ color: currentTheme.primaryColor }}
                      >
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center mr-6"
                      style={{
                        borderRadius: currentTheme.borderRadius,
                        border: `1px solid ${currentTheme.primaryColor}20`,
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 text-lg font-medium"
                        style={{ color: currentTheme.primaryColor }}
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-center min-w-[40px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-lg font-medium"
                        style={{ color: currentTheme.primaryColor }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Remove item"
                      style={{ transition: currentTheme.transition }}
                    >
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
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Link
              href="/products"
              className="flex items-center px-4 py-2 rounded-lg"
              style={{
                color: currentTheme.primaryColor,
                transition: currentTheme.transition,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
              }}
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
                className="mr-2"
              >
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:w-1/3">
          <div
            className="rounded-lg p-6 sticky top-4"
            style={{
              backgroundColor: currentTheme.cardBackground,
              boxShadow: currentTheme.boxShadow,
              borderRadius: currentTheme.borderRadius,
            }}
          >
            <h2
              className="text-lg font-semibold mb-4 pb-4 border-b"
              style={{
                color: currentTheme.headingColor,
                borderColor: `${currentTheme.primaryColor}20`,
              }}
            >
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span
                  className="font-medium"
                  style={{ color: currentTheme.textColor }}
                >
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span
                  className="font-medium"
                  style={{ color: currentTheme.textColor }}
                >
                  {totalAmount >= 100 ? "Free" : "$4.99"}
                </span>
              </div>

              {totalAmount < 100 && (
                <div
                  className="text-sm py-2 px-3 rounded-lg mt-2"
                  style={{
                    backgroundColor: `${currentTheme.accentColor}15`,
                    color: currentTheme.accentColor,
                    borderRadius: currentTheme.borderRadius,
                  }}
                >
                  Add ${(100 - totalAmount).toFixed(2)} more for free shipping
                </div>
              )}

              <div
                className="border-t pt-3 mt-3"
                style={{ borderColor: `${currentTheme.primaryColor}20` }}
              >
                <div className="flex justify-between">
                  <span
                    className="font-semibold"
                    style={{ color: currentTheme.headingColor }}
                  >
                    Total
                  </span>
                  <span
                    className="font-bold text-lg"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    $
                    {(totalAmount >= 100
                      ? totalAmount
                      : totalAmount + 4.99
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full text-center px-6 py-3 rounded-lg text-white font-medium mt-4"
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
              Proceed to Checkout
            </Link>

            <div className="mt-6">
              <div className="flex items-center justify-center space-x-4 text-gray-500">
                <div className="flex items-center">
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
                    className="mr-1"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Secure Checkout
                </div>
                <div className="flex items-center">
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
                    className="mr-1"
                  >
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                  </svg>
                  Easy Returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
