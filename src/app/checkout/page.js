// src/app/checkout/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import CheckoutContent from './CheckoutContent';

function CheckoutWrapper() {
  const searchParams = useSearchParams();
  const flightNumber = searchParams.get('flight') || '';
  const flightDate = searchParams.get('date') || '';
  const amount = searchParams.get('amount') || '0.00';

  return <CheckoutContent flightNumber={flightNumber} flightDate={flightDate} amount={amount} />;
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <CheckoutWrapper />
    </Suspense>
  );
}