"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CartDrawer from './CartDrawer';
import { useCart } from './CartContext';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const Header: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();
  const [showCat, setShowCat] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [accountDropdown, setAccountDropdown] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

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

  // Sluit account dropdown bij klik buiten
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountDropdown(false);
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
              className={`hover:underline flex items-center gap-1 ${pathname && pathname.startsWith("/shop") ? "underline" : ""}`}
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
          <Link href="/about" className={`hover:underline ${pathname && pathname.startsWith("/about") ? "underline" : ""}`}>Over ons</Link>
          <Link href="/sale" className={`hover:underline ${pathname && pathname.startsWith("/sale") ? "underline" : ""}`}>Uitverkoop</Link>
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
        {/* Favorieten icoon als button */}
        <button
          type="button"
          className="relative"
          aria-label="Favorieten"
          onClick={() => router.push("/404")}
        >
          <svg width="28px" height="28px" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 21s-5.05-4.35-7.07-6.36C2.07 12.07 2 9.5 4.07 7.43c2.07-2.07 5.43-2.07 7.5 0 2.07-2.07 5.43-2.07 7.5 0 2.07 2.07 2 4.64-.86 7.21C17.05 16.65 12 21 12 21z"
              fill="#FF5CA2"
              stroke="#FF5CA2"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {/* Account rechtsboven */}
        {status === "authenticated" ? (
          <div className="relative" ref={accountRef}>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#FFF275] bg-white overflow-hidden focus:outline-none"
              onClick={() => setAccountDropdown((v) => !v)}
              aria-label="Account menu"
            >
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Account"
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
              ) : (
                // Fallback Google icoon
                <Image
                  src="/svg/google.svg"
                  alt="Account"
                  width={24}
                  height={24}
                />
              )}
            </button>
            {accountDropdown && (
              <div className="absolute right-0 mt-3 bg-white rounded-2xl shadow-2xl min-w-[240px] z-40 border border-[#FFF275] animate-fade-in">
                <div className="flex flex-col items-center py-6 px-6">
                  <div className="mb-3">
                    <Image
                      src={session.user?.image || "/svg/google.svg"}
                      alt="Account"
                      width={56}
                      height={56}
                      className="rounded-full border-2 border-[#FF5CA2] shadow"
                    />
                  </div>
                  <span className="block font-bold text-[#3B5FFF] text-lg mb-1 truncate max-w-[180px] text-center">
                    {session.user?.name || session.user?.email}
                  </span>
                  <span className="block text-xs text-gray-400 mb-4 truncate max-w-[180px] text-center">
                    {session.user?.email}
                  </span>
                  <button
                    onClick={() => { setAccountDropdown(false); signOut(); }}
                    className="w-full mt-2 bg-[#FF5CA2] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#e04c8e] transition"
                  >
                    Uitloggen
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="relative"
            aria-label="Login/Register"
          >
            <svg height="28px" width="28px" viewBox="0 0 60.671 60.671" xmlns="http://www.w3.org/2000/svg">
              <g>
                <g>
                  <ellipse style={{ fill: "#FF5CA2" }} cx="30.336" cy="12.097" rx="11.997" ry="12.097" />
                  <path style={{ fill: "#FF5CA2" }} d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z" />
                </g>
              </g>
            </svg>
          </button>
        )}
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
