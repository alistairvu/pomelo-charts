import { SPOTIFY_MULT, AM_MULT, ITUNES_MULT } from '~/constants';

export const getScore = (ranking: number) => {
  if (ranking === 1) {
    return 12;
  }

  if (ranking <= 10) {
    return 12 - ranking;
  }

  if (ranking <= 20) {
    return 1;
  }

  return 0;
};

const calculateScore = ({ spotify, apple, iTunes }: RankData) =>
  getScore(spotify ?? 101) * SPOTIFY_MULT +
  getScore(apple ?? 101) * AM_MULT +
  getScore(iTunes ?? 101) * ITUNES_MULT;

export const getScores = ({ spotify, apple, iTunes }: SiteData) => {
  const getPlainTitle = (name: string) => name.split(/ - | \(/)[0];
  const getPlainArtist = (name: string) => name.split(' & ')[0];

  const getKey = ({ artist, song }: SongData) =>
    getPlainTitle(song).toLowerCase() + getPlainArtist(artist).toLowerCase();

  const lookup: Lookup = {};
  const ranks: Ranks = {};

  spotify.forEach((songData) => {
    const key = getKey(songData);
    const { song, artist, ranking } = songData;

    if (lookup[key] === undefined) {
      lookup[key] = {
        song,
        artist,
      };
    }

    if (ranks[key] === undefined) {
      ranks[key] = {};
    }

    ranks[key].spotify = Math.min(ranks[key].spotify ?? 101, ranking);
  });

  apple.forEach((songData) => {
    const key = getKey(songData);
    const { song, artist, ranking } = songData;

    if (lookup[key] === undefined) {
      lookup[key] = {
        song,
        artist,
      };
    }

    if (ranks[key] === undefined) {
      ranks[key] = {};
    }

    ranks[key].apple = Math.min(ranks[key].apple ?? 101, ranking);
  });

  iTunes.forEach((songData) => {
    const key = getKey(songData);
    const { song, artist, ranking } = songData;

    if (lookup[key] === undefined) {
      lookup[key] = {
        song,
        artist,
      };
    }

    if (ranks[key] === undefined) {
      ranks[key] = {};
    }

    ranks[key].iTunes = Math.min(ranks[key].iTunes ?? 101, ranking);
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
