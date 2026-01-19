import { Item } from "@/lib/prisma";

// services/apiService.js
class ApiService {
    baseUrl: string;

    constructor(baseUrl = '/api') {
        this.baseUrl = baseUrl;
    }

    async addItem(obj: Partial<Item>): Promise<Item> {
        // console.log('here');
        // return {};
        const res = await fetch(`${this.baseUrl}/items/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
        }
        
        return res.json();
    }

    async deleteItems(ids: number[]): Promise<Item[]> {
      const res = await fetch(`${this.baseUrl}/items/delete`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ids})
      });
      return res.json();
    }

    async getCoordFromAddress(address: string): Promise<{
      geo_lat: number | null;
      geo_lon: number | null;
      value: string | null;
      unrestricted_value: string | null;
      postal_code: string | null;
      country: string | null;
      region: string | null;
      city: string | null;
      street: string | null;
      house: string | null;
    }> {
      const res = await fetch(`${this.baseUrl}/coords/coord-from-address`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address })
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      
      return res.json();
    }

    async getAddressFromCoords(lat: number, lon: number): Promise<{
      value: string | null;
      unrestricted_value: string | null;
      postal_code: string | null;
      country: string | null;
      region: string | null;
      city: string | null;
      street: string | null;
      house: string | null;
      geo_lat: number | null;
      geo_lon: number | null;
    }> {
      const res = await fetch(`${this.baseUrl}/coords/address-from-coords?lat=${lat}&lon=${lon}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      
      return res.json();
    }

    async getCoords(address: string) {
        const res = await fetch("/api/geocode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address }),
        });
      
        if (!res.ok) throw new Error("Geocoding failed");
      
        return res.json();
      }

}
export default new ApiService();