// Shared utility — called directly by the server component and the API route.
// Fetches Elon Musk's net worth from Forbes with a 24-hour Next.js cache.

const FALLBACK_WORTH = 489000000000; // $489B

export interface ElonWorthData {
  worth: number;
  worthBillions: string;
  rank: number;
  source: 'forbes' | 'fallback';
  lastUpdated: string;
}

interface ForbesPerson {
  uri: string;
  rank: number;
  finalWorth: number; // millions USD
  personName: string;
}

interface ForbesApiResponse {
  personList: {
    personsLists: ForbesPerson[];
  };
}

export async function fetchElonWorth(): Promise<ElonWorthData> {
  try {
    const res = await fetch(
      'https://www.forbes.com/forbesapi/person/rtb/0/position/true.json?fields=rank,uri,personName,finalWorth&limit=5',
      {
        next: { revalidate: 86400 }, // 24-hour server-side cache
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SpendElonMoney/1.0)',
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok) throw new Error(`Forbes API responded ${res.status}`);

    const data: ForbesApiResponse = await res.json();
    const persons = data?.personList?.personsLists ?? [];
    const elon = persons.find((p) => p.uri === 'elon-musk');

    if (!elon) throw new Error('Elon Musk not found in Forbes top 5');

    const worthUSD = Math.round(elon.finalWorth * 1_000_000);

    return {
      worth: worthUSD,
      worthBillions: (worthUSD / 1e9).toFixed(1),
      rank: elon.rank,
      source: 'forbes',
      lastUpdated: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[fetchElonWorth] Forbes API failed:', err);
    return {
      worth: FALLBACK_WORTH,
      worthBillions: (FALLBACK_WORTH / 1e9).toFixed(1),
      rank: 1,
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
    };
  }
}
