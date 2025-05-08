"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useFavorites } from "./FavoritesContext";

export default function FavoritesDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { favorites, toggleFavorite } = useFavorites();
  const [products, setProducts] = React.useState<any[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      fetch("/api/products")
        .then((r) => r.json())
        .then((data) => setProducts(data));
    }
  }, [open]);

  // Sluit drawer bij klik buiten
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  const favProducts = products.filter((p) => favorites.includes(String(p.id)));

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-[99] transition-opacity duration-300 ${
          open ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-[100] flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ minWidth: 320 }}
        tabIndex={-1}
        aria-label="Favorieten"
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-2xl font-luckiest-guy text-[#3B5FFF] flex items-center gap-2">
            Favorieten
          </h2>
          <button
            onClick={onClose}
            className="text-3xl text-[#FF5CA2] hover:text-[#3B5FFF] transition"
            aria-label="Sluiten"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {favProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 mt-10">
              <svg width="48px" height="48px" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 21s-5.05-4.35-7.07-6.36C2.07 12.07 2 9.5 4.07 7.43c2.07-2.07 5.43-2.07 7.5 0 2.07-2.07 5.43-2.07 7.5 0 2.07 2.07 2 4.64-.86 7.21C17.05 16.65 12 21 12 21z"
              fill="#FF5CA2"
              stroke="#FF5CA2"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
              <span className="mt-2">Nog geen favorieten.</span>
            </div>
          ) : (
            <ul className="space-y-4">
              {favProducts.map((item) => (
                <li key={item.id} className="flex items-center gap-3 bg-[#F8F8F8] rounded-lg p-3 shadow-sm">
                  <img
                    src={`/products/${item.category.toLowerCase()}/${item.name}-1.png`}
                    alt={item.display_name || item.name}
                    className="w-14 h-14 object-contain rounded"
                  />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-[#3B5FFF]">{item.display_name || item.name}</div>
                    <div className="text-xs text-gray-500 mb-1">
                      €{Number(item.price).toFixed(2)}
                    </div>
                    <Link
                      href={`/shop/${item.id}`}
                      className="text-[#FF5CA2] underline text-xs"
                      onClick={onClose}
                    >
                      Bekijk product
                    </Link>
                  </div>
                  {/* Verwijder knop */}
                  <button
                      className="text-xs text-red-500 hover:underline"
                      onClick={() => toggleFavorite(String(item.id))}
                      aria-label="Verwijder uit favorieten"
                    >
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M6 18L18 6" stroke="#FF5CA2" strokeWidth={2} strokeLinecap="round"/>
                      </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
