import React from 'react';

export default function CartView({ cart, appliedDiscount, onBack, onCancelOrder, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  return (
    <div style={{ height: '100%', padding: '2rem', background: '#faf6f6', overflowY: 'auto', boxSizing: 'border-box' }}>
      <button 
        onClick={onBack} 
        style={{ background: 'none', border: 'none', color: '#a91b1b', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
      >
        &lt; Back to Catalog
      </button>

      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h2 style={{ color: '#a91b1b', textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '800' }}>MY CART</h2>
        
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '1.2rem 1.5rem', borderRadius: '10px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#222' }}>{item.name}</h4>
              <p style={{ color: '#a91b1b', fontWeight: 'bold', margin: 0, fontSize: '0.95rem' }}>₱{item.price.toFixed(2)} x {item.quantity}</p>
            </div>
            <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333', margin: 0 }}>₱{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        {cart.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: '3rem 0' }}>Your cart is empty.</p>
        )}

        {cart.length > 0 && (
          <div style={{ backgroundColor: '#fff', padding: '1.8rem', borderRadius: '12px', marginTop: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: '#555' }}>
              <span>Product subtotal</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: '#2e7d32', fontWeight: '500' }}>
                <span>Discount applied</span>
                <span>-₱{appliedDiscount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.3rem', marginTop: '1.2rem', borderTop: '1px solid #eee', paddingTop: '1.2rem', color: '#222' }}>
              <span>Total:</span>
              <span style={{ color: '#a91b1b' }}>₱{finalTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.8rem' }}>
              <button 
                onClick={onCancelOrder} 
                style={{ flex: 1, backgroundColor: '#eee', color: '#333', padding: '1rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
              >
                Cancel Order
              </button>
              <button 
                onClick={onCheckout} 
                style={{ flex: 1, backgroundColor: '#a91b1b', color: '#fff', padding: '1rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 12px rgba(169,27,27,0.3)' }}
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}