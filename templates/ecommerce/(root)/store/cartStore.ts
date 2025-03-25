// store/cartStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/cart";
import { toast } from "react-hot-toast";
import { Product } from "../types/product";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          // Check if item already exists in cart
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === product.id
          );

          if (existingItemIndex !== -1) {
            // Update quantity if item exists
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;

            return { items: updatedItems };
          } else {
            // Add new item
            const newItem: CartItem = {
              id: `${product.id}-${Date.now()}`,
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity: quantity,
              image: product.image || "",
            };

            return { items: [...state.items, newItem] };
          }
        });
      },

      updateQuantity: (itemId, newQuantity) => {
        if (newQuantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          );

          return { items: updatedItems };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
        toast.success("Item removed from cart");
      },

      clearCart: () => {
        set({ items: [] });
        toast.success("Cart cleared");
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalAmount: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
