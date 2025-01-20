import ShipEngine from "shipengine";
import { NextRequest} from "next/server";
const shipEngine = new ShipEngine(process.env.SHIPENGINE_API_KEY as string);
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const shipmentDetails = await shipEngine.getRatesWithShipmentDetails({
      rateOptions: {
        carrierIds: [
          process.env.SHIPENGINE_FIRST_COURIER as string,
          process.env.SHIPENGINE_SECOND_COURIER as string,
          process.env.SHIPENGINE_THIRD_COURIER as string,
          process.env.SHIPENGINE_FOURTH_COURIER as string,
        ].filter(Boolean),
      },
      shipment: {
        validateAddress: "no_validation",
        shipTo: {
          ...body,
        },
        shipFrom: {
          companyName: "Example Corp.",
          name: "John Doe",
          phone: "111-111-1111",
          addressLine1: "4009 Marathon Blvd",
          addressLine2: "Suite 300",
          cityLocality: "Austin",
          stateProvince: "TX",
          postalCode: "78756",
          countryCode: "US",
          addressResidentialIndicator: "no",
        },
        packages: [
          {
            weight: {
              value: 1.0,
              unit: "ounce",
            },
          },
        ],
      },
    });
    return new Response(JSON.stringify(shipmentDetails), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
