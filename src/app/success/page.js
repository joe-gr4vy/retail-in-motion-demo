// src/app/success/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const flightNumber = searchParams.get('flight') || 'N/A';
  const flightDate = searchParams.get('date') || '';
  const amount = searchParams.get('amount') || '0.00';
  const transactionId = searchParams.get('txn') || 'N/A';

  const formattedDate = flightDate ? new Date(flightDate).toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }) : 'N/A';

  return (
    <main style={{
      background: 'linear-gradient(135deg, #073590 0%, #0e4ba8 100%)',
      minHeight: '100vh',
      display: 'flex',
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
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: '#4CAF50',
          borderRadius: '50%',
          margin: '0 auto 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          color: 'white'
        }}>
          ✓
        </div>

        <h1 style={{
          color: '#073590',
          fontSize: '32px',
          marginBottom: '16px',
          fontWeight: 'bold'
        }}>
          Payment Successful!
        </h1>

        <p style={{
          color: '#666',
          fontSize: '16px',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          Thank you for your payment. Your in-flight purchase has been confirmed.
        </p>

        {/* Receipt Details */}
        <div style={{
          background: '#f8f9fa',
          border: '2px solid #073590',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#073590',
            fontWeight: 'bold',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Receipt
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
              Flight Number
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
              {flightNumber}
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
              Flight Date
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
              {formattedDate}
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
              Item
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
              🛍️ In-Flight Purchase
            </div>
          </div>

          <div style={{
            borderTop: '2px solid #e0e0e0',
            paddingTop: '12px',
            marginTop: '16px'
          }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
              Amount Paid
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#073590' }}>
              ${parseFloat(amount).toFixed(2)}
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
              Transaction ID
            </div>
            <div style={{ 
              fontSize: '12px', 
              fontFamily: 'monospace', 
              color: '#666',
              wordBreak: 'break-all'
            }}>
              {transactionId}
            </div>
          </div>
        </div>

        {/* Ryanair Logo */}
        <div style={{
          background: '#073590',
          color: 'white',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'Arial Black, sans-serif',
            letterSpacing: '-1px'
          }}>
            RYANAIR
          </div>
          <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.9 }}>
            Always Getting Better
          </div>
        </div>

        <p style={{
          fontSize: '14px',
          color: '#999',
          marginBottom: '8px'
        }}>
          A confirmation email will be sent to your registered email address.
        </p>

        <p style={{
          fontSize: '12px',
          color: '#999'
        }}>
          Powered by Retail in Motion
        </p>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}