"use client";
import React, { useRef, useEffect } from "react";
import { useCart } from "./CartContext";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  open: boolean;
  onClose: () => void;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { items, removeFromCart, clearCart, addToCart } = useCart();
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

  // Stripe checkout handler
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        console.error('Stripe failed to initialize');
        return;
      }

      console.log('Sending request to:', '/api/checkout');
      console.log('With items:', items);

      const response = await fetch('/api/checkout', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ items }),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      
      if (data.sessionId) {
        console.log('Got session ID:', data.sessionId);
        const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
        if (result.error) {
          console.error('Stripe redirect error:', result.error);
        }
      } else {
        console.error('No session ID received from API');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  // Dynamisch image path voor elk item
  const getImage = (item: any) => {
    if (item.category && item.name) {
      return `/products/${item.category.toLowerCase()}/${item.name}-1.png`;
    }
    return item.image || "";
  };

  // Helper om quantity direct te zetten
  const setQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    const item = items.find((i) => i.id === id);
    if (!item) return;
    removeFromCart(id);
    addToCart({ ...item, quantity });
  };

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
              {[...items]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => (
                  <li key={item.id} className="flex items-center gap-3 bg-[#F8F8F8] rounded-lg p-3 shadow-sm">
                    <img
                      src={getImage(item)}
                      alt={("display_name" in item ? (item as any).display_name : item.name)}
                      className="w-14 h-14 object-contain rounded"
                    />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-[#3B5FFF]">{("display_name" in item ? (item as any).display_name : item.name)}</div>
                      <div className="text-xs text-gray-500 mb-1">
                        €{Number(item.price).toFixed(2)} per stuk
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 rounded bg-[#FF5CA2] text-white font-bold text-lg disabled:opacity-50"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Minder"
                        >
                          −
                        </button>
                        <span className="w-8 text-center rounded bg-[#FFF275] text-[#3B5FFF] font-bold border-0 px-2 py-1">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2 py-1 rounded bg-[#3B5FFF] text-white font-bold text-lg"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          aria-label="Meer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="text-xs text-red-500 hover:underline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Verwijder
                    </button>
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
              onClick={handleCheckout}
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
