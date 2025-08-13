"use client"
import Link from "next/link";
import "./styles.css";
import { useEffect, useState } from "react";

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
    const [items, setItems] = useState([]);
    useEffect(() => {
        getItems().then(r => setItems(r))
    }, [])
    
    fetch("/api/hello")
  .then(r => r.json())
  .then(data => console.log('11111',data));


    return (
    <>
        <div>Items</div>
        <ul>
            {items.map(el => <li key={el.id}>{el.name}</li>)}
        </ul>
    </>
);
}