import { SPOTIFY_MULT, AM_MULT, ITUNES_MULT, YOUTUBE_MULT } from '~/constants';

export const getScore = (ranking: number) => {
  if (ranking <= 20) {
    return 21 - ranking;
  }

  return 0;
};

const calculateScore = ({ spotify, apple, iTunes, youTube }: RankData) =>
  getScore(spotify ?? 101) * SPOTIFY_MULT +
  getScore(apple ?? 101) * AM_MULT +
  getScore(iTunes ?? 101) * ITUNES_MULT +
  getScore(youTube ?? 101) * YOUTUBE_MULT;

export const getScores = (siteData: SiteData) => {
  const getPlainTitle = (name: string) => name.split(/ - | \(/)[0];
  const getPlainArtist = (name: string) => name.split(' & ')[0];

  const getKey = ({ artist, song }: SongData) =>
    getPlainTitle(song).toLowerCase() + getPlainArtist(artist).toLowerCase();

  const lookup: Lookup = {};
  const ranks: Ranks = {};

  Object.keys(siteData).forEach((site) => {
    const songData = siteData[site];

    songData.forEach((song) => {
      const key = getKey(song);
      const { song: name, artist, ranking } = song;

      if (lookup[key] === undefined) {
        lookup[key] = {
          song: name,
          artist,
        };
      }

      if (ranks[key] === undefined) {
        ranks[key] = {};
      }

      ranks[key][site] = Math.min(ranks[key][site] ?? 101, ranking);
    });
  });

  const result: SongRanking[] = Object.keys(ranks).map((song) => ({
    ...lookup[song],
    score: calculateScore(ranks[song]),
    ranks: ranks[song],
  }));

  const sorted = result
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score);

  const ranked = sorted
    .map((e) => ({
      ...e,
      rank: sorted.findIndex((val) => e.score === val.score) + 1,
    }))
    .sort((a, b) => a.rank - b.rank);

  return ranked;
};
