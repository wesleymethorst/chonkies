"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import React, { useState, useEffect, useRef, Suspense } from "react";
import type { Product } from "@/types/Product";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ShopContent() {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showSort, setShowSort] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  // Sluit dropdowns bij klik buiten
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setShowSort(false);
      if (catRef.current && !catRef.current.contains(e.target as Node)) setShowCat(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const start = Date.now();
      const res = await fetch("/api/products");
      const data = await res.json();
      // Filter: alleen producten die NIET in de sale zijn
      const filtered = data.filter(
        (product: Product) => {
          // Toon producten als sale_price niet bestaat of leeg/"null"
          if (
            product.sale_price === null ||
            product.sale_price === undefined
          ) {
            return true;
          }
          if (
            typeof product.sale_price === "string" &&
            (product.sale_price === "" || product.sale_price === "null")
          ) {
            return true;
          }
          // Ook als sale_price 0 (of 0.0) is, tonen (optioneel, afhankelijk van je data)
          if (
            typeof product.sale_price === "number" && Number(product.sale_price) === 0
          ) {
            return true;
          }
          return false;
        }
      );
      setProducts(filtered);
      const elapsed = Date.now() - start;
      const minDelay = 2000; // 2 seconden
      if (elapsed < minDelay) {
        setTimeout(() => setLoading(false), minDelay - elapsed);
      } else {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Categorieën ophalen voor bovenaan de shop pagina
  const categories = [
    "Alles",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // Filter op categorie uit querystring
  const selectedCategory = searchParams?.get("category") || "Alles";
  const sort = searchParams?.get("sort") || "naam-asc";

  let filteredProducts = products;
  if (selectedCategory !== "Alles") {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  }

  // Sorteren op naam of prijs
  if (sort === "naam-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.display_name.localeCompare(b.display_name));
  } else if (sort === "naam-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.display_name.localeCompare(a.display_name));
  } else if (sort === "prijs-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === "prijs-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => Number(b.price) - Number(a.price));
  }

  // Handler voor sorteren
  function handleSortChange(val: string) {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("sort", val);
    router.push(`/shop?${params.toString()}`);
    setShowSort(false);
  }
  function handleCategoryChange(val: string) {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (val === "Alles") {
      params.delete("category");
    } else {
      params.set("category", val);
    }
    router.push(`/shop?${params.toString()}`);
    setShowCat(false);
  }

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
  ];
  if (selectedCategory !== "Alles") {
    breadcrumb.push({
      name: selectedCategory,
      href: `/shop?category=${encodeURIComponent(selectedCategory)}`,
    });
  }

  if (loading) {
    return (
      <main className="bg-[#F8F8F8] flex flex-col items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FF5CA2] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#3B5FFF] font-bold">Producten worden geladen...</span>
        </div>
      </main>
    );
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

      {/* Filterbar */}
      <div className="max-w-7xl mx-auto mb-8 px-2 flex flex-wrap items-center gap-4 pt-6">
        {/* Sorteer dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            className="px-4 py-2 rounded-full font-bold border border-[#3B5FFF] bg-white text-[#3B5FFF] flex items-center gap-2 min-w-[120px]"
            onClick={() => setShowSort((v) => !v)}
            type="button"
          >
            Sorteer op
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#3B5FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {showSort && (
            <div className="absolute left-0 mt-2 bg-white text-[#3B5FFF] rounded-lg shadow-lg py-2 min-w-[160px] z-30">
              <button className={`block w-full text-left px-4 py-2 hover:bg-[#FFF275] hover:text-[#FF5CA2] transition ${sort==="naam-asc"?"font-bold":""}`} onClick={() => handleSortChange("naam-asc")}>Naam A-Z</button>
              <button className={`block w-full text-left px-4 py-2 hover:bg-[#FFF275] hover:text-[#FF5CA2] transition ${sort==="naam-desc"?"font-bold":""}`} onClick={() => handleSortChange("naam-desc")}>Naam Z-A</button>
              <button className={`block w-full text-left px-4 py-2 hover:bg-[#FFF275] hover:text-[#FF5CA2] transition ${sort==="prijs-asc"?"font-bold":""}`} onClick={() => handleSortChange("prijs-asc")}>Prijs laag-hoog</button>
              <button className={`block w-full text-left px-4 py-2 hover:bg-[#FFF275] hover:text-[#FF5CA2] transition ${sort==="prijs-desc"?"font-bold":""}`} onClick={() => handleSortChange("prijs-desc")}>Prijs hoog-laag</button>
            </div>
          )}
        </div>
        {/* Categorie dropdown */}
        <div className="relative" ref={catRef}>
          <button
            className="px-4 py-2 rounded-full font-bold border border-[#3B5FFF] bg-white text-[#3B5FFF] flex items-center gap-2 min-w-[120px]"
            onClick={() => setShowCat((v) => !v)}
            type="button"
          >
            Categorie
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#3B5FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {showCat && (
            <div className="absolute left-0 mt-2 bg-white text-[#3B5FFF] rounded-lg shadow-lg py-2 min-w-[160px] z-30 max-h-60 overflow-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`block w-full text-left px-4 py-2 hover:bg-[#FFF275] hover:text-[#FF5CA2] transition ${selectedCategory===cat?"font-bold":""}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="ml-auto text-[#3B5FFF] font-bold text-base">
          ({filteredProducts.length}) resultaten
        </span>
      </div>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto mb-6 px-2 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-[#3B5FFF]">
          {breadcrumb.map((b, idx) => (
            <React.Fragment key={b.href}>
              <li>
                <Link href={b.href} className={idx === breadcrumb.length - 1 ? "text-[#FF5CA2] font-semibold" : "hover:underline"}>
                  {b.name}
                </Link>
              </li>
              {idx < breadcrumb.length - 1 && (
                <span className="mx-1 text-gray-400">/</span>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>

      {/* Producten grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => {
            const img1 = `/products/${product.category.toLowerCase()}/${product.name}-1.png`;
            const img2 = `/products/${product.category.toLowerCase()}/${product.name}-2.png`;
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 text-center border-2 border-[#FFF275] hover:shadow-2xl transition"
                onMouseEnter={() => setHovered(String(product.id))}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="w-full flex justify-center mb-4">
                  <div className="bg-[#F8F8F8] rounded-xl p-4 flex items-center justify-center shadow-inner relative h-[160px] w-[160px]">
                    <Image
                      src={img1}
                      alt={product.display_name}
                      width={160}
                      height={160}
                      className={`object-contain absolute inset-0 transition-opacity duration-300 ${
                        hovered === String(product.id) ? "opacity-0" : "opacity-100"
                      }`}
                      draggable={false}
                    />
                    <Image
                      src={img2}
                      alt={product.display_name + " extra"}
                      width={160}
                      height={160}
                      className={`object-contain absolute inset-0 transition-opacity duration-300 ${
                        hovered === String(product.id) ? "opacity-100" : "opacity-0"
                      }`}
                      draggable={false}
                    />
                  </div>
                </div>
                <h2 className="font-luckiest-guy text-2xl text-[#3B5FFF] mb-1">{product.display_name}</h2>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="text-[#FF5CA2] font-bold text-2xl">
                  €{Number(product.price).toFixed(2)}
                </div>
                <div className="flex gap-3 mt-auto">
                  <button
                    className="bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white font-poppins font-bold py-2 px-4 rounded-lg transition-all shadow"
                    onClick={() => addToCart({ ...product, id: String(product.id), quantity: 1 })}
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
            );
          })}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-400 mt-10">Geen producten gevonden in deze categorie.</div>
        )}
      </section>
    </main>
  );
}

export default function Shop() {
  return (
    <main className="bg-[#F8F8F8] min-h-screen flex flex-col">
      <Header />
      <Suspense
        fallback={
          <main className="bg-[#F8F8F8] flex flex-col items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#FF5CA2] border-t-transparent rounded-full animate-spin" />
              <span className="text-[#3B5FFF] font-bold">Producten worden geladen...</span>
            </div>
          </main>
        }
      >
        <ShopContent />
      </Suspense>
      <Footer />
    </main>
  );
}
