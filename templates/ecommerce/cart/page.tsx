"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Mock cart items - In a real app, this would come from a state management system
const initialCartItems = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    image: "https://placehold.co/300x300?text=Headphones",
    quantity: 1,
  },
  {
    id: 3,
    name: "Laptop Ultra",
    price: 1299.99,
    image: "https://placehold.co/300x300?text=Laptop",
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-xl mb-6">Your cart is empty</p>
          <Link
            href="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border-b py-4"
              >
                <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                  <div className="relative w-20 h-20 mr-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center mr-6">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 px-3 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="bg-gray-100 px-4 py-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-3 py-1 rounded-r"
                    >
                      +
                    </button>
                  </div>

                  <div className="mr-6 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <Link href="/products" className="text-blue-600 hover:underline">
                ← Continue Shopping
              </Link>
            </div>

            <div className="mt-4 md:mt-0 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="block text-center bg-blue-600 text-white mt-4 py-2 px-6 rounded-lg hover:bg-blue-700 w-full"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
