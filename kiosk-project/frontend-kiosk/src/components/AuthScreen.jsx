import React from 'react';

export default function AuthScreen({ onSelectMode, onBack }) {
  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '2rem',
      backgroundColor: '#fdfbfb'
    }}>
      <h2 style={{ color: '#8b0000', marginBottom: '2rem', fontSize: '1.8rem', fontWeight: 'bold' }}>
        PARSERS MERCHANDISE PORTAL
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '320px' }}>
        <button 
          onClick={() => onSelectMode('login')} 
          style={{ 
            padding: '1.2rem', 
            fontSize: '1.2rem', 
            backgroundColor: '#fff', 
            color: '#8b0000', 
            border: '2px solid #8b0000', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}
        >
          Login
        </button>

        <button 
          onClick={() => onSelectMode('register')} 
          style={{ 
            padding: '1.2rem', 
            fontSize: '1.2rem', 
            backgroundColor: '#a91b1b', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(169,27,27,0.2)'
          }}
        >
          Register
        </button>
      </div>

      <button 
        onClick={onBack} 
        style={{ 
          marginTop: '2.5rem', 
          background: 'none', 
          border: 'none', 
          color: '#666', 
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '500'
        }}
      >
        &lt; Back to Home
      </button>
    </div>
  );
}