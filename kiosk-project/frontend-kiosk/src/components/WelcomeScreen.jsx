import React from 'react';

export default function WelcomeScreen({ onStart }) {
  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyModel: 'space-between', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      background: 'linear-gradient(135deg, #a91b1b 0%, #7a0c0c 100%)', 
      padding: '3rum',
      boxSizing: 'border-box'
    }}>
      {/* Top Header Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', justifyContent: 'flex-start' }}>
        <span style={{ fontSize: '2rem' }}>⚙️</span>
        <h2 style={{ color: '#fff', letterSpacing: '1px', fontSize: '1.2rem', margin: 0 }}>PARSERS MERCHANDISE</h2>
      </div>

      {/* Center Hero Text */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '1rem', fontWeight: '800' }}>WELCOME TO PARSERS MERCHANDISE</h1>
        <p style={{ color: '#ffcccc', fontSize: '1.2rem', margin: 0 }}>Tap below to start your self-service ordering kiosk.</p>
      </div>

      {/* Tap to Order Action Button */}
      <button 
        onClick={onStart} 
        style={{ 
          backgroundColor: '#fff', 
          color: '#8b0000', 
          padding: '1.2rem 3rem', 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          borderRadius: '50px', 
          border: 'none', 
          cursor: 'pointer', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        👉 TAP TO ORDER
      </button>
    </div>
  );
}