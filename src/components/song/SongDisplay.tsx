import { GridItem, Grid, Heading, Text, useDisclosure } from '@chakra-ui/react';

import { SongModal } from './SongModal';

type SongDataProps = {
  song: SongRanking;
};

export const SongDisplay = ({ song }: SongDataProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      py={2}
      px={4}
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      bgColor={song.rank === 1 ? 'black' : 'white'}
      borderBottomWidth="0.5px"
      borderBottomColor="gray.500"
      onClick={onOpen}
    >
      <GridItem colSpan={1}>
        <Heading
          color={song.rank === 1 ? 'green.400' : 'black'}
          fontSize="4xl"
          textAlign="start"
        >
          {song.rank}
        </Heading>
      </GridItem>

      <GridItem colSpan={3}>
        <Text
          color={song.rank === 1 ? 'green.400' : 'black'}
          fontSize="lg"
          fontWeight={song.rank === 1 ? 'semibold' : 'normal'}
        >
          {song.song}
        </Text>
      </GridItem>

      <GridItem colSpan={2}>
        <Text
          color={song.rank === 1 ? 'green.400' : 'black'}
          fontSize="lg"
          fontWeight={song.rank === 1 ? 'semibold' : 'normal'}
        >
          {song.artist}
        </Text>
      </GridItem>

      <GridItem colSpan={1}>
        <Heading
          color={song.rank === 1 ? 'green.400' : 'black'}
          fontSize="4xl"
          textAlign="end"
        >
          {song.score}
        </Heading>
      </GridItem>

      <SongModal isOpen={isOpen} onClose={onClose} song={song} />
    </Grid>
  );
};
