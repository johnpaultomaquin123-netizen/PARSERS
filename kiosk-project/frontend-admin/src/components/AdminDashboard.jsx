import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5099/api/inventory';

const SUB_CATEGORIES = {
  Shirts: ['Polo Shirts', 'T-Shirts', 'Jersey', 'Uniform'],
  Caps: [],
  Lanyards: [],
  Keychains: [],
  Bags: ['Tote Bag', 'Sling Bag', 'Backpack'],
  Pins: []
};

export default function AdminDashboard({ onLogout }) {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'Shirts',
    subCategory: 'Polo Shirts',
    price: '',
    image: '',
    stock: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch items on load
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_BASE}`);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
      setErrorMessage('Failed to load items from server.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      const availableSubs = SUB_CATEGORIES[value] || [];
      setFormData({
        ...formData,
        category: value,
        subCategory: availableSubs.length > 0 ? availableSubs[0] : 'None'
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file.name });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    const parsedPrice = parseFloat(formData.price);
    const parsedStock = parseInt(formData.stock || 0);

    // Validate that price and stock cannot be negative
    if (parsedPrice < 0 || parsedStock < 0) {
      setErrorMessage('Price and Stock quantity must never be negative.');
      return;
    }

    try {
      const payload = {
  ...formData,
  imageUrl: formData.image, // Map frontend 'image' to backend 'imageUrl'
  price: parsedPrice,
  stock: parsedStock
};

      if (isEditing) {
        await axios.put(`${API_BASE}/${formData.id}`, payload);
      } else {
        await axios.post(`${API_BASE}`, payload);
      }
      resetForm();
      fetchItems();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to save item.');
    }
  };

  const handleEdit = (item) => {
    const availableSubs = SUB_CATEGORIES[item.category] || [];
    setFormData({
      ...item,
      subCategory: availableSubs.length > 0 ? item.subCategory : 'None'
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this kiosk item?')) {
      try {
        await axios.delete(`${API_BASE}/${id}`);
        fetchItems();
      } catch (err) {
        setErrorMessage('Failed to delete item.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      category: 'Shirts',
      subCategory: 'Polo Shirts',
      price: '',
      image: '',
      stock: ''
    });
    setIsEditing(false);
    setErrorMessage('');
  };

  const currentSubCategories = SUB_CATEGORIES[formData.category] || [];

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#fdfbfb', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflow: 'hidden' }}>
      
      {/* Admin Top Header */}
      <div style={{ backgroundColor: '#a91b1b', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800' }}>PARSERS MERCHANDISE - Admin Inventory</h2>
        <button 
          onClick={onLogout}
          style={{ backgroundColor: '#fff', color: '#a91b1b', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Exit Admin X
        </button>
      </div>

      {errorMessage && (
        <div style={{ backgroundColor: '#f9dede', color: '#d9534f', padding: '0.8rem', textAlign: 'center', fontWeight: 'bold' }}>
          {errorMessage}
        </div>
      )}

      {/* Main Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
        
        {/* Left Column: Add / Edit Form */}
        <div style={{ backgroundColor: '#fff', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
          <h3 style={{ color: '#a91b1b', marginTop: 0 }}>{isEditing ? 'Edit Kiosk Item' : 'Add New Item'}</h3>
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#444' }}>Item Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Org Polo Shirt" style={inputStyle} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#444' }}>Category:</label>
                <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                  <option value="Shirts">Shirts</option>
                  <option value="Caps">Caps</option>
                  <option value="Lanyards">Lanyards</option>
                  <option value="Keychains">Keychains</option>
                  <option value="Bags">Bags</option>
                  <option value="Pins">Pins</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#444' }}>Sub-Category:</label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  disabled={currentSubCategories.length === 0}
                  style={{
                    ...inputStyle,
                    backgroundColor: currentSubCategories.length === 0 ? '#f2f2f2' : '#fff',
                    color: currentSubCategories.length === 0 ? '#888' : '#000',
                    cursor: currentSubCategories.length === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {currentSubCategories.length > 0 ? (
                    currentSubCategories.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))
                  ) : (
                    <option value="None">No Sub-Category</option>
                  )}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#444' }}>Price (PHP):</label>
                <input 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  required 
                  placeholder="250.00" 
                  style={inputStyle} 
                />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#444' }}>Stock Qty:</label>
                <input 
                  type="number" 
                  min="0" 
                  name="stock" 
                  value={formData.stock} 
                  onChange={handleChange} 
                  required 
                  placeholder="50" 
                  style={inputStyle} 
                />
              </div>
            </div>

            {/* Upload Image Button Feature */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#444' }}>Product Image File:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  id="adminImageUpload" 
                  style={{ display: 'none' }} 
                  onChange={handleImageUpload} 
                />
                <label 
                  htmlFor="adminImageUpload" 
                  style={{
                    flex: 1,
                    padding: '0.6rem',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: '#333'
                  }}
                >
                  {formData.image ? `📁 ${formData.image}` : '📁 Upload Image File'}
                </label>
                {formData.image && (
                  <button 
                    type="button" 
                    onClick={() => setFormData({ ...formData, image: '' })}
                    style={{ padding: '0.6rem 0.8rem', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button type="submit" style={{ flex: 1, padding: '0.8rem', backgroundColor: '#a91b1b', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                {isEditing ? 'Update Item' : 'Add Item'}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} style={{ padding: '0.8rem', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Inventory List Table */}
        <div style={{ backgroundColor: '#fff', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ color: '#a91b1b', marginTop: 0 }}>Existing Kiosk Inventory ({items.length})</h3>
          
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: '520px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '0.6rem' }}>Name</th>
                  <th style={{ padding: '0.6rem' }}>Category</th>
                  <th style={{ padding: '0.6rem' }}>Price</th>
                  <th style={{ padding: '0.6rem' }}>Stock</th>
                  <th style={{ padding: '0.6rem', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.6rem', fontWeight: 'bold' }}>{item.name}</td>
                    <td style={{ padding: '0.6rem' }}>
                      {item.category}{' '}
                      {item.subCategory && item.subCategory !== 'None' && (
                        <span style={{ fontSize: '0.75rem', color: '#777' }}>({item.subCategory})</span>
                      )}
                    </td>
                    <td style={{ padding: '0.6rem' }}>PHP {Number(item.price).toFixed(2)}</td>
                    <td style={{ padding: '0.6rem' }}>{item.stock}</td>
                    <td style={{ padding: '0.6rem', textAlign: 'center' }}>
                      <button onClick={() => handleEdit(item)} style={{ padding: '0.3rem 0.6rem', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', marginRight: '4px' }}>Edit</button>
                      <button onClick={() => handleDelete(item.id)} style={{ padding: '0.3rem 0.6rem', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#777' }}>No items found in inventory. Add your first item on the left!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.6rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box'
};