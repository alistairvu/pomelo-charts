type SongData = {
  ranking: number;
  artist: string;
  song: string;
};

type SiteData = {
  [key: string]: SongData[];
};

type Lookup = {
  [index: string]: {
    song: string;
    artist: string;
  };
};

type RankData = {
  [index: string]: number;
};

type Ranks = {
  [index: string]: RankData;
};

type SongRanking = {
  song: string;
  artist: string;
  score: number;
  ranks: RankData;
  rank?: number;
};
