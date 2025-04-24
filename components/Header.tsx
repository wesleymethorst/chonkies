import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
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
      <div>
        <Link href="/login">
          <button className="bg-[#FF5CA2] text-white font-bold px-5 py-2 rounded-lg hover:opacity-90 transition">
            LOGIN/<span className="font-extrabold">REGISTER</span>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
