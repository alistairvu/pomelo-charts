import {
  Box,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { AM_MULT, SPOTIFY_MULT, YOUTUBE_MULT } from '~/constants';
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
              <Text>YouTube</Text>
              <Text
                color={song.ranks.youTube === 1 ? 'green.500' : 'black'}
                fontWeight={
                  (song.ranks.youTube ?? 3) <= 2 ? 'semibold' : 'normal'
                }
              >
                {song.ranks.youTube
                  ? `#${song.ranks.youTube} [${
                      getScore(song.ranks.youTube ?? 101) * YOUTUBE_MULT
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
