// hooks/useCart.ts
"use client";

import { useCartStore } from "./../store/cartStore";

export function useCart() {
  const cartStore = useCartStore();

  return {
    // Cart items and state
    cartItems: cartStore.items,
    totalItems: cartStore.getTotalItems(),
    totalAmount: cartStore.getTotalAmount(),
    isEmpty: cartStore.items.length === 0,

    // Methods
    addToCart: cartStore.addItem,
    updateQuantity: cartStore.updateQuantity,
    removeFromCart: cartStore.removeItem,
    clearCart: cartStore.clearCart,
  };
}
