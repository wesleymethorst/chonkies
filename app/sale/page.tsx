"use client";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import React from "react";


// Voeg hier je sale producten toe (voorbeeld)
const saleProducts = [
  {
    id: "sale1",
    name: "Iron Man (Sale)",
    price: 11.99,
    oldPrice: 15.99,
    image: "/products/marvel/ironman.png",
    description: "Iron Man Funko Pop nu extra voordelig!",
  },
  {
    id: "sale2",
    name: "Chucky (Sale)",
    price: 13.99,
    oldPrice: 17.99,
    image: "/products/horror/chucky.png",
    description: "Chucky Funko Pop met korting.",
  },
  {
    id: "sale3",
    name: "Belle (Sale)",
    price: 9.99,
    oldPrice: 13.99,
    image: "/products/disney/belle.png",
    description: "Belle Funko Pop in de uitverkoop.",
  },
];

export default function Sale() {
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-[#F8F8F8] pb-16">
      <section className="bg-[#FF5CA2] py-12 px-4 mb-10 rounded-b-3xl shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-luckiest-guy text-white mb-4">Uitverkoop</h1>
          <p className="text-[#FFF275] font-poppins text-lg max-w-2xl mb-4">
            Scoor nu Funko Pops met hoge kortingen! OP=OP.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {saleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 text-center border-2 border-[#FF5CA2] hover:shadow-2xl transition"
            >
              <div className="w-full flex justify-center mb-4">
                <div className="bg-[#F8F8F8] rounded-xl p-4 flex items-center justify-center shadow-inner">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </div>
              </div>
              <h2 className="font-luckiest-guy text-2xl text-[#FF5CA2] mb-1">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="mb-4">
                <span className="text-[#FF5CA2] font-bold text-xl mr-2">€{product.price.toFixed(2)}</span>
                <span className="line-through text-gray-400 text-lg">€{product.oldPrice.toFixed(2)}</span>
              </div>
              <button
                className="bg-[#FF5CA2] hover:bg-[#e94b91] text-white font-poppins font-bold py-2 px-6 rounded-lg transition-all shadow"
                onClick={() => addToCart({ ...product, quantity: 1 })}
              >
                Voeg toe aan winkelwagen
              </button>
            </div>
          ))}
        </div>
        {saleProducts.length === 0 && (
          <div className="text-center text-gray-400 mt-10">Geen aanbiedingen gevonden.</div>
        )}
      </section>
    </main>
  );
}
