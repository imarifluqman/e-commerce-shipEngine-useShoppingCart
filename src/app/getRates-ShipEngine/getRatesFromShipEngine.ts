async function getRatesWithShipmentDetails(
  id: string,
  loding: (value: boolean) => void
) {
  loding(true);
  console.log("Order Now ID:", id);
  const shipTo = {
    name: "Arif Luqman",
    phone: "555-555-5555",
    addressLine1: "525 S Winchester Blvd",
    cityLocality: "San Jose",
    stateProvince: "CA",
    postalCode: "95128",
    countryCode: "US",
    addressResidentialIndicator: "yes",
  };

  try {
    const res = await fetch("https://e-commerce-ship-engine-use-shopping-cart.vercel.app/api/shipengine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shipTo),
    });

    const data = await res.json();

    loding(false);
    return data.rateResponse.rates;
  } catch (error) {
    console.error("Error:", error);
  }
}

export { getRatesWithShipmentDetails };
