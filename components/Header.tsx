"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CartDrawer from './CartDrawer';
import { useCart } from './CartContext';

const Header: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();
  const [showCat, setShowCat] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Haal categorieën dynamisch op uit de API
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        const unique = Array.from(new Set(data.map((p: any) => p.category))) as string[];
        setCategories(unique);
      });
  }, []);

  // Sluit dropdown bij klik buiten
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setShowCat(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Totaal aantal producten in de winkelwagen (alle aantallen bij elkaar opgeteld)
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-[#3B5FFF] text-white px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-8 w-full">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-[#FF5CA2] text-2xl font-bold font-luckiest-guy tracking-wider">CHONKIES</span>
        </Link>
        <nav className="space-x-8 font-semibold hidden md:flex items-center ml-2">
          <div className="relative" ref={catRef}>
            <button
              className={`hover:underline flex items-center gap-1 ${pathname.startsWith("/shop") ? "underline" : ""}`}
              type="button"
              onClick={() => setShowCat((v) => !v)}
            >
              Winkelen
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#FFF275" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {showCat && (
              <div className="absolute left-0 mt-2 bg-white text-[#3B5FFF] rounded-lg shadow-lg py-2 min-w-[160px] z-30">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-[#FFF275] hover:text-[#FF5CA2] transition"
                  onClick={() => { router.push("/shop"); setShowCat(false); }}
                >
                  Alles
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className="block w-full text-left px-4 py-2 hover:bg-[#FFF275] hover:text-[#FF5CA2] transition"
                    onClick={() => { router.push(`/shop?category=${encodeURIComponent(cat)}`); setShowCat(false); }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link href="/about" className={`hover:underline ${pathname.startsWith("/about") ? "underline" : ""}`}>Over ons</Link>
          <Link href="/sale" className={`hover:underline ${pathname.startsWith("/sale") ? "underline" : ""}`}>Uitverkoop</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {/* Winkelwagen icoon */}
        <button
          className="relative"
          onClick={() => setCartOpen(true)}
          aria-label="Winkelwagen openen"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.16 14l.84-2h7.45c.75 0 1.41-.41 1.75-1.03l3.24-5.88A1 1 0 0 0 20.5 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.26-.25z" fill="#FF5CA2"/>
          </svg>
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FF5CA2] text-white text-xs rounded-full px-1.5">
              {totalCount}
            </span>
          )}
        </button>
        <Link href="/404">
          <button className="bg-[#FF5CA2] text-white font-bold px-5 py-2 rounded-lg hover:opacity-90 transition">
            LOGIN/<span className="font-extrabold">REGISTER</span>
          </button>
        </Link>
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
