import React, { useState } from 'react';

export default function LoginScreen({ onLogin, onBack, errorMessage }) {
  const [schoolId, setSchoolId] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!schoolId) return;
    setShowKeyboard(false);
    onLogin(schoolId);
  };

  const handleKeyPress = (key) => {
    if (key === 'BACKSPACE') {
      setSchoolId((prev) => prev.slice(0, -1));
    } else if (key === 'CLEAR') {
      setSchoolId('');
    } else if (key === 'ENTER') {
      handleSubmit();
    } else if (/^\d$/.test(key)) {
      setSchoolId((prev) => prev + key);
    }
  };

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['CLEAR', '0', 'BACKSPACE']
  ];

  return (
    <div 
      onClick={() => setShowKeyboard(false)} // Clicking anywhere outside closes the keypad
      style={{ 
        height: '100%', 
        padding: '2rem', 
        backgroundColor: '#fdfbfb', 
        boxSizing: 'border-box', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onBack();
        }} 
        style={{ background: 'none', border: 'none', color: '#a91b1b', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', alignSelf: 'flex-start' }}
      >
        &lt; Back
      </button>
      
      <div 
        style={{ maxWidth: '400px', margin: showKeyboard ? '1rem auto' : '4rem auto', textAlign: 'center', width: '100%', transition: 'margin 0.2s ease' }}
      >
        <h2 style={{ color: '#a91b1b', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '800' }}>Login</h2>
        
        {errorMessage && (
          <p style={{ color: '#d9534f', backgroundColor: '#f9dede', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem' }}>
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <label style={{ fontWeight: 'bold', color: '#333' }}>School ID:</label>
          <input 
            type="text" 
            inputMode="numeric"
            pattern="[0-9]*"
            value={schoolId} 
            onFocus={() => setShowKeyboard(true)}
            onClick={(e) => {
              e.stopPropagation();
              setShowKeyboard(true);
            }}
            onChange={(e) => setSchoolId(e.target.value.replace(/\D/g, ''))}
            readOnly
            placeholder="e.g. 7230489" 
            required 
            style={{ 
              padding: '0.9rem', 
              borderRadius: '8px', 
              border: showKeyboard ? '2px solid #a91b1b' : '1px solid #ccc', 
              fontSize: '1.1rem', 
              outline: 'none',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }} 
          />
          <button 
            type="submit" 
            onClick={(e) => e.stopPropagation()}
            style={{ marginTop: '0.5rem', padding: '1rem', backgroundColor: '#a91b1b', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Login
          </button>
        </form>
      </div>

      {/* On-Screen Kiosk Keypad with Enter Button */}
      {showKeyboard && (
        <div 
          onClick={(e) => e.stopPropagation()} // Clicking inside the keypad prevents it from closing
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#ece6e6',
            padding: '1rem 1.2rem 1.2rem 1.2rem',
            boxShadow: '0 -4px 16px rgba(0,0,0,0.12)',
            borderTop: '2px solid #d8cccc',
            zIndex: 200,
            boxSizing: 'border-box'
          }}
        >
          <div style={{ maxWidth: '420px', margin: '0 auto' }}>
            {/* Numeric Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {keys.flat().map((key) => {
                const isAction = key === 'BACKSPACE' || key === 'CLEAR';
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleKeyPress(key)}
                    style={{
                      padding: '0.85rem',
                      fontSize: isAction ? '0.95rem' : '1.3rem',
                      fontWeight: 'bold',
                      backgroundColor: isAction ? '#f5dada' : '#fff',
                      color: isAction ? '#a91b1b' : '#222',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    {key === 'BACKSPACE' ? '⌫' : key === 'CLEAR' ? 'Clear' : key}
                  </button>
                );
              })}
            </div>

            {/* Full-width Enter Button */}
            <button
              type="button"
              onClick={() => handleKeyPress('ENTER')}
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: '#a91b1b',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(169,27,27,0.3)',
                cursor: 'pointer',
                letterSpacing: '1px'
              }}
            >
              ENTER ↵
            </button>
          </div>
        </div>
      )}
    </div>
  );
}