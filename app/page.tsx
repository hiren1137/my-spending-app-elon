/* eslint-disable react/no-unescaped-entities */
// Server Component — fetches Elon's net worth from Forbes once per day
// and passes it down to the interactive client component.

import SpendElonGame from './components/SpendElonGame';

const FALLBACK_WORTH = 489000000000;

interface ElonWorthResponse {
  worth: number;
  worthBillions: string;
  rank: number;
  source: 'forbes' | 'fallback';
  lastUpdated: string;
}

async function getElonWorth(): Promise<ElonWorthResponse> {
  try {
    // In development, call the API route directly; in production this is an internal fetch.
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const res = await fetch(`${baseUrl}/api/elon-worth`, {
      next: { revalidate: 86400 }, // revalidate every 24 hours
    });

    if (!res.ok) throw new Error(`API responded ${res.status}`);

    return res.json();
  } catch (err) {
    console.error('[page] Failed to fetch /api/elon-worth:', err);
    // Fallback so the page always renders
    return {
      worth: FALLBACK_WORTH,
      worthBillions: (FALLBACK_WORTH / 1e9).toFixed(1),
      rank: 1,
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
    };
  }
}

export default async function Home() {
  const { worth, worthBillions, source, lastUpdated } = await getElonWorth();

  return (
    <SpendElonGame
      initialBalance={worth}
      worthBillions={worthBillions}
      source={source}
      lastUpdated={lastUpdated}
    />
  );
}
