import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET: alle producten ophalen
export async function GET() {
  const { rows } = await pool.query("SELECT * FROM products ORDER BY id ASC");
  return NextResponse.json(rows);
}
