// src/app/checkout/CheckoutContent.js
'use client';
import { useState, useEffect, useRef } from 'react';

export default function CheckoutContent({ flightNumber, flightDate, amount }) {
  const [Embed, setEmbed] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const embedRef = useRef(null);

  const amountFloat = parseFloat(amount) || 0;
  const amountCents = Math.round(amountFloat * 100);

  // Fetch token with dynamic amount
  useEffect(() => {
    console.log('🔍 Fetching token for amount:', amountCents, 'cents');
    
    fetch(`/api/token?amount=${amountCents}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error('❌ Token error:', data.error);
          setError(data.error);
        } else {
          console.log('✅ Token received');
          setToken(data.token);
        }
      })
      .catch(err => {
        console.error('❌ Fetch error:', err);
        setError(err.message);
      });
  }, [amountCents]);

  // Load SDK
  useEffect(() => {
    if (!token) return;
    
    import('@gr4vy/embed-react').then((mod) => {
      setEmbed(() => mod.default || mod.Embed);
    }).catch(err => setError(err.message));
  }, [token]);

  const handlePayment = () => {
    if (embedRef.current && embedRef.current.submit) {
      embedRef.current.submit();
    }
  };

  if (error) {
    return (
      <div style={{ padding: '40px', background: '#fee', color: '#c00', borderRadius: '8px' }}>
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  const formattedDate = flightDate ? new Date(flightDate).toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }) : '';

  return (
    <main style={{
      background: 'linear-gradient(135deg, #073590 0%, #0e4ba8 100%)',
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: '#073590',
          color: 'white',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '32px',
            fontWeight: 'bold',
            fontFamily: 'Arial Black, sans-serif',
            letterSpacing: '-1px'
          }}>
            RYANAIR
          </h1>
          <div style={{ fontSize: '14px', marginTop: '8px', opacity: 0.9 }}>
            In-Flight Purchase Payment
          </div>
        </div>

        <div style={{ padding: '40px' }}>
          {/* Flight Details */}
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px',
            border: '2px solid #073590'
          }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px', fontWeight: 'bold' }}>
              Flight Details
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#073590' }}>
              {flightNumber} • {formattedDate}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{
            background: '#fff',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#073590', marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>
              Order Summary
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '16px',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  fontSize: '32px'
                }}>
                  🛍️
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}>
                    In-Flight Purchase
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    Items purchased on board
                  </div>
                </div>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#073590' }}>
                ${amountFloat.toFixed(2)}
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '16px'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                Total
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#073590' }}>
                ${amountFloat.toFixed(2)}
              </div>
            </div>
          </div>

          <h2 style={{ color: '#073590', marginBottom: '20px', fontSize: '20px' }}>
            Payment Method
          </h2>

          {!token || !Embed ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              Loading payment options...
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '24px' }}>
                <Embed
                  ref={embedRef}
                  gr4vyId="plantly1"
                  environment="sandbox"
                  token={token}
                  amount={amountCents}
                  currency="USD"
                  country="US"
                  onEvent={(name, data) => {
                    console.log(`EVENT [${name}]:`, data);
                  }}
                  onComplete={(transaction) => {
                    console.log('Transaction:', transaction);
                    window.location.href = `/success?flight=${encodeURIComponent(flightNumber)}&date=${encodeURIComponent(flightDate)}&amount=${encodeURIComponent(amountFloat.toFixed(2))}&txn=${encodeURIComponent(transaction.id)}`;
                    return false;
                  }}
                  onError={(error) => {
                    console.error('Payment error:', error);
                  }}
                />
              </div>

              <button
                type="button"
                onClick={handlePayment}
                style={{
                  width: '100%',
                  padding: '18px',
                  background: '#f1c411',
                  color: '#073590',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 12px rgba(241, 196, 17, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(241, 196, 17, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(241, 196, 17, 0.4)';
                }}
              >
                Complete Payment
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}