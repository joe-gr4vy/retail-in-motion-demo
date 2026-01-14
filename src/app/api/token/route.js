// src/app/api/token/route.js
import { Client } from '@gr4vy/node';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const amount = parseInt(searchParams.get('amount')) || 400;

    console.log('💰 Generating token for amount:', amount, 'cents');

    const rawKey = process.env.GR4VY_PRIVATE_KEY;
    if (!rawKey) {
      return NextResponse.json({ error: 'Missing GR4VY_PRIVATE_KEY' }, { status: 500 });
    }

    const privateKey = rawKey.replace(/\\n/g, '\n').trim();

    const client = new Client({
      gr4vyId: 'plantly1',
      privateKey: privateKey,
      environment: 'sandbox'
    });

    const token = await client.getEmbedToken({
      amount: amount,
      currency: 'USD'
    });

    console.log('✅ Token generated successfully');

    return NextResponse.json({ token });
  } catch (err) {
    console.error('❌ Token generation error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}