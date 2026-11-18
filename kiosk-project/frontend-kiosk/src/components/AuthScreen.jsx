import React from 'react';

export default function AuthScreen({ onSelectMode, onBack }) {
  return (
    <div style={{ height: '100%', padding: '4rem', backgroundColor: '#fdfbfb', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box', position: 'relative' }}>
      
      {/* Top Back Button */}
      <button 
        onClick={onBack} 
        style={{ position: 'absolute', top: '2rem', left: '2rem', background: 'none', border: 'none', color: '#a91b1b', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
      >
        &lt; Back to Welcome
      </button>

      <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ color: '#a91b1b', fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Get Started</h2>
        
        <button
          onClick={() => onSelectMode('login')}
          style={{ padding: '1.2rem', backgroundColor: '#a91b1b', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
        >
          Login with School ID
        </button>

        <button
          onClick={() => onSelectMode('register')}
          style={{ padding: '1.2rem', backgroundColor: '#fff', color: '#a91b1b', border: '2px solid #a91b1b', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer' }}
        >
          Register New ID
        </button>
      </div>

    </div>
  );
}