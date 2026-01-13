// src/app/EmbedWrapper.js
'use client';
import { useEffect, useState } from 'react';

export default function EmbedWrapper() {
  const [Embed, setEmbed] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  // Fetch token client-side
  useEffect(() => {
    fetch('/api/token')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log('✅ Token fetched');
          setToken(data.token);
        }
      })
      .catch(err => {
        console.error('❌ Token fetch error:', err);
        setError(err.message);
      });
  }, []);

  // Load SDK
  useEffect(() => {
    if (!token) return;
    
    console.log("🚀 Loading SDK...");
    
    import('@gr4vy/embed-react').then((mod) => {
      console.log("✅ SDK loaded");
      setEmbed(() => mod.default || mod.Embed);
    }).catch(err => {
      console.error("❌ SDK error:", err);
      setError(err.message);
    });
  }, [token]);

  if (error) {
    return (
      <div style={{ padding: '40px', background: '#fee', color: '#c00', borderRadius: '8px' }}>
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!token || !Embed) {
    return <div style={{ padding: '20px' }}>Loading Plantly Vault...</div>;
  }

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '500px', 
      background: 'white', 
      padding: '40px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)' 
    }}>
      <h2 style={{ color: '#004d40', marginBottom: '10px' }}>Pay for items</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>Total: <strong>$30.00</strong></p>
      
      <form id="payment-form" style={{ minHeight: '400px' }}>
        <Embed
          gr4vyId="plantly1"
          environment="sandbox"
          token={token}
          amount={3000}
          currency="USD"
          country="US"
          form="#payment-form"
          onEvent={(name, data) => {
            console.log(`🎯 EVENT [${name}]:`, data);
          }}
          onComplete={(transaction) => {
            console.log('✅ Transaction:', transaction);
            alert(`Success! ${transaction.id}`);
            return false;
          }}
          onError={(error) => {
            console.error('🚨 Error:', error);
          }}
        />
      </form>
    </div>
  );
}