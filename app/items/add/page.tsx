import Link from "next/link";
import "./add-item.css";

export default function AddItem() {
    return (
        <div className="add-item-container">
            <div className="add-item-content">
                <div className="add-item-header">
                    <h1 className="add-item-title">Add New Item</h1>
                    <p className="add-item-subtitle">Add a new item to your shopping list</p>
                </div>

                <form className="add-item-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Item Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            placeholder="Enter item name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="place" className="form-label">
                            Place to Buy
                        </label>
                        <input
                            type="text"
                            id="place"
                            name="place"
                            className="form-input"
                            placeholder="e.g., Walmart, Target, Local Store"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            Add Item
                        </button>
                        
                        <Link href="/items" className="cancel-btn">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}