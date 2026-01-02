"use client"
import { Item } from "@/lib/prisma";
import apiService from "@/services/api-service";
import { ItemWithoutId } from "@/types/modified-types";
import { useRouter } from 'next/navigation';
import { Button } from "primereact/button";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useState } from "react";
import AddItemDialog from "./add-item-dialog";
import "./items-styles.css";

async function getItems(): Promise<Item[]> {
    try {
        const response = await fetch('/api/items', {
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

const emptyItem = {
    name: '',
    place: '',
    category: '',
};


export default function Items() {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [, setSubmitted] = useState(false);

    const [, setItem] = useState<ItemWithoutId>(emptyItem); // TODO 
    const [productDialog, setProductDialog] = useState(false);

    const openNew = () => {
        setItem(emptyItem);
        setSubmitted(false);
        setProductDialog(true);
    };

    const router = useRouter();
    function refreshItems() {
        getItems().then(r => setItems(r));
    }
    useEffect(() => {
        refreshItems();
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                openNew();
            }
            if (e.altKey && e.key === 's') {
                console.log('Here')
                e.preventDefault();
                onCheckboxFocus();
            }
            if (e.altKey && e.key === 'Delete') {
                e.preventDefault();
                onDeleteSelected();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedItems, items])

    // fetch("/api/hello")
    //     .then(r => r.json())

   
    function onDeleteSelected() {
        console.log(selectedItems);
        if (selectedItems.length > 0) {
            apiService.deleteItems(selectedItems.map(el => el.id)).then(() => refreshItems());
        }
    }

    function onCheckboxFocus() {
        const a = document.querySelector('.p-checkbox-input') as HTMLInputElement | null;
        a?.focus();
    }

    const startToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" onClick={onDeleteSelected} severity="danger" />
            </div>
        );
    };

    const endToolbarTemplate = () => {
        return <div></div>;
    };

    const footer = `In total there are ${items ? items.length : 0} items to buy.`;
    return (<>
        <div style={{ margin: '2rem 2rem 0 2rem' }}>
            <Toolbar className="mb-4" start={startToolbarTemplate} end={endToolbarTemplate}></Toolbar>
            <DataTable
                dataKey="id"
                value={items}
                tableStyle={{ minWidth: '50rem' }}
                selectionMode="multiple"
                selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value as Item[])}
                footer={footer}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="name" sortable header="Name"></Column>
                <Column field="place" sortable header="Place"></Column>
                <Column field="category" sortable header="Category"></Column>
            </DataTable>

        </div>

        <AddItemDialog
            visible={productDialog}
            setVisible={setProductDialog}
            setForm={setItem}
            refreshItems={refreshItems}
        ></AddItemDialog>
    </>
    );
}
