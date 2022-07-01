import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Box,
  Divider,
} from '@chakra-ui/react';

import { AM_MULT, ITUNES_MULT, SPOTIFY_MULT } from '~/constants';
import { getScore } from '~/lib/getScore';

type SomeModalProps = {
  song: SongRanking;
  isOpen: boolean;
  onClose: () => void;
};

export const SongModal = ({ song, isOpen, onClose }: SomeModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay>
      <ModalContent>
        <ModalCloseButton />

        <ModalBody mt={8}>
          <Box pb={3}>
            <Text fontSize="xl" fontWeight="bold">
              {song.song}
            </Text>
            <Text fontSize="lg" fontWeight="semibold">
              {song.artist}
            </Text>
          </Box>

          <Box fontSize="lg">
            <Flex
              textAlign="center"
              justifyContent="space-between"
              alignItems="center"
              py={2}
              px={4}
            >
              <Text>Spotify</Text>
              <Text
                color={song.ranks.spotify === 1 ? 'green.500' : 'black'}
                fontWeight={
                  (song.ranks.spotify ?? 3) <= 2 ? 'semibold' : 'normal'
                }
              >
                {song.ranks.spotify
                  ? `#${song.ranks.spotify} [${
                      getScore(song.ranks.spotify ?? 101) * SPOTIFY_MULT
                    } pts]`
                  : 'No In [0 pts]'}
              </Text>
            </Flex>

            <Flex
              textAlign="center"
              justifyContent="space-between"
              alignItems="center"
              py={2}
              px={4}
            >
              <Text>Apple Music</Text>
              <Text
                color={song.ranks.apple === 1 ? 'green.500' : 'black'}
                fontWeight={
                  (song.ranks.apple ?? 3) <= 2 ? 'semibold' : 'normal'
                }
              >
                {song.ranks.apple
                  ? `#${song.ranks.apple} [${
                      getScore(song.ranks.apple ?? 101) * AM_MULT
                    } pts]`
                  : 'No In [0 pts]'}
              </Text>
            </Flex>

            <Flex
              textAlign="center"
              justifyContent="space-between"
              alignItems="center"
              py={2}
              px={4}
            >
              <Text>iTunes</Text>
              <Text
                color={song.ranks.iTunes === 1 ? 'green.500' : 'black'}
                fontWeight={
                  (song.ranks.iTunes ?? 3) <= 2 ? 'semibold' : 'normal'
                }
              >
                {song.ranks.iTunes
                  ? `#${song.ranks.iTunes} [${
                      getScore(song.ranks.iTunes ?? 101) * ITUNES_MULT
                    } pts]`
                  : 'No In [0 pts]'}
              </Text>
            </Flex>

            <Divider borderColor="gray.700" />

            <Flex
              textAlign="center"
              fontWeight="bold"
              justifyContent="space-between"
              alignItems="center"
              py={2}
              px={4}
            >
              <Text>Total</Text>
              <Text>{song.score} pts</Text>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  </Modal>
);
