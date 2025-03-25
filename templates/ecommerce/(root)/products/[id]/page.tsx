"use client";

import { useState, useEffect } from "react";
import { useThemeStore } from "../../store/themeStore";
import { useCart } from "../../hooks/useCart";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import { Product, ProductReview } from "../../types/product";

// Explicitly type the mock products array
const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    description:
      "High-quality wireless headphones with noise cancellation technology for immersive audio experience. Features include: 30-hour battery life, premium sound quality, comfortable ear cushions, and quick charging capability.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
    category: "Electronics",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "High-definition audio",
      "Comfortable memory foam ear cushions",
      "Fast charging (10 min charge = 5 hours playback)",
      "Bluetooth 5.0 connectivity",
    ],
    specs: {
      Weight: "250g",
      Battery: "1000mAh",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      Range: "Up to 30 meters",
    },
    reviews: [
      {
        id: "r1",
        user: "Alex Johnson",
        rating: 5,
        comment: `These are the best headphones I've ever used. The sound quality is incredible and they're so comfortable!`,
      },
      {
        id: "r2",
        user: "Sarah Williams",
        rating: 4,
        comment: `Great sound quality and battery life. They're a bit heavy for extended use though.`,
      },
    ],
  },
  {
    id: "2",
    name: "Smartphone Pro",
    price: 899.99,
    description:
      "Latest smartphone with advanced camera system, featuring a triple-lens setup, night mode, and 8K video recording.",
    image:
      "https://images.unsplash.com/photo-1640437830863-8f7f38327319?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U21hcnRwaG9uZSUyMFByb3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Electronics",
    features: [
      "Triple camera system",
      "5G connectivity",
      "All-day battery life",
      "Water resistant",
    ],
    specs: {
      Weight: "180g",
      Battery: "4500mAh",
      Storage: "256GB",
      Display: "6.5-inch OLED",
    },
    reviews: [
      {
        id: "r1",
        user: "Mike Brown",
        rating: 5,
        comment: "Amazing camera quality and battery life!",
      },
    ],
  },
  {
    id: "3",
    name: "Smart Watch Ultra",
    price: 299.99,
    description:
      "Advanced smartwatch with health monitoring features, GPS tracking, and week-long battery life.",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000",
    category: "Electronics",
    features: [
      "24/7 health monitoring",
      "GPS tracking",
      "7-day battery life",
      "Water resistant to 50m",
    ],
    specs: {
      Weight: "45g",
      Battery: "500mAh",
      Connectivity: "Bluetooth 5.2",
      Sensors: "Heart rate, SpO2, ECG",
    },
    reviews: [
      {
        id: "r1",
        user: "Lisa Chen",
        rating: 4,
        comment: "Great fitness features and battery lasts forever!",
      },
    ],
  },
];

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const { currentTheme } = useThemeStore();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "reviews"
  >("description");
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // In a real app, you'd fetch this data from an API
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // Type assertion to Product to ensure TypeScript knows it matches the interface
      const foundProduct = products.find((p) => p.id === productId) || null;
      setProduct(foundProduct as Product | null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div
            className="w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: `${currentTheme.primaryColor}40` }}
          />
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
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
          className="mx-auto mb-4"
          style={{ color: currentTheme.primaryColor }}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: currentTheme.headingColor }}
        >
          Product Not Found
        </h1>
        <p className="mb-6">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 rounded-lg text-white"
          style={{
            background: currentTheme.buttonGradient,
            borderRadius: currentTheme.borderRadius,
          }}
        >
          Back to Products
        </Link>
      </div>
    );
  }

  // Create an array of images (in a real app, this would come from the product data)
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000",
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(
      `${quantity} ${quantity > 1 ? "items" : "item"} added to your cart!`
    );
  };

  const buttonHoverEffect = () => {
    const effect = currentTheme.buttonHoverEffect;
    if (effect.includes("translate")) {
      return effect;
    }
    return `scale(${effect.replace(/[^\d.]/g, "")})`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        href="/products"
        className="inline-flex items-center mb-6 transition-colors hover:opacity-80"
        style={{ color: currentTheme.primaryColor }}
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
          className="mr-2"
          aria-hidden="true"
        >
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div
            className="relative rounded-lg overflow-hidden mb-4 aspect-w-4 aspect-h-3 bg-gray-100"
            style={{
              height: "400px",
              borderRadius: currentTheme.borderRadius,
              boxShadow: currentTheme.boxShadow,
            }}
          >
            <Image
              src={productImages[selectedImage]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Thumbnail images */}
          <div className="flex gap-4">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                aria-label={`View image ${index + 1} of product`}
                className={`relative w-20 h-20 rounded overflow-hidden transition duration-200 ${
                  selectedImage === index
                    ? "ring-2 ring-primaryColor" // ✅ Cleaner ring effect
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  borderRadius: currentTheme.borderRadius,
                  boxShadow:
                    selectedImage === index
                      ? `6px 6px 8px ${currentTheme.primaryColor}` // ✅ Valid ring effect
                      : "none",
                }}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <motion.h1
              className="text-3xl font-bold mb-2"
              style={{ color: currentTheme.headingColor }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {product.name}
            </motion.h1>

            <div className="flex items-center mb-6">
              {/* Star rating */}
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={star <= 4 ? currentTheme.accentColor : "none"}
                    stroke={currentTheme.accentColor}
                    strokeWidth="2"
                    className="mr-1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <span className="text-sm">4.0 (2 reviews)</span>
            </div>

            <p
              className="text-3xl font-bold mb-4"
              style={{ color: currentTheme.primaryColor }}
            >
              ${product.price.toFixed(2)}
            </p>

            {/* Quantity selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4">Quantity:</span>
              <div
                className="flex items-center"
                style={{
                  borderRadius: currentTheme.borderRadius,
                  border: `1px solid ${currentTheme.primaryColor}30`,
                }}
              >
                <button
                  title="Decrease quantity"
                  aria-label="Decrease quantity"
                  type="button"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="px-3 py-2 transition-colors"
                  style={{
                    backgroundColor: `${currentTheme.primaryColor}10`,
                    color: currentTheme.primaryColor,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button
                  title="Increase quantity"
                  aria-label="Increase quantity"
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 transition-colors"
                  style={{
                    backgroundColor: `${currentTheme.primaryColor}10`,
                    color: currentTheme.primaryColor,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <motion.button
              className="w-full py-3 px-6 text-white font-medium rounded-lg mb-6"
              style={{
                background: currentTheme.buttonGradient,
                borderRadius: currentTheme.borderRadius,
              }}
              whileHover={{
                [currentTheme.buttonHoverEffect.split("(")[0]]:
                  buttonHoverEffect(),
              }}
              transition={{ duration: 0.3 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </motion.button>

            {/* Features highlight */}
            <div
              className="p-4 rounded-lg mb-6"
              style={{
                backgroundColor: `${currentTheme.accentColor}15`,
                borderRadius: currentTheme.borderRadius,
              }}
            >
              <h3
                className="font-semibold mb-2"
                style={{ color: currentTheme.headingColor }}
              >
                Key Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features
                  .slice(0, 4)
                  .map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 mt-1 flex-shrink-0"
                        style={{ color: currentTheme.primaryColor }}
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Delivery/Returns info */}
            <div className="flex flex-col space-y-3">
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
                  className="mr-2"
                  style={{ color: currentTheme.primaryColor }}
                >
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="M7 15h0"></path>
                  <path d="M2 9h20"></path>
                </svg>
                <span className="text-sm">
                  Free shipping on orders over $50
                </span>
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
                  className="mr-2"
                  style={{ color: currentTheme.primaryColor }}
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                  <path d="M12 3v6"></path>
                </svg>
                <span className="text-sm">30-day easy returns</span>
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
                  className="mr-2"
                  style={{ color: currentTheme.primaryColor }}
                >
                  <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2Z"></path>
                  <path d="m15 9-6 6"></path>
                  <path d="m9 9 6 6"></path>
                </svg>
                <span className="text-sm">1-year warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for more details */}
      <div className="mb-12">
        <div className="flex border-b mb-6">
          <button
            className={`pb-2 px-4 font-medium ${
              activeTab === "description" ? "border-b-2" : ""
            }`}
            style={{
              borderColor:
                activeTab === "description"
                  ? currentTheme.primaryColor
                  : "transparent",
              color:
                activeTab === "description"
                  ? currentTheme.primaryColor
                  : currentTheme.textColor,
            }}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`pb-2 px-4 font-medium ${
              activeTab === "specifications" ? "border-b-2" : ""
            }`}
            style={{
              borderColor:
                activeTab === "specifications"
                  ? currentTheme.primaryColor
                  : "transparent",
              color:
                activeTab === "specifications"
                  ? currentTheme.primaryColor
                  : currentTheme.textColor,
            }}
            onClick={() => setActiveTab("specifications")}
          >
            Specifications
          </button>
          <button
            className={`pb-2 px-4 font-medium ${
              activeTab === "reviews" ? "border-b-2" : ""
            }`}
            style={{
              borderColor:
                activeTab === "reviews"
                  ? currentTheme.primaryColor
                  : "transparent",
              color:
                activeTab === "reviews"
                  ? currentTheme.primaryColor
                  : currentTheme.textColor,
            }}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (2)
          </button>
        </div>

        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p className="mb-4">{product.description}</p>
            <p>
              Experience premium audio quality with these wireless headphones
              designed for audiophiles and casual listeners alike. The active
              noise cancellation technology blocks out ambient noise so you can
              focus on your music, podcasts, or calls without distraction.
            </p>
            <p className="mt-4">
              The comfortable over-ear design with memory foam cushions allows
              for hours of continuous use, perfect for long commutes or work
              sessions. With the latest Bluetooth technology, you&apos;ll enjoy
              a stable connection with your devices up to 30 meters away.
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <span className="font-medium">{key}:</span>{" "}
                  <span>{String(value)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3
                className="font-semibold mb-3"
                style={{ color: currentTheme.headingColor }}
              >
                What&apos;s in the Box
              </h3>
              <ul className="list-disc pl-5">
                <li>Premium Wireless Headphones</li>
                <li>Carrying Case</li>
                <li>3.5mm Audio Cable</li>
                <li>USB-C Charging Cable</li>
                <li>User Manual</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {product.reviews.map((review: ProductReview) => (
              <div
                key={review.id}
                className="mb-6 p-4 rounded-lg"
                style={{
                  backgroundColor: `${currentTheme.accentColor}10`,
                  borderRadius: currentTheme.borderRadius,
                }}
              >
                <div className="flex items-center mb-2">
                  <span className="font-medium mr-2">{review.user}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={
                          star <= review.rating
                            ? currentTheme.accentColor
                            : "none"
                        }
                        stroke={currentTheme.accentColor}
                        strokeWidth="2"
                        className="mr-1"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}

            <button
              className="mt-4 px-6 py-2 text-sm rounded-lg border transition-colors"
              style={{
                borderColor: `${currentTheme.primaryColor}40`,
                color: currentTheme.primaryColor,
                borderRadius: currentTheme.borderRadius,
              }}
            >
              Write a Review
            </button>
          </div>
        )}
      </div>

      {/* Related products section could go here */}
    </div>
  );
}
