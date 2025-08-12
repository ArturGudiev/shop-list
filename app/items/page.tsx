import Link from "next/link";
import "./styles.css";

async function getItems() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/items`, {
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

export default async function Items() {
    const items = await getItems();

    return (
        <div className="items-container">
            <div className="items-content">
                <div className="items-header">
                    <h1 className="items-title">Shop Items</h1>
                    <p className="items-subtitle">Manage your shopping list items</p>
                </div>
                
                <div className="items-table-container">
                    <table className="items-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Place</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                                        <div className="empty-state">
                                            <div className="empty-state-icon">🛒</div>
                                            <div className="empty-state-text">No items yet</div>
                                            <p>Start by adding your first shopping item!</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                items.map((item: any) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td className="item-name">{item.name}</td>
                                        <td className="item-place">{item.place || 'Anywhere'}</td>
                                        <td className="item-date">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="item-actions">
                                            <button className="action-btn edit-btn">✏️ Edit</button>
                                            <button className="action-btn delete-btn">🗑️ Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                <div className="add-item-section">
                    <Link id="add-item-link" href="/items/add" className="add-item-link">
                        ➕ Add New Item
                    </Link>
                </div>
            </div>
        </div>
    );
}