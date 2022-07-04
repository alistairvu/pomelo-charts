import type { NextApiRequest, NextApiResponse } from 'next';

import { getScores } from '~/lib/getScore';
import {
  getSpotifySongs,
  getAppleSongs,
  getITunesSongs,
  getYouTubeSongs,
} from '~/lib/parseSong';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [spotify, apple, iTunes, youTube] = await Promise.all([
    getSpotifySongs('https://kworb.net/spotify/country/au_daily.html'),
    getAppleSongs('https://kworb.net/charts/apple_s/au.html'),
    getITunesSongs('https://kworb.net/popau/'),
    getYouTubeSongs('https://kworb.net/youtube/insights/au.html'),
  ]);

  if (spotify && apple && iTunes && youTube) {
    const data = getScores({ spotify, apple, iTunes, youTube });

    return res.json(data);
  }

  return res.json({ msg: 'An error occurred' });
}
