"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import CartDrawer from './CartDrawer';
import { useCart } from './CartContext';

const Header: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();

  // Totaal aantal producten in de winkelwagen (alle aantallen bij elkaar opgeteld)
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-[#3B5FFF] text-white px-6 py-4 flex items-center justify-between">
      <div className="text-[#FF5CA2] text-2xl font-bold font-luckiest-guy">
        <Link href="/">
          CHONKIES
        </Link>
      </div>
      <nav className="space-x-8 font-semibold hidden md:flex">
        <Link href="/shop" className="hover:underline">Winkelen</Link>
        <Link href="/about" className="hover:underline">Over ons</Link>
        <Link href="/sale" className="hover:underline">Uitverkoop</Link>
      </nav>
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
        <Link href="/login">
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
