"use client"
import Link from "next/link";
import "./items-styles.css";
import { useEffect, useState } from "react";
import { Item } from "@/lib/prisma";
import { Button } from "primereact/button";
import { useRouter } from 'next/navigation';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const router = useRouter();
    useEffect(() => {
        getItems().then(r => setItems(r))
    }, [])

    fetch("/api/hello")
        .then(r => r.json())
        .then(data => console.log('11111', data));


    return (
        <div style={{ margin: '2rem 2rem 0 2rem' }}>
            <DataTable
                dataKey="id"
                value={items}
                tableStyle={{ minWidth: '50rem' }}
                selectionMode="multiple"
                selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value as Item[])}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="name" header="Name"></Column>
                <Column field="place" header="Place"></Column>
            </DataTable>

            <Button
                className="mt-8"
                id="add-items-button"
                onClick={(e) => {e.preventDefault(); router.push('/items/add')}}
                label="Add item(s)" />
        </div>
    );
}