import React, { useState } from 'react';

export default function ProductModal({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div style={{ backgroundColor: '#fff', padding: '2.5rem 2rem', borderRadius: '16px', width: '380px', textAlign: 'center', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#666' }}
        >
          ✕
        </button>
        <div style={{ height: '160px', background: '#f5f5f5', borderRadius: '12px', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
          👕
        </div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#222', margin: '0 0 8px 0' }}>{item.name}</h3>
        <p style={{ color: '#a91b1b', fontWeight: 'bold', fontSize: '1.3rem', margin: '0 0 1.5rem 0' }}>₱{item.price.toFixed(2)}</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '1.8rem' }}>
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))} 
            style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}
          >
            -
          </button>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold', minWidth: '30px' }}>{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)} 
            style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}
          >
            +
          </button>
        </div>

        <button 
          onClick={() => onAddToCart(item, quantity)} 
          style={{ width: '100%', backgroundColor: '#a91b1b', color: '#fff', padding: '1rem', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(169,27,27,0.3)' }}
        >
          🛒 Add to cart
        </button>
      </div>
    </div>
  );
}