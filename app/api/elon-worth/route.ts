import { NextResponse } from 'next/server';

const FALLBACK_WORTH = 489000000000; // $489B fallback if Forbes API fails

interface ForbesPerson {
  uri: string;
  rank: number;
  finalWorth: number; // in millions USD
  personName: string;
}

interface ForbesApiResponse {
  personList: {
    personsLists: ForbesPerson[];
    count: number;
  };
}

export async function GET() {
  try {
    // Fetch top 5 by position — Elon is consistently rank #1
    // Next.js caches this fetch for 24 hours (86400 seconds)
    const res = await fetch(
      'https://www.forbes.com/forbesapi/person/rtb/0/position/true.json?fields=rank,uri,personName,finalWorth&limit=5',
      {
        next: { revalidate: 86400 }, // 24-hour server-side cache
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SpendElonMoney/1.0)',
          'Accept': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Forbes API responded with status ${res.status}`);
    }

    const data: ForbesApiResponse = await res.json();
    const persons = data?.personList?.personsLists ?? [];

    // Find Elon Musk by URI
    const elon = persons.find((p) => p.uri === 'elon-musk');

    if (!elon) {
      throw new Error('Elon Musk not found in Forbes top 5 response');
    }

    // finalWorth is in millions of USD — convert to full USD
    const worthUSD = Math.round(elon.finalWorth * 1_000_000);

    return NextResponse.json({
      worth: worthUSD,
      worthBillions: (worthUSD / 1e9).toFixed(1),
      rank: elon.rank,
      source: 'forbes',
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[elon-worth] Forbes API fetch failed:', error);

    // Return fallback value so the app never breaks
    return NextResponse.json({
      worth: FALLBACK_WORTH,
      worthBillions: (FALLBACK_WORTH / 1e9).toFixed(1),
      rank: 1,
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
    });
  }
}
