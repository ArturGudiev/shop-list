export async function POST(req: any) {
    const { address } = await req.json();
  
    const response = await fetch(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${process.env.DADATA_API_KEY}`,
        },
        body: JSON.stringify({
          query: address,
          count: 1,
        }),
      }
    );
  
    const data = await response.json();
  
    if (!data.suggestions?.length) {
      return Response.json({ error: "Address not found" }, { status: 404 });
    }
  
    const suggestion = data.suggestions[0];
  
    return Response.json({
      lat: suggestion.data.geo_lat,
      lon: suggestion.data.geo_lon,
      formatted: suggestion.value,
    });
  }
