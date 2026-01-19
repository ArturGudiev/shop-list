import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum)) {
      return NextResponse.json(
        { error: "Invalid latitude or longitude" },
        { status: 400 }
      );
    }

    // Using OpenStreetMap Nominatim (free, no API key required)
    const NOMINATIM_URL = process.env.NOMINATIM_URL || "https://nominatim.openstreetmap.org/reverse";
    
    const params = new URLSearchParams({
      lat: lat,
      lon: lon,
      format: "json",
      addressdetails: "1"
    });

    const response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
      headers: {
        'User-Agent': 'ShopListApp/1.0' // Required by Nominatim
      }
    });

    if (!response.ok) {
      throw new Error(`Reverse geocoding service error: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.address) {
      return NextResponse.json({
        value: null,
        unrestricted_value: null,
        postal_code: null,
        country: null,
        region: null,
        city: null,
        street: null,
        house: null,
        geo_lat: latNum,
        geo_lon: lonNum,
      });
    }

    const addressData = data.address || {};

    return NextResponse.json({
      value: data.display_name || null,
      unrestricted_value: data.display_name || null,
      postal_code: addressData.postcode || null,
      country: addressData.country || null,
      region: addressData.state || addressData.region || null,
      city: addressData.city || addressData.town || addressData.village || null,
      street: addressData.road || addressData.street || null,
      house: addressData.house_number || null,
      geo_lat: parseFloat(data.lat) || latNum,
      geo_lon: parseFloat(data.lon) || lonNum,
    });
  } catch (error) {
    console.error('Error getting address from coordinates:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get address" },
      { status: 500 }
    );
  }
}

