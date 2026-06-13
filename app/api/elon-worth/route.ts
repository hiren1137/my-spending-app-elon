import { NextResponse } from 'next/server';
import { fetchElonWorth } from '../../../lib/fetchElonWorth';

export async function GET() {
  const data = await fetchElonWorth();
  return NextResponse.json(data);
}
