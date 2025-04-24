"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function Success() {
  const [showProducts, setShowProducts] = useState(false);
  const { items, clearCart } = useCart();

  // Dynamisch image path voor elk item
  const getImage = (item: any) => {
    if (item.category && item.name) {
      return `/products/${item.category.toLowerCase()}/${item.name}-1.png`;
    }
    return item.image || "";
  };

  useEffect(() => {
    // Leeg de winkelwagen na laden van deze pagina
    clearCart();
    // Toon producten kort na laden (voor animatie/UX)
    const t = setTimeout(() => setShowProducts(true), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg max-w-xl w-full p-8 flex flex-col items-center border-2 border-[#FFF275]">
        <div className="text-6xl mb-4 text-[#3B5FFF]">🎉</div>
        <h1 className="font-luckiest-guy text-3xl text-[#3B5FFF] mb-2 text-center">Bedankt voor je bestelling!</h1>
        <p className="text-gray-700 text-center mb-6">
          Je betaling is geslaagd. Je ontvangt zo snel mogelijk een bevestiging per e-mail.
        </p>
        {showProducts && items.length > 0 && (
          <div className="w-full mb-6">
            <h2 className="text-lg font-bold text-[#FF5CA2] mb-2 text-center">Je hebt besteld:</h2>
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-2">
                  <img
                    src={getImage(item)}
                    alt={item.display_name || item.name}
                    className="w-12 h-12 object-contain rounded"
                  />
                  <div className="flex-1">
                    <span className="font-semibold">{item.display_name || item.name}</span>
                    <span className="ml-2 text-sm text-gray-500">x{item.quantity}</span>
                  </div>
                  <span className="font-bold text-[#FF5CA2]">
                    €{(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link
          href="/shop"
          className="bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white font-poppins font-bold py-2 px-6 rounded-lg transition-all shadow mt-2"
        >
          Verder winkelen
        </Link>
      </div>
    </main>
  );
}
