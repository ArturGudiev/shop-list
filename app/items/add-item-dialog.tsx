"use client"
import apiService from "@/services/api-service";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { useEffect, useRef, useState } from 'react';
import { Dialog } from "primereact/dialog";
import React from "react";
import { ItemWithoutId } from "@/types/modified-types";
import { useSession } from "next-auth/react";

const emptyItem = {
    name: '',
    place: '',
    category: '',
    userId: 0,
};

export default function AddItemDialog({ visible, setVisible, refreshItems }: {
    visible: boolean,
    setForm: React.Dispatch<React.SetStateAction<ItemWithoutId>>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    refreshItems: () => void,
}) {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [category, setCategory] = useState('');
    const [item, ] = useState<Partial<ItemWithoutId>>(emptyItem);
    const [, setSubmitted] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        nameInputRef.current?.focus();
        setName(item.name || '');
        setPlace(item.place || '');
        setCategory(item.category || '');
    }, [visible]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (name) {
                    saveProduct();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [])


    const hideDialog = () => {
        setSubmitted(false);
        setVisible(false);
    };

    function saveProduct() {
        const userId = session?.user?.id;
        if (!userId) {
            alert('You must be logged in to add items');
            return;
        }

        apiService.addItem({ 
            name, 
            place, 
            category: category || undefined,
            userId: Number(userId)
        })
            .then(() => {
                setVisible(false);
                refreshItems();
            })
            .catch((error) => {
                console.error('Error adding item:', error);
                alert(`Failed to add item: ${error.message || 'Unknown error'}`);
            });
    }

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button
                label="Save"
                disabled={!name}
                icon="pi pi-check"
                onClick={saveProduct}
            />
        </React.Fragment>
    );

    return (
        <Dialog
            visible={visible} style={{ width: '32rem' }}
            breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            header="Product Details" modal className="p-fluid"
            onShow={() => nameInputRef.current?.focus()}
            footer={productDialogFooter}
            onHide={hideDialog} >
            <div id="form-wrapper">
                <form noValidate>
                    <div style={{ marginBottom: 12 }}>
                        <label className="input-label" >Name</label>
                        <InputText
                            ref={nameInputRef}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <label className="input-label">Place</label>
                        <InputText
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <label className="input-label">Category</label>
                        <InputText
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div id="buttons-wrapper">
                    </div>
                </form>
            </div>
        </Dialog>


    );
}
