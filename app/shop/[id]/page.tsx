"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import React, { useState } from "react";
import { products } from "@/data/products";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  const images: string[] = product ? product.images : [];
  const [selectedImg, setSelectedImg] = useState(0);

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8F8F8]">
        <h1 className="text-2xl font-bold text-[#FF5CA2] mb-4">Product niet gevonden</h1>
        <Link href="/shop" className="text-[#3B5FFF] underline">Terug naar shop</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col py-8 px-2 sm:px-6">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-12">
        {/* Sidebar met thumbnails */}
        <div className="flex flex-row md:flex-col gap-3 md:gap-4 items-center md:items-start order-2 md:order-1 mt-4 md:mt-0">
          {images.map((img, idx) => (
            <button
              key={img}
              type="button"
              className={`bg-[#F8F8F8] rounded-lg p-1 border transition ${
                selectedImg === idx
                  ? "border-[#FF5CA2] ring-2 ring-[#FF5CA2]"
                  : "border-[#FFF275] hover:border-[#FF5CA2]"
              }`}
              onClick={() => setSelectedImg(idx)}
              aria-label={`Bekijk afbeelding ${idx + 1}`}
              style={{ width: 60, height: 60 }}
            >
              <Image
                src={img}
                alt={`${product.name} extra foto ${idx + 1}`}
                width={56}
                height={56}
                className="object-contain"
              />
            </button>
          ))}
        </div>
        {/* Grote afbeelding */}
        <div className="flex-1 flex items-center justify-center order-1 md:order-2">
          <div className="bg-white rounded-2xl p-6 shadow-xl flex items-center justify-center w-full max-w-lg min-h-[340px]">
            <Image
              src={images[selectedImg]}
              alt={product.name}
              width={320}
              height={320}
              className="object-contain"
              priority
            />
          </div>
        </div>
        {/* Product info */}
        <div className="flex-1 flex flex-col justify-center order-3 max-w-xl mx-auto md:mx-0">
          <span className="uppercase text-xs font-bold text-[#3B5FFF] mb-2 tracking-widest">{product.category}</span>
          <h1 className="font-luckiest-guy text-4xl sm:text-5xl text-[#3B5FFF] mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#FF5CA2] font-bold text-3xl">€{product.price.toFixed(2)}</span>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 text-base">{product.description}</p>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <button
              className="bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white font-poppins font-bold py-3 px-8 rounded-lg transition-all shadow text-lg"
              onClick={() => addToCart({ ...product, quantity: 1 })}
            >
              Voeg toe aan winkelwagen
            </button>
            <Link href="/shop" className="text-[#3B5FFF] underline text-base">← Terug naar shop</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
