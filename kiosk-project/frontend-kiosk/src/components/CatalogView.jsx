import React from 'react';

const CATEGORIES = ['Shirts', 'Caps', 'Lanyards', 'Keychain', 'Bags', 'Pins'];

const SUB_CATEGORIES_MAP = {
  Shirts: ['All', 'Polo Shirts', 'T-Shirts', 'Jersey', 'Uniform'],
  Bags: ['All', 'Tote bag', 'Sling bag', 'Backpack'],
  Caps: ['All'],
  Lanyards: ['All'],
  Keychain: ['All'],
  Pins: ['All']
};

export default function CatalogView({ 
  items, 
  selectedCategory, 
  setSelectedCategory, 
  selectedSubCategory, 
  setSelectedSubCategory, 
  currentUser, 
  onOpenRewards, 
  onSelectItem 
}) {
  const filteredItems = items.filter(i => {
    if (i.category !== selectedCategory) return false;
    if (selectedSubCategory !== 'All' && i.subCategory !== selectedSubCategory) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 70px)', boxSizing: 'border-box' }}>
      
      {/* Left Sidebar */}
      <div style={{ width: '240px', borderRight: '1px solid #eee', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', background: '#fff', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>⚙️</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#333' }}>PARSERS MERCHANDISE</span>
        </div>

        {CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat;
          return (
            <button 
              key={cat} 
              onClick={() => { setSelectedCategory(cat); setSelectedSubCategory('All'); }} 
              style={{ 
                padding: '0.9rem 1rem', 
                textAlign: 'left', 
                borderRadius: '12px', 
                border: 'none', 
                backgroundColor: isActive ? '#ffe6e6' : 'transparent', 
                color: isActive ? '#a91b1b' : '#333', 
                fontWeight: isActive ? 'bold' : 'normal', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItem: 'center', 
                gap: '12px',
                fontSize: '1rem',
                transition: 'background 0.2s'
              }}
            >
              📁 {cat}
            </button>
          );
        })}
      </div>

      {/* Right Content Area */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: '#faf6f6', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#a91b1b', fontSize: '2rem', fontWeight: '800', margin: 0 }}>{selectedCategory}</h2>
          <button 
            onClick={onOpenRewards} 
            style={{ backgroundColor: '#fff', border: '1px solid #a91b1b', color: '#a91b1b', padding: '0.6rem 1.2rem', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}
          >
            🎁 {currentUser?.rewardPoints || 220} pts.
          </button>
        </div>

        {/* Sub-category Filter Pills */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {SUB_CATEGORIES_MAP[selectedCategory]?.map(sub => {
            const isSubActive = selectedSubCategory === sub;
            return (
              <button 
                key={sub} 
                onClick={() => setSelectedSubCategory(sub)} 
                style={{ 
                  padding: '0.5rem 1.4rem', 
                  borderRadius: '20px', 
                  border: 'none', 
                  backgroundColor: isSubActive ? '#a91b1b' : '#eee', 
                  color: isSubActive ? '#fff' : '#333', 
                  cursor: 'pointer', 
                  fontSize: '0.9rem',
                  fontWeight: isSubActive ? 'bold' : 'normal'
                }}
              >
                {sub}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              onClick={() => onSelectItem(item)} 
              style={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px', 
                padding: '1.2rem', 
                border: '1px solid #eee', 
                cursor: 'pointer', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)', 
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)'; }}
            >
              {item.badge && (
                <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#a91b1b', color: '#fff', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                  {item.badge}
                </span>
              )}
              <div style={{ height: '130px', background: '#f5f5f5', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                👕
              </div>
              <h4 style={{ fontSize: '1rem', marginBottom: '6px', color: '#222' }}>{item.name}</h4>
              <p style={{ color: '#a91b1b', fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>₱{item.price.toFixed(2)}</p>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <p style={{ color: '#777', gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0' }}>No items found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}