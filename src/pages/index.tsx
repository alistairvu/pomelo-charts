import type { GetStaticProps, NextPage } from 'next';

import { Container, Text, Box } from '@chakra-ui/react';

import { SongDisplay } from '~/components/song/SongDisplay';
import { getScores } from '~/lib/getScore';
import {
  getSpotifySongs,
  getAppleSongs,
  getITunesSongs,
} from '~/lib/parseSong';

type HomeProps = {
  songData: SongRanking[];
  generated: Date;
};

const Home: NextPage<HomeProps> = ({ songData, generated }: HomeProps) => (
  <Container p={4}>
    <Box py={2}>
      <Text>
        Updated{' '}
        {new Intl.DateTimeFormat('en-AU', {
          timeZoneName: 'short',
          hour: '2-digit',
          minute: '2-digit',
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour12: false,
          timeZone: 'Australia/Sydney',
        }).format(new Date(generated))}{' '}
      </Text>
    </Box>

    {songData &&
      songData.map((song) => <SongDisplay song={song} key={song.song} />)}
  </Container>
);

export const getStaticProps: GetStaticProps = async () => {
  const [spotify, apple, iTunes] = await Promise.all([
    getSpotifySongs('https://kworb.net/spotify/country/au_daily.html'),
    getAppleSongs('https://kworb.net/charts/apple_s/au.html'),
    getITunesSongs('https://kworb.net/popau/'),
  ]);

  if (spotify && apple && iTunes) {
    const songData = getScores({ spotify, apple, iTunes });

    return {
      props: {
        songData,
        generated: new Date().toJSON(),
      },
    };
  }

  return {
    props: {
      songData: [],
      generated: new Date().toJSON(),
    },
  };
};

export default Home;
