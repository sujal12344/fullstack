"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Mock product data - In a real app, this would come from an API based on the ID
const products = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 199.99,
    description:
      "High-quality wireless headphones with noise cancellation. Features include: 30-hour battery life, premium sound quality, comfortable ear cushions, and quick charging capability.",
    image: "https://placehold.co/600x400?text=Headphones",
    features: [
      "Noise cancellation",
      "30h battery life",
      "Bluetooth 5.0",
      "Hi-Fi sound",
    ],
  },
  {
    id: "2",
    name: "Smartphone Pro",
    price: 899.99,
    description:
      "Latest smartphone with advanced camera system, featuring a triple-lens setup, night mode, and 8K video recording. Powered by the latest processor for smooth performance.",
    image: "https://placehold.co/600x400?text=Smartphone",
    features: [
      "Triple camera",
      "5G support",
      "All-day battery",
      "Water resistant",
    ],
  },
  {
    id: "3",
    name: "Laptop Ultra",
    price: 1299.99,
    description:
      "Ultra-thin laptop with powerful performance, featuring a high-resolution display, the latest processor generation, and all-day battery life.",
    image: "https://placehold.co/600x400?text=Laptop",
    features: ["16GB RAM", "512GB SSD", "14-hour battery", "Backlit keyboard"],
  },
  {
    id: "4",
    name: "Smart Watch",
    price: 249.99,
    description:
      "Fitness and health tracking smartwatch with heart rate monitoring, sleep tracking, and GPS. Water-resistant design with a customizable watch face.",
    image: "https://placehold.co/600x400?text=Watch",
    features: [
      "Heart rate monitor",
      "GPS",
      "Water resistant",
      "7-day battery life",
    ],
  },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  // Find the product with the matching ID
  const product = products.find((p) => p.id === params.id);

  // Handle adding to cart
  const addToCart = () => {
    // In a real app, this would update a cart state or send to an API
    alert(`Added ${quantity} of ${product?.name} to cart!`);
    // You could redirect to the cart page
    // router.push('/cart');
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-4 text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <button
          onClick={() => router.push("/products")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <button
        onClick={() => router.push("/products")}
        className="text-blue-600 mb-6 flex items-center"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-5">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center mb-6">
            <span className="mr-3">Quantity:</span>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-3 py-1 rounded-l"
              >
                -
              </button>
              <span className="bg-gray-100 px-4 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded-r"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={addToCart}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
