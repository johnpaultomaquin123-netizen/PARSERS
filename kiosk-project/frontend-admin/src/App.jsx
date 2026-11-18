import React, { useState } from 'react';
import './App.css';

import AdminLoginScreen from './components/AdminLoginScreen';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [screen, setScreen] = useState('admin-login');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdminPinSubmit = (enteredPin) => {
    if (enteredPin === '8633') {
      setErrorMessage('');
      setScreen('admin');
    } else {
      setErrorMessage('Incorrect PIN. Access Denied.');
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }}>
      {/* Fixed 1080x800px Frame Centered */}
      <div className="kiosk-container" style={{
        width: '1080px',
        height: '800px',
        backgroundColor: '#fdfbfb',
        boxShadow: '0 12px 40px rgba(0,0,0,0.8)',
        border: '2px solid #222',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif'
      }}>
        
        {screen === 'admin-login' && (
          <AdminLoginScreen 
            onLoginSuccess={handleAdminPinSubmit}
            errorMessage={errorMessage}
          />
        )}

        {screen === 'admin' && (
          <AdminDashboard 
            onLogout={() => {
              setErrorMessage('');
              setScreen('admin-login');
            }} 
          />
        )}

      </div>
    </div>
  );
}