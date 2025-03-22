"use client";

import { useState } from "react";
import Link from "next/link";

// Mock cart summary - In a real app, this would come from a state management system
const cartSummary = {
  items: [
    { id: 1, name: "Premium Headphones", price: 199.99, quantity: 1 },
    { id: 3, name: "Laptop Ultra", price: 1299.99, quantity: 1 },
  ],
  subtotal: 1499.98,
  shipping: 0,
  total: 1499.98,
};

export default function CheckoutPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiration: "",
    cvv: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 1500);
  };

  if (isComplete) {
    return (
      <div className="max-w-4xl mx-auto p-4 py-12 text-center">
        <div className="bg-green-50 rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            Order Complete!
          </h1>
          <p className="text-green-600 mb-6">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
          <p className="text-gray-600 mb-8">
            A confirmation email has been sent to {formState.email}.
          </p>

          <Link
            href="/products"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main checkout form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formState.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formState.city}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formState.state}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formState.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formState.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Payment Information
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formState.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formState.cardName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      name="expiration"
                      value={formState.expiration}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formState.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8 lg:hidden">
              <OrderSummary />
            </div>

            <div className="flex justify-between">
              <Link href="/cart" className="text-blue-600 hover:underline">
                ← Back to Cart
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Complete Order"}
              </button>
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div className="hidden lg:block">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

function OrderSummary() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="border-b pb-4 mb-4">
        {cartSummary.items.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.name}{" "}
              <span className="text-gray-500">x{item.quantity}</span>
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${cartSummary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>${cartSummary.shipping.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between font-bold text-lg border-t pt-4">
        <span>Total</span>
        <span>${cartSummary.total.toFixed(2)}</span>
      </div>
    </div>
  );
}
