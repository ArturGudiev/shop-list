import { NextResponse } from "next/server";

export async function GET() {
  const data = { message: "Hello from API route!" };
  return NextResponse.json(data, {
    headers: {
      // make it cacheable if you want a "static" response
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=60",
    },
  });
}
