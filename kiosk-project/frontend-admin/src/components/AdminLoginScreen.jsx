import React, { useState } from 'react';

export default function AdminLoginScreen({ onLoginSuccess, errorMessage }) {
  const [pin, setPin] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);

  const handleKeyPress = (key) => {
    if (key === 'BACKSPACE') {
      setPin((prev) => prev.slice(0, -1));
    } else if (key === 'CLEAR') {
      setPin('');
    } else if (key === 'ENTER') {
      onLoginSuccess(pin);
    } else if (/^\d$/.test(key)) {
      if (pin.length < 4) {
        const newPin = pin + key;
        setPin(newPin);
        // Auto-submit when 4 digits are reached
        if (newPin.length === 4) {
          setTimeout(() => onLoginSuccess(newPin), 200);
        }
      }
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
      onClick={() => setShowKeypad(false)} // Clicking anywhere outside closes the keypad
      style={{ 
        height: '100%', 
        padding: '2rem', 
        backgroundColor: '#fdfbfb', 
        boxSizing: 'border-box', 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      
      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', width: '100%' }}>
        <h2 style={{ color: '#a91b1b', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: '800' }}>Admin Login</h2>
        <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Tap PIN boxes below to open keypad</p>
        
        {errorMessage && (
          <p style={{ color: '#d9534f', backgroundColor: '#f9dede', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem' }}>
            {errorMessage}
          </p>
        )}

        {/* Masked PIN Display Boxes (Clicking here opens the keypad) */}
        <div 
          onClick={(e) => {
            e.stopPropagation(); // Prevent outer click listener from firing
            setShowKeypad(true);
          }}
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '10px', 
            marginBottom: '2.5rem',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '12px',
            backgroundColor: showKeypad ? '#fff5f5' : 'transparent',
            transition: 'background-color 0.2s'
          }}
          title="Click to enter PIN"
        >
          {[0, 1, 2, 3].map((index) => (
            <div key={index} style={{
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              border: '2px solid #a91b1b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: 'bold',
              backgroundColor: '#fff',
              color: '#a91b1b',
              boxShadow: showKeypad ? '0 0 8px rgba(169,27,27,0.2)' : 'none'
            }}>
              {pin[index] ? '•' : ''}
            </div>
          ))}
        </div>
      </div>

      {/* On-Screen Kiosk Keypad (Conditionally rendered) */}
      {showKeypad && (
        <div 
          onClick={(e) => e.stopPropagation()} // Clicking inside the keypad won't close it
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
            boxSizing: 'border-box',
            animation: 'slideUp 0.2s ease-out'
          }}
        >
          <div style={{ maxWidth: '420px', margin: '0 auto' }}>
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