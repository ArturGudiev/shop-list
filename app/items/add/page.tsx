"use client"
import Link from "next/link";
import "./add-item.css";
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Button } from "primereact/button";
import { useRouter } from 'next/navigation';


export default function AddItem() {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const router = useRouter();
    function handleSubmit(e: MouseEvent): void {
        e.preventDefault();
        console.log(name, place);
    }

    return (
        <div id="form-wrapper">
            <form noValidate>
                <div style={{ marginBottom: 12 }}>
                    <label className="input-label" >Name</label>
                    <InputText
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div  style={{ marginBottom: 12 }}>
                    <label className="input-label">Place</label>
                    <InputText
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    />
                </div>
                <div id="buttons-wrapper">
                <Button
                    onClick={e => handleSubmit(e)}
                    label="Submit" />
                <Button
                    id="return-button"
                    onClick={(e) => {e.preventDefault(); router.push('/items')}}
                    label="Return to items"
                />
                </div>

                {/* {message && <p style={{ marginTop: 12 }}>{message}</p>} */}
            </form>

        </div>

    );
}