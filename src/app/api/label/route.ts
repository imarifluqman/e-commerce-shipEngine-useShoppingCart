import ShipEngine from "shipengine";

const shipEngine = new ShipEngine(process.env.SHIPENGINE_API_KEY as string);

import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const params = {
    rateId: id,
    validateAddress: "no_validation",
    labelLayout: "4x6",
    labelFormat: "pdf",
    labelDownloadType: "url",
    displayScheme: "label",
  };

  try {
    const result = await shipEngine.createLabelFromRate(params as any);

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
