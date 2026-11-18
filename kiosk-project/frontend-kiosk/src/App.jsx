import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import CatalogView from './components/CatalogView';
import ProductModal from './components/ProductModal';
import RewardsScreen from './components/RewardsScreen';
import CartView from './components/CartView';
import ReceiptScreen from './components/ReceiptScreen';

const API_BASE = 'http://localhost:5099/api';

export default function App() {
  const [screen, setScreen] = useState('idle'); // idle, auth, login, register, catalog, rewards, cart, receipt
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Catalog State
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Shirts');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [cart, setCart] = useState([]);

  // Modals & Drawers
  const [activeItem, setActiveItem] = useState(null);
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Fetch Items on load
  useEffect(() => {
    axios.get(`${API_BASE}/kioskitems`)
      .then(res => setItems(res.data))
      .catch(err => console.error("Error fetching items:", err));
  }, []);

  const handleLogin = async (schoolId) => {
    try {
      const res = await axios.post(`${API_BASE}/students/login`, { schoolId });
      setCurrentUser(res.data);
      setErrorMessage('');
      setScreen('catalog');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (schoolId, birthDate) => {
    try {
      await axios.post(`${API_BASE}/students/register`, { schoolId, birthDate });
      setErrorMessage('');
      setScreen('login');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  const addToCart = (item, qty) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + qty } : c));
    } else {
      setCart([...cart, { ...item, quantity: qty }]);
    }
    setActiveItem(null);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#a91b1b',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* Fixed 1080x800px Kiosk Screen Frame */}
      <div className="kiosk-container" style={{
        width: '1080px',
        height: '800px',
        backgroundColor: '#fdfbfb',
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        border: '4px solid #a91b1b',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box'
      }}>
        
        {screen === 'idle' && (
          <WelcomeScreen onStart={() => setScreen('auth')} />
        )}

        {screen === 'auth' && (
          <AuthScreen 
            onSelectMode={(mode) => setScreen(mode)} 
            onBack={() => setScreen('idle')} 
          />
        )}

        {screen === 'login' && (
          <LoginScreen 
            onLogin={handleLogin} 
            onBack={() => setScreen('auth')} 
            errorMessage={errorMessage} 
          />
        )}

        {screen === 'register' && (
          <RegisterScreen 
            onRegister={handleRegister} 
            onBack={() => setScreen('auth')} 
            errorMessage={errorMessage} 
          />
        )}

        {screen === 'catalog' && (
          <>
            <CatalogView 
              items={items}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              currentUser={currentUser}
              onOpenRewards={() => setScreen('rewards')}
              onSelectItem={(item) => setActiveItem(item)}
            />

            {/* Persistent Bottom Cart Bar */}
            <div 
              onClick={() => setScreen('cart')} 
              style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70px', backgroundColor: '#fff', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', cursor: 'pointer', zIndex: 50, boxSizing: 'border-box' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>🛒</span>
                <span style={{ fontWeight: 'bold', color: '#a91b1b' }}>Show Cart</span>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>({cart.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
              </div>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>▲</span>
            </div>
          </>
        )}

        {activeItem && (
          <ProductModal 
            item={activeItem} 
            onClose={() => setActiveItem(null)} 
            onAddToCart={addToCart} 
          />
        )}

        {screen === 'rewards' && (
          <RewardsScreen 
            currentUser={currentUser} 
            onBack={() => setScreen('catalog')} 
            onRedeemDiscount={(amt) => { setAppliedDiscount(amt); setScreen('catalog'); }} 
          />
        )}

        {screen === 'cart' && (
          <CartView 
            cart={cart}
            appliedDiscount={appliedDiscount}
            onBack={() => setScreen('catalog')}
            onCancelOrder={() => { setCart([]); setScreen('catalog'); }}
            onCheckout={() => setScreen('receipt')}
          />
        )}

        {screen === 'receipt' && (
          <ReceiptScreen 
            onHome={() => { setCart([]); setAppliedDiscount(0); setScreen('idle'); }} 
          />
        )}

      </div>
    </div>
  );
}