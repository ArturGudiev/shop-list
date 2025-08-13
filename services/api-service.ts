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

}
export default new ApiService();