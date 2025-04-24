"use client";
import React, { useRef, useEffect } from "react";
import { useCart } from "./CartContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { items, removeFromCart, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black opacity-40 z-40 transition-colors duration-300" />
      )}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ boxShadow: "0 0 40px 0 rgba(59,95,255,0.12)" }}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-2xl font-luckiest-guy text-[#3B5FFF]">Winkelwagen</h2>
          <button
            onClick={onClose}
            className="text-3xl text-[#FF5CA2] hover:text-[#3B5FFF] transition"
            aria-label="Sluiten"
          >
            &times;
          </button>
        </div>
        <div className="p-5 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg width="56" height="56" fill="none" viewBox="0 0 24 24" className="mb-2">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.16 14l.84-2h7.45c.75 0 1.41-.41 1.75-1.03l3.24-5.88A1 1 0 0 0 20.5 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.26-.25z" fill="#FF5CA2"/>
              </svg>
              <span>Je winkelwagen is leeg.</span>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 bg-[#F8F8F8] rounded-lg p-3 shadow-sm">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-contain rounded"
                    />
                  )}
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-[#3B5FFF]">{item.name}</div>
                    <div className="text-xs text-gray-500 mb-1">
                      €{item.price.toFixed(2)} per stuk
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 rounded bg-[#FF5CA2] text-white font-bold text-lg disabled:opacity-50"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Verwijder"
                      >
                        −
                      </button>
                      <span className="w-8 text-center rounded bg-[#FFF275] text-[#3B5FFF] font-bold border-0 px-2 py-1">
                        {item.quantity}
                      </span>
                      <button
                        className="px-2 py-1 rounded bg-[#3B5FFF] text-white font-bold text-lg"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Meer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-200 bg-[#F8F8F8] rounded-b-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-[#1E1E1E]">Totaal:</span>
              <span className="font-bold text-lg text-[#FF5CA2]">€{total.toFixed(2)}</span>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg font-bold mb-2 transition"
              onClick={clearCart}
            >
              Winkelwagen legen
            </button>
            <button
              className="bg-[#3B5FFF] hover:bg-[#2e4ce6] text-white w-full py-2 rounded-lg font-bold transition"
            >
              Betalen
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
