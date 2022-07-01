import type { NextApiRequest, NextApiResponse } from 'next';
import { getSongs } from '../../lib/parseSong';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getSongs(
    'https://kworb.net/spotify/country/au_daily.html'
  );
  res.json(data);
}
