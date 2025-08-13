"use client"
import Link from "next/link";
import "./add-item.css";

export default function AddItem() {

    return (
        <>
            <form noValidate>
                <div style={{ marginBottom: 12 }}>
                    <label htmlFor="firstName">First name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        style={{ display: 'block', padding: 8, marginTop: 4 }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label htmlFor="lastName">Last name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"


                        style={{ display: 'block', padding: 8, marginTop: 4 }}
                    />
                </div>

                <button type="submit" style={{ padding: '8px 12px' }}>
                    {/* {submitting ? 'Sending...' : 'Submit'} */}
                    Submit
                </button>

                {/* {message && <p style={{ marginTop: 12 }}>{message}</p>} */}
            </form>
            <Link href="/items">Return to items</Link>
        </>
        
    );
}