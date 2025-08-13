"use client"
import apiService from "@/services/api-service";
import { useRouter } from 'next/navigation';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Dialog } from "primereact/dialog";
import React from "react";
import { ItemWithoutId } from "@/types/modified-types";

const emptyItem = {
    name: '',
    place: '',
};

export default function AddItemDialog({ visible, setVisible, setForm }: {
    visible: boolean,
    setForm: React.Dispatch<React.SetStateAction<ItemWithoutId>>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [item, setItem] = useState<Partial<ItemWithoutId>>(emptyItem); // TODO 
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    function handleSubmit(e: MouseEvent): void {
        e.preventDefault();
        console.log(name, place);
        apiService.addItem({ name, place }).then(() => router.push('/items'));
    }

    const hideDialog = () => {
        setSubmitted(false);
        setVisible(false);
    };

    function saveProduct() {
        console.log(name, place);
    }

    const productDialogFooter = (
        // onClick={hideDialog}
        // onClick={saveProduct}
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );

    return (

        <Dialog visible={visible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog} >
            <div id="form-wrapper">
                <form noValidate>
                    <div style={{ marginBottom: 12 }}>
                        <label className="input-label" >Name</label>
                        <InputText
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                        <label className="input-label">Place</label>
                        <InputText
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                        />
                    </div>
                    <div id="buttons-wrapper">
                    </div>
                </form>
            </div>
        </Dialog>


    );
}