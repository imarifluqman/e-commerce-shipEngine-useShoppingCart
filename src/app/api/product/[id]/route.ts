import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: { params: { id: string } }) {
  const { id } = res.params;
  try {
    const product = await client.fetch(
      '*[_type == "products" && _id == $id][0]',
      { id }
    );
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
