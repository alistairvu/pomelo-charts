import type { GetStaticProps, NextPage } from 'next';

import { Container } from '@chakra-ui/react';

import { SongDisplay } from '~/components/song/SongDisplay';
import { getScores } from '~/lib/getScore';
import { getSongs, getITunesSongs } from '~/lib/parseSong';

type HomeProps = {
  songData: SongRanking[];
};

const Home: NextPage<HomeProps> = ({ songData }: HomeProps) => (
  <Container p={4}>
    {songData &&
      songData.map((song) => <SongDisplay song={song} key={song.song} />)}
  </Container>
);

export const getStaticProps: GetStaticProps = async () => {
  const [spotify, apple, iTunes] = await Promise.all([
    getSongs('https://kworb.net/spotify/country/au_daily.html'),
    getSongs('https://kworb.net/charts/apple_s/au.html'),
    getITunesSongs('https://kworb.net/popau/'),
  ]);

  if (spotify && apple && iTunes) {
    const songData = getScores({ spotify, apple, iTunes });

    return {
      props: {
        songData,
      },
    };
  }

  return {
    props: {
      songData: [],
    },
  };
};

export default Home;
