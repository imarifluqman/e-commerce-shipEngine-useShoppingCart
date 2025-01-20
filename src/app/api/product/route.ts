import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = '*[_type == "products"]';
    const products = await client.fetch(query);
    return NextResponse.json(products);
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
