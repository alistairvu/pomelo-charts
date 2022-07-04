import type { NextApiRequest, NextApiResponse } from 'next';

import { getScores } from '~/lib/getScore';
import {
  getSpotifySongs,
  getAppleSongs,
  getITunesSongs,
} from '~/lib/parseSong';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [spotify, apple, iTunes] = await Promise.all([
    getSpotifySongs('https://kworb.net/spotify/country/au_daily.html'),
    getAppleSongs('https://kworb.net/charts/apple_s/au.html'),
    getITunesSongs('https://kworb.net/popau/'),
  ]);

  if (spotify && apple && iTunes) {
    const data = getScores({ spotify, apple, iTunes });

    return res.json(data);
  }

  return res.json({ msg: 'An error occurred' });
}
