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
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
