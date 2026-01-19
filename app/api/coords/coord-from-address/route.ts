import { NextResponse } from "next/server";

interface AddressRequest {
  address: string;
}

export async function POST(req: Request) {
  try {
    const { address }: AddressRequest = await req.json();
    
    if (!address || typeof address !== "string") {
      return NextResponse.json(
        { error: "Invalid address" },
        { status: 400 }
      );
    }

    // Using OpenStreetMap Nominatim (free, no API key required)
    // You can replace this with Google Maps, Mapbox, or other services
    const NOMINATIM_URL = process.env.NOMINATIM_URL || "https://nominatim.openstreetmap.org/search";
    
    const params = new URLSearchParams({
      q: address,
      format: "json",
      limit: "1",
      addressdetails: "1"
    });

    const response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
      headers: {
        'User-Agent': 'ShopListApp/1.0' // Required by Nominatim
      }
    });

    if (!response.ok) {
      throw new Error(`Geocoding service error: ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json({
        geo_lat: null,
        geo_lon: null,
        value: null,
        unrestricted_value: null,
        postal_code: null,
        country: null,
        region: null,
        city: null,
        street: null,
        house: null,
      });
    }

    const result = data[0];
    const addressData = result.address || {};

    return NextResponse.json({
      geo_lat: parseFloat(result.lat) || null,
      geo_lon: parseFloat(result.lon) || null,
      value: result.display_name || null,
      unrestricted_value: result.display_name || null,
      postal_code: addressData.postcode || null,
      country: addressData.country || null,
      region: addressData.state || addressData.region || null,
      city: addressData.city || addressData.town || addressData.village || null,
      street: addressData.road || addressData.street || null,
      house: addressData.house_number || null,
    });
  } catch (error) {
    console.error('Error getting coordinates from address:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get coordinates" },
      { status: 500 }
    );
  }
}

