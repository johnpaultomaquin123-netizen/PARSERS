import React, { useState } from 'react';

export default function RegisterScreen({ onRegister, onBack, errorMessage }) {
  const [schoolId, setSchoolId] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(schoolId, birthDate);
  };

  return (
    <div style={{ height: '100%', padding: '2rem', backgroundColor: '#fdfbfb', boxSizing: 'border-box' }}>
      <button 
        onClick={onBack} 
        style={{ background: 'none', border: 'none', color: '#a91b1b', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
      >
        &lt; Back
      </button>

      <div style={{ maxWidth: '400px', margin: '3rem auto', textAlign: 'center' }}>
        <h2 style={{ color: '#a91b1b', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '800' }}>Register</h2>

        {errorMessage && (
          <p style={{ color: '#d9534f', backgroundColor: '#f9dede', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem' }}>
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <label style={{ fontWeight: 'bold', color: '#333' }}>School ID:</label>
          <input 
            type="text" 
            value={schoolId} 
            onChange={e => setSchoolId(e.target.value)} 
            placeholder="e.g. 2026-0002" 
            required 
            style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', outline: 'none' }} 
          />

          <label style={{ fontWeight: 'bold', color: '#333' }}>Birth Date:</label>
          <input 
            type="date" 
            value={birthDate} 
            onChange={e => setBirthDate(e.target.value)} 
            required 
            style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', outline: 'none' }} 
          />

          <button 
            type="submit" 
            style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#a91b1b', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}