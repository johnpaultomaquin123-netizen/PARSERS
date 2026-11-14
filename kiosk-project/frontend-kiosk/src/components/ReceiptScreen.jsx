import React from 'react';

export default function ReceiptScreen({ onHome }) {
  return (
    <div style={{ height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#faf6f6', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '16px', textAlign: 'center', width: '420px', boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>
        <h3 style={{ color: '#a91b1b', marginBottom: '0.8rem', fontSize: '1.2rem', fontWeight: '800' }}>THANK YOU FOR PURCHASING PARSERS MERCHANDISE</h3>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.8rem', lineHeight: '1.4' }}>Please present this receipt to the COOP Office to verify your order.</p>
        
        <p style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#444', letterSpacing: '1px', margin: 0 }}>YOUR CODE NUMBER IS</p>
        <h1 style={{ fontSize: '2.8rem', letterSpacing: '6px', margin: '1rem 0', color: '#222', fontWeight: '800' }}>043679</h1>
        
        <div style={{ fontSize: '2.2rem', letterSpacing: '3px', margin: '1.2rem 0', color: '#333', fontFamily: 'monospace' }}>||||| ||| ||||</div>
        
        <button 
          onClick={onHome} 
          style={{ width: '100%', marginTop: '1.5rem', backgroundColor: '#a91b1b', color: '#fff', padding: '1rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(169,27,27,0.3)' }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}