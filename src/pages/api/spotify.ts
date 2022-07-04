import type { NextApiRequest, NextApiResponse } from 'next';

import { getSpotifySongs } from '~/lib/parseSong';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getSpotifySongs(
    'https://kworb.net/spotify/country/au_daily.html'
  );
  res.json(data);
}
