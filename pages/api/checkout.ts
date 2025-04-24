import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { items } = req.body as { items: { id: string; name: string; display_name: string; category: string; price: number; quantity: number }[] };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: { 
            name: item.display_name,
            images: [
              `https://chonkies.vercel.app/png/products/${item.category.toLowerCase()}/${item.name}-1.png`
            ]
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/shop`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (err: any) {
    // Log de echte fout voor debugging
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Stripe error", details: err.message });
  }
}
