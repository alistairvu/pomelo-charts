type SongData = {
  ranking: number;
  artist: string;
  song: string;
};

type SiteData = {
  spotify: SongData[];
  apple: SongData[];
  iTunes: SongData[];
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

type SongRanking = {
  song: string;
  artist: string;
  score: number;
  ranks: RankData;
  rank?: number;
};
