// Server Component — fetches Elon's net worth directly from Forbes
// (no internal HTTP roundtrip — works correctly on Vercel and any host).

import SpendElonGame from './components/SpendElonGame';
import { fetchElonWorth } from '../lib/fetchElonWorth';

export default async function Home() {
  const { worth, worthBillions, source, lastUpdated } = await fetchElonWorth();

  return (
    <SpendElonGame
      initialBalance={worth}
      worthBillions={worthBillions}
      source={source}
      lastUpdated={lastUpdated}
    />
  );
}
