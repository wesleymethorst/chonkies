"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import React, { useState } from "react";
import { products } from "@/data/products";

const categories = [
  "Alles",
  ...Array.from(new Set(products.map((p) => p.category))),
];

export default function Shop() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Alles");
  // Houd per product bij of deze wordt gehovert
  const [hovered, setHovered] = useState<string | null>(null);

  let filteredProducts = products;
  if (selectedCategory !== "Alles") {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8] pb-16">
      {/* Hero / Banner */}
      <section className="bg-[#FFF275] py-12 px-4 mb-10 rounded-b-3xl shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-luckiest-guy text-[#FF5CA2] mb-4">Shop Funko Pops</h1>
          <p className="text-[#3B5FFF] font-poppins text-lg max-w-2xl mb-4">
            Ontdek onze unieke collectie Funko Pops! Filter op categorie en vind jouw favoriete Marvel, Disney of Horror figuren.
          </p>
        </div>
      </section>

      {/* Categorieën */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-bold border transition ${
              selectedCategory === cat
                ? "bg-[#3B5FFF] text-white border-[#3B5FFF]"
                : "bg-[#F8F8F8] text-[#3B5FFF] border-[#3B5FFF] hover:bg-[#FFF275]"
            }`}
            onClick={() => {
              setSelectedCategory(cat);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Producten grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 text-center border-2 border-[#FFF275] hover:shadow-2xl transition"
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-full flex justify-center mb-4">
                <div className="bg-[#F8F8F8] rounded-xl p-4 flex items-center justify-center shadow-inner relative h-[160px] w-[160px]">
                  {/* Beide images gestapeld, met fade animatie */}
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={160}
                    height={160}
                    className={`object-contain absolute inset-0 transition-opacity duration-300 ${
                      hovered === product.id ? "opacity-0" : "opacity-100"
                    }`}
                    draggable={false}
                  />
                  {product.images[1] && (
                    <Image
                      src={product.images[1]}
                      alt={product.name + " extra"}
                      width={160}
                      height={160}
                      className={`object-contain absolute inset-0 transition-opacity duration-300 ${
                        hovered === product.id ? "opacity-100" : "opacity-0"
                      }`}
                      draggable={false}
                    />
                  )}
                </div>
              </div>
              <h2 className="font-luckiest-guy text-2xl text-[#3B5FFF] mb-1">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="text-[#FF5CA2] font-bold text-xl mb-4">€{product.price.toFixed(2)}</div>
              <div className="flex gap-3 mt-auto">
                <button
                  className="bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white font-poppins font-bold py-2 px-4 rounded-lg transition-all shadow"
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                >
                  Voeg toe aan winkelwagen
                </button>
                <Link
                  href={`/shop/${product.id}`}
                  className="bg-[#FFF275] hover:bg-[#ffe95c] text-[#3B5FFF] font-poppins font-bold py-2 px-4 rounded-lg transition-all shadow border border-[#3B5FFF]"
                >
                  Bekijk product
                </Link>
              </div>
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-400 mt-10">Geen producten gevonden in deze categorie.</div>
        )}
      </section>
    </main>
  );
}
