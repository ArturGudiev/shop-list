"use client";

import { useState } from "react";
import apiService from "@/services/api-service";

export default function GeocodingTest() {
  const [address, setAddress] = useState("Moscow, Russia");
  const [lat, setLat] = useState("55.7558");
  const [lon, setLon] = useState("37.6173");
  const [coordsResult, setCoordsResult] = useState<any>(null);
  const [addressResult, setAddressResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetCoords = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiService.getCoordFromAddress(address);
      setCoordsResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleGetAddress = async () => {
    setLoading(true);
    setError(null);
    try {
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);
      if (isNaN(latNum) || isNaN(lonNum)) {
        setError("Invalid coordinates");
        setLoading(false);
        return;
      }
      const result = await apiService.getAddressFromCoords(latNum, lonNum);
      setAddressResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold mb-4">Geocoding API Test</h2>
      
      {error && (
        <div className="p-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
          Error: {error}
        </div>
      )}

      {/* Get Coordinates from Address */}
      <div className="space-y-2">
        <h3 className="font-medium">Get Coordinates from Address</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button
            onClick={handleGetCoords}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Get Coords"}
          </button>
        </div>
        {coordsResult && (
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p><strong>Lat:</strong> {coordsResult.geo_lat}</p>
            <p><strong>Lon:</strong> {coordsResult.geo_lon}</p>
            <p><strong>Address:</strong> {coordsResult.value}</p>
            <p><strong>City:</strong> {coordsResult.city}</p>
            <p><strong>Country:</strong> {coordsResult.country}</p>
          </div>
        )}
      </div>

      {/* Get Address from Coordinates */}
      <div className="space-y-2">
        <h3 className="font-medium">Get Address from Coordinates</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Latitude"
            step="any"
            className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input
            type="number"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            placeholder="Longitude"
            step="any"
            className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button
            onClick={handleGetAddress}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Get Address"}
          </button>
        </div>
        {addressResult && (
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p><strong>Address:</strong> {addressResult.value}</p>
            <p><strong>City:</strong> {addressResult.city}</p>
            <p><strong>Region:</strong> {addressResult.region}</p>
            <p><strong>Country:</strong> {addressResult.country}</p>
            <p><strong>Street:</strong> {addressResult.street}</p>
            <p><strong>Postal Code:</strong> {addressResult.postal_code}</p>
          </div>
        )}
      </div>
    </div>
  );
}

