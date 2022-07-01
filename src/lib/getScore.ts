type SiteData = {
  spotify: SongEntry[];
  apple: SongEntry[];
  iTunes: SongEntry[];
};

type Lookup = {
  [index: string]: {
    song: string;
    artist: string;
  };
};

type RankData = {
  spotify?: number;
  apple?: number;
  iTunes?: number;
};

type Ranks = {
  [index: string]: RankData;
};

type Scores = {
  song: string;
  artist: string;
  score: number;
  ranks: RankData;
};

const SPOTIFY_MULT = 8;
const AM_MULT = 4;
const ITUNES_MULT = 1;

export const getScores = ({ spotify, apple, iTunes }: SiteData) => {
  const getPlainTitle = (name: string) => name.split(/ \- | \(/)[0];
  const getPlainArtist = (name: string) => name.split(' & ')[0];

  const getKey = ({ artist, song }: SongEntry) =>
    getPlainTitle(song).toLowerCase() + getPlainArtist(artist).toLowerCase();

  const getScore = (ranking: number) => {
    if (ranking === 1) {
      return 10;
    }

    if (ranking === 2) {
      return 7;
    }

    if (ranking === 3) {
      return 4;
    }

    if (ranking <= 10) {
      return 3;
    }

    if (ranking <= 15) {
      return 2;
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

  const lookup: Lookup = {};
  const ranks: Ranks = {};

  for (const songData of spotify) {
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
  }

  for (const songData of apple) {
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
  }

  for (const songData of iTunes) {
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
  }

  const result: Scores[] = [];

  for (const song in ranks) {
    result.push({
      ...lookup[song],
      score: calculateScore(ranks[song]),
      ranks: ranks[song],
    });
  }

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
