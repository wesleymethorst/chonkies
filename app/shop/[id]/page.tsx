"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import type { Product } from "@/types/Product";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      const start = Date.now();
      const res = await fetch("/api/products");
      const products: Product[] = await res.json();
      const found = products.find((p) => String(p.id) === String(id));
      setProduct(found || null);
      const elapsed = Date.now() - start;
      const minDelay = 2000; // 2 seconden
      if (elapsed < minDelay) {
        setTimeout(() => setLoading(false), minDelay - elapsed);
      } else {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-[#F8F8F8] min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-col items-center justify-center flex-1 min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-[#FF5CA2] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#3B5FFF] font-bold">Product wordt geladen...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="bg-[#F8F8F8] min-h-screen flex flex-col">
        <div className="flex flex-col items-center justify-center flex-1 py-16 px-4 min-h-[60vh]">
          <h1 className="text-2xl font-bold text-[#FF5CA2] mb-4">Product niet gevonden</h1>
          <Link href="/shop" className="text-[#3B5FFF] underline">Terug naar shop</Link>
        </div>

      </main>
    );
  }

  const img1 = `/products/${product.category.toLowerCase()}/${product.name}-1.png`;
  const img2 = `/products/${product.category.toLowerCase()}/${product.name}-2.png`;
  const images = [img1, img2];

  return (
    <>
      <Header />
      <main className="bg-[#F8F8F8] min-h-screen flex flex-col flex-1">
        <div className="flex-1 flex flex-col py-8 px-2 sm:px-6">
          {/* Breadcrumb */}
          <nav className="max-w-6xl mx-auto mb-6 px-2 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[#3B5FFF]">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
                <span className="mx-1 text-gray-400">/</span>
              </li>
              <li>
                <Link href="/shop" className="hover:underline">Shop</Link>
                <span className="mx-1 text-gray-400">/</span>
              </li>
              <li>
                <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:underline">
                  {product.category}
                </Link>
                <span className="mx-1 text-gray-400">/</span>
              </li>
              <li className="text-[#FF5CA2] font-semibold truncate max-w-[120px]">{product.display_name}</li>
            </ol>
          </nav>
          <div className={`max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-10 md:gap-16 bg-white/90 rounded-3xl shadow-2xl border-2 ${
            (
              typeof product.sale_price === "number"
                ? product.sale_price !== null && product.sale_price !== undefined
                : typeof product.sale_price === "string"
                  ? product.sale_price !== "null" && product.sale_price !== ""
                  : false
            )
              ? "border-[#FF5CA2]"
              : "border-[#FFF275]"
          } p-6 md:p-12`}>
            {/* Sidebar met thumbnails */}
            <div className="flex flex-row md:flex-col gap-3 md:gap-4 items-center md:items-start order-2 md:order-1 mt-4 md:mt-0">
              {images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  className={`bg-[#F8F8F8] rounded-lg p-1 border transition
                    ${
                      (
                        typeof product.sale_price === "number"
                          ? product.sale_price !== null && product.sale_price !== undefined
                          : typeof product.sale_price === "string"
                            ? product.sale_price !== "null" && product.sale_price !== ""
                            : false
                      )
                        ? selectedImg === idx
                          ? "border-[#3B5FFF] ring-2 ring-[#3B5FFF]"
                          : "border-[#FF5CA2] hover:border-[#3B5FFF]"
                        : selectedImg === idx
                          ? "border-[#3B5FFF] ring-2 ring-[#3B5FFF]"
                          : "border-[#FFF275] hover:border-[#3B5FFF]"
                    }
                  `}
                  onClick={() => setSelectedImg(idx)}
                  aria-label={`Bekijk afbeelding ${idx + 1}`}
                  style={{ width: 56, height: 56 }}
                >
                  <Image
                    src={img}
                    alt={`${product.display_name} extra foto ${idx + 1}`}
                    width={52}
                    height={52}
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
            {/* Grote afbeelding */}
            <div className="flex-1 flex items-center justify-center order-1 md:order-2">
              <div
                className="bg-white rounded-2xl p-6 shadow-xl flex items-center justify-center w-full max-w-md min-h-[260px] border"
                style={{
                  borderColor:
                    product.sale_price && product.sale_price !== "null" && product.sale_price !== ""
                      ? "#FF5CA2"
                      : "#FFF275",
                }}
              >
                <Image
                  src={images[selectedImg]}
                  alt={product.display_name}
                  width={260}
                  height={260}
                  className="object-contain drop-shadow-xl transition-opacity duration-300"
                  priority
                />
              </div>
            </div>
            {/* Product info */}
            <div className="flex-1 flex flex-col justify-center order-3 max-w-xl mx-auto md:mx-0">
              <span className="uppercase text-xs font-bold text-[#3B5FFF] mb-2 tracking-widest">{product.category}</span>
              <h1 className="font-luckiest-guy text-4xl sm:text-5xl text-[#3B5FFF] mb-3">{product.display_name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#FF5CA2] font-bold text-3xl">€{Number(product.price).toFixed(2)}</span>
              </div>
              <div className="mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
              </div>
              <div className="flex items-center gap-4 mb-8">
                <button
                  className="bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white font-poppins font-bold py-3 px-8 rounded-lg transition-all shadow text-lg"
                  onClick={() => addToCart({ ...product, id: String(product.id), quantity: 1 })}
                >
                  Voeg toe aan winkelwagen
                </button>
                <Link href="/shop" className="text-[#3B5FFF] underline text-base">← Terug naar shop</Link>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#FF5CA2]" />
                  <span className="text-xs text-[#FF5CA2] font-semibold">Uniek bij Chonkies</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#3B5FFF]" />
                  <span className="text-xs text-[#3B5FFF] font-semibold">Snelle levering</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#FFF275]" />
                  <span className="text-xs text-[#FFF275] font-semibold">Gratis verzending vanaf €40</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
