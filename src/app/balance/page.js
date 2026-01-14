// src/app/balance/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';

function BalanceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const flightNumber = searchParams.get('flight') || '';
  const flightDate = searchParams.get('date') || '';
  const [paymentAmount, setPaymentAmount] = useState('');

  // Simulated outstanding balance - in real app, this would come from API
  const outstandingBalance = 47.50;

  const formattedDate = flightDate ? new Date(flightDate).toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }) : '';

  const handlePayment = (e) => {
    e.preventDefault();
    const amount = parseFloat(paymentAmount);
    if (amount > 0 && amount <= outstandingBalance) {
      router.push(`/checkout?flight=${encodeURIComponent(flightNumber)}&date=${encodeURIComponent(flightDate)}&amount=${encodeURIComponent(amount.toFixed(2))}`);
    }
  };

  const handlePayFull = () => {
    router.push(`/checkout?flight=${encodeURIComponent(flightNumber)}&date=${encodeURIComponent(flightDate)}&amount=${encodeURIComponent(outstandingBalance.toFixed(2))}`);
  };

  return (
    <main style={{
      background: 'linear-gradient(135deg, #073590 0%, #0e4ba8 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <style>{`
        input::placeholder {
          color: #666 !important;
          opacity: 1 !important;
        }
      `}</style>

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
          marginBottom: '30px'
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
          <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.9 }}>
            Always Getting Better
          </div>
        </div>

        {/* Flight Details */}
        <div style={{
          background: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '2px solid #073590'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px' }}>
            Flight Details
          </div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#073590' }}>
            {flightNumber} • {formattedDate}
          </div>
        </div>

        <h2 style={{
          color: '#073590',
          fontSize: '24px',
          marginBottom: '12px',
          fontWeight: 'bold'
        }}>
          Outstanding Balance
        </h2>

        <div style={{
          background: '#fff3cd',
          border: '3px solid #ffc107',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '30px'
        }}>
          <div style={{ fontSize: '14px', color: '#856404', marginBottom: '8px', fontWeight: 'bold' }}>
            Amount Due
          </div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#073590' }}>
            ${outstandingBalance.toFixed(2)}
          </div>
        </div>

        {/* Payment Amount Form */}
        <form onSubmit={handlePayment}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              color: '#073590',
              fontWeight: 'bold',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Payment Amount
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '18px',
                color: '#073590',
                fontWeight: 'bold'
              }}>
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max={outstandingBalance}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="0.00"
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 32px',
                  fontSize: '18px',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  backgroundColor: 'white',
                  boxSizing: 'border-box',
                  color: '#073590',
                  fontWeight: '600'
                }}
                onFocus={(e) => e.target.style.borderColor = '#073590'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
              Enter partial amount or pay full balance below
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: '#073590',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s, opacity 0.2s',
              marginBottom: '12px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.opacity = '1';
            }}
          >
            Pay Partial Amount
          </button>
        </form>

        <button
          type="button"
          onClick={handlePayFull}
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
          Pay Full Balance (${outstandingBalance.toFixed(2)})
        </button>

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

export default function BalancePage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <BalanceContent />
    </Suspense>
  );
}