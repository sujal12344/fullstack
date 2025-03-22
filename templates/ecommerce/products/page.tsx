"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Mock product data - In a real app, this would come from an API
const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    description: "High-quality wireless headphones with noise cancellation",
    image: "https://placehold.co/300x300?text=Headphones",
  },
  {
    id: 2,
    name: "Smartphone Pro",
    price: 899.99,
    description: "Latest smartphone with advanced camera system",
    image: "https://placehold.co/300x300?text=Smartphone",
  },
  {
    id: 3,
    name: "Laptop Ultra",
    price: 1299.99,
    description: "Ultra-thin laptop with powerful performance",
    image: "https://placehold.co/300x300?text=Laptop",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 249.99,
    description: "Fitness and health tracking smartwatch",
    image: "https://placehold.co/300x300?text=Watch",
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Shop Our Products</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <div className="relative h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <Link
                  href={`/products/${product.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-xl">No products found</p>
        </div>
      )}
    </div>
  );
}
