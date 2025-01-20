import ShipEngine from "shipengine";

const shipEngine = new ShipEngine(process.env.SHIPENGINE_API_KEY as string);
import { NextRequest, NextResponse } from "next/server";
type ValidateAddress = "no_validation" | "validate_only" | "validate_and_clean";
type LabelLayout = "4x6" | "letter";
type LabelFormat = "pdf" | "png" | "zpl";
type LabelDownloadType = "url" | "inline";
type DisplayScheme = "label" | "qr_code";

interface LabelWithoutShipment {
  validateAddress?: ValidateAddress;
  labelLayout?: LabelLayout;
  labelFormat?: LabelFormat;
  labelDownloadType?: LabelDownloadType;
  displayScheme?: DisplayScheme;
  rateId: string;
}
export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const params: LabelWithoutShipment = {
    rateId: id,
    validateAddress: "no_validation",
    labelLayout: "4x6",
    labelFormat: "pdf",
    labelDownloadType: "url",
    displayScheme: "label",
  };

  try {
    const result = await shipEngine.createLabelFromRate(params);

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e}, { status: 500 });
  }
}
