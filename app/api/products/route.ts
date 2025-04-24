import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { Product } from "@/data/products";

// GET: alle producten ophalen
export async function GET() {
  const { rows } = await pool.query("SELECT * FROM products ORDER BY id ASC");
  return NextResponse.json(rows);
}

// POST: nieuw product toevoegen (optioneel, voor beheer)
export async function POST(req: NextRequest) {
  const data = await req.json() as Product;
  const { id, name, price, image, images, description, category } = data;
  await pool.query(
    "INSERT INTO products (id, name, price, image, images, description, category) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [id, name, price, image, images, description, category]
  );
  return NextResponse.json({ ok: true });
}
