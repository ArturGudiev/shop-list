"use client"
import Link from "next/link";
import "./styles.css";
import { useEffect, useState } from "react";
import { Item } from "@/lib/prisma";
import { Button } from "primereact/button";
// import { useNavigate } from 'react-router-dom';
async function getItems(): Promise<Item[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/items`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
}

export default function Items() {
    const [items, setItems] = useState<Item[]>([]);
    // const navigate = useNavigate();
    useEffect(() => {
        getItems().then(r => setItems(r))
    }, [])

    fetch("/api/hello")
        .then(r => r.json())
        .then(data => console.log('11111', data));


    return (
        <div style={{ margin: '2rem 2rem 0 2rem' }}>
            <div>Items</div>
            <ul>
                {items.map(el => <li key={el.id}>{el.name} {el.place}</li>)}
            </ul>
            <Link
                style={{ marginTop: '2rem', display: 'block' }}
                href="/items/add"
            >Add item</Link>

            <table style={{ marginTop: '1rem' }}>
                <caption>Items table</caption>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                    </tr>
                </thead>
                <tbody>

                    {items.map(el => (
                        <tr key={el.id}>
                            <td>{el.name}</td>
                            <td>{el.place}</td>
                        </tr>

                    ))}

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>Quarter total</td>
                        <td>{items.length}</td>
                    </tr>
                </tfoot>
            </table>

            <Button 
            // onClick={() => navigate('items')} 
            label="Add item(s)" />
        </div>
    );
}