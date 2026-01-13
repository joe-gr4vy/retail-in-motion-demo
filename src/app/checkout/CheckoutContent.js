// src/app/checkout/CheckoutContent.js
'use client';
import { useState, useEffect } from 'react';

export default function CheckoutContent({ flightNumber, flightDate }) {
  const [Embed, setEmbed] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  // Fetch token
  useEffect(() => {
    fetch('/api/token')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setToken(data.token);
        }
      })
      .catch(err => setError(err.message));
  }, []);

  // Load SDK
  useEffect(() => {
    if (!token) return;
    
    import('@gr4vy/embed-react').then((mod) => {
      setEmbed(() => mod.default || mod.Embed);
    }).catch(err => setError(err.message));
  }, [token]);

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
                  ☕
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}>
                    Coffee
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    Hot beverage
                  </div>
                </div>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#073590' }}>
                $4.00
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
                $4.00
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
            <form id="payment-form">
              <Embed
                gr4vyId="plantly1"
                environment="sandbox"
                token={token}
                amount={400}
                currency="USD"
                country="US"
                form="#payment-form"
                onEvent={(name, data) => {
                  console.log(`EVENT [${name}]:`, data);
                }}
                onComplete={(transaction) => {
                  console.log('Transaction:', transaction);
                  alert(`Payment successful!\n\nFlight: ${flightNumber}\nDate: ${formattedDate}\nItem: Coffee\nAmount: $4.00\n\nTransaction ID: ${transaction.id}`);
                  return false;
                }}
                onError={(error) => {
                  console.error('Payment error:', error);
                }}
              />
            </form>
          )}
        </div>
      </div>
    </main>
  );
}