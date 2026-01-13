// src/app/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flightNumber.trim() && flightDate) {
      router.push(`/checkout?flight=${encodeURIComponent(flightNumber.trim())}&date=${encodeURIComponent(flightDate)}`);
    }
  };

  return (
    <main style={{
      background: 'linear-gradient(135deg, #073590 0%, #0e4ba8 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '60px 40px',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Ryanair Logo */}
        <div style={{
          background: '#073590',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '40px'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '42px',
            fontWeight: 'bold',
            fontFamily: 'Arial Black, sans-serif',
            letterSpacing: '-1px'
          }}>
            RYANAIR
          </h1>
          <div style={{
            fontSize: '12px',
            marginTop: '5px',
            opacity: 0.9
          }}>
            Always Getting Better
          </div>
        </div>

        <h2 style={{
          color: '#073590',
          fontSize: '28px',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          In-Flight Purchase
        </h2>
        
        <p style={{
          color: '#666',
          fontSize: '16px',
          marginBottom: '30px',
          lineHeight: '1.5'
        }}>
          Enter your flight details to pay for items purchased during your flight
        </p>

        <form onSubmit={handleSubmit}>
          {/* Flight Number */}
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              color: '#073590',
              fontWeight: 'bold',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Flight Number
            </label>
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
              placeholder="e.g., FR1234"
              required
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '18px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                textAlign: 'center',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '2px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#073590'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* Flight Date */}
          <div style={{ marginBottom: '30px', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              color: '#073590',
              fontWeight: 'bold',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Flight Date
            </label>
            <input
              type="date"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.3s',
                backgroundColor: 'white',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#073590'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <button
            type="submit"
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
            Continue to Payment
          </button>
        </form>

        <p style={{
          marginTop: '30px',
          fontSize: '12px',
          color: '#999'
        }}>
          Powered by Retail in Motion
        </p>
      </div>
    </main>
  );
}