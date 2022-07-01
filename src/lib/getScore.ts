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

type RawScores = {
  [index: string]: number;
};

type Scores = {
  song: string;
  artist: string;
  score: number;
};

const SPOTIFY_MULT = 8;
const AM_MULT = 4;
const ITUNES_MULT = 1;

export const getScores = ({ spotify, apple, iTunes }: SiteData) => {
  const getKey = (songEntry: SongEntry) =>
    songEntry.artist.toLowerCase() + songEntry.song.toLowerCase();

  const getScore = ({ ranking }: SongEntry) => {
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

  const lookup: Lookup = {};
  const scores: RawScores = {};

  for (const songData of spotify) {
    const key = getKey(songData);

    if (lookup[key] === undefined) {
      const { song, artist } = songData;

      lookup[key] = {
        song,
        artist,
      };
    }

    if (scores[key] === undefined) {
      scores[key] = 0;
    }

    scores[key] += getScore(songData) * SPOTIFY_MULT;
  }

  for (const songData of apple) {
    const key = getKey(songData);

    if (lookup[key] === undefined) {
      const { song, artist } = songData;

      lookup[key] = {
        song,
        artist,
      };
    }

    if (scores[key] === undefined) {
      scores[key] = 0;
    }

    scores[key] += getScore(songData) * AM_MULT;
  }

  for (const songData of iTunes) {
    const key = getKey(songData);

    if (lookup[key] === undefined) {
      const { song, artist } = songData;

      lookup[key] = {
        song,
        artist,
      };
    }

    if (scores[key] === undefined) {
      scores[key] = 0;
    }

    scores[key] += getScore(songData) * ITUNES_MULT;
  }

  const result: Scores[] = [];

  for (const song in scores) {
    result.push({ ...lookup[song], score: scores[song] });
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
