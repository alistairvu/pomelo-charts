import type { NextApiRequest, NextApiResponse } from 'next';
import { getITunesSongs } from '../../lib/parseSong';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getITunesSongs('https://kworb.net/popau/');
  res.json(data);
}
