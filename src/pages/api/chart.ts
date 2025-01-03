import type { NextApiRequest, NextApiResponse } from 'next';

import { getScores } from '~/lib/getScore';
import {
  getAppleSongs,
  getSpotifySongs,
  getYouTubeSongs,
} from '~/lib/parseSong';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [spotify, apple, youTube] = await Promise.all([
    getSpotifySongs('https://kworb.net/spotify/country/au_daily.html'),
    getAppleSongs('https://kworb.net/charts/apple_s/au.html'),
    getYouTubeSongs('https://kworb.net/youtube/insights/au.html'),
  ]);

  if (spotify && apple && youTube) {
    const data = getScores({ spotify, apple, youTube });

    return res.json(data);
  }

  return res.json({ msg: 'An error occurred' });
}
