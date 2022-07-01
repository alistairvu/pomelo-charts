import type { NextApiRequest, NextApiResponse } from 'next';

import { getSongs } from '~/lib/parseSong';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getSongs('https://kworb.net/charts/apple_s/au.html');
  res.json(data);
}
