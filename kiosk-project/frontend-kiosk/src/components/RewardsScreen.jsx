import React from 'react';

export default function RewardsScreen({ currentUser, onBack, onRedeemDiscount }) {
  return (
    <div style={{ height: '100%', padding: '2rem', background: '#faf6f6', overflowY: 'auto', boxSizing: 'border-box' }}>
      <button 
        onClick={onBack} 
        style={{ background: 'none', border: 'none', color: '#a91b1b', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}
      >
        &lt; Back to Catalog
      </button>

      <div style={{ maxWidth: '520px', margin: '2rem auto', textAlign: 'center' }}>
        <h2 style={{ color: '#a91b1b', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '800' }}>🎁 REWARDS</h2>
        
        <div style={{ display: 'flex', backgroundColor: '#fff', padding: '1.8rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, borderRight: '1px solid #eee' }}>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 6px 0' }}>Wallet balance</p>
            <h3 style={{ color: '#a91b1b', fontSize: '1.8rem', margin: 0 }}>₱{currentUser?.walletBalance?.toFixed(2) || '15.00'}</h3>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 6px 0' }}>Reward points</p>
            <h3 style={{ color: '#a91b1b', fontSize: '1.8rem', margin: 0 }}>{currentUser?.rewardPoints || 220} pts</h3>
          </div>
        </div>

        <div style={{ textAlign: 'left', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>Redeem Rewards</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid #eee', borderRadius: '8px' }}>
            <div>
              <p style={{ fontWeight: 'bold', margin: '0 0 4px 0', color: '#222' }}>₱20 off any item</p>
              <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>50 pts</p>
            </div>
            <button 
              onClick={() => onRedeemDiscount(20)} 
              style={{ backgroundColor: '#a91b1b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}