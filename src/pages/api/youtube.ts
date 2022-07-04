import type { NextApiRequest, NextApiResponse } from 'next';

import { getYouTubeSongs } from '~/lib/parseSong';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getYouTubeSongs(
    'https://kworb.net/youtube/insights/au.html'
  );
  res.json(data);
}
