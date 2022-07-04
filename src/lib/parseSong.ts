import { load } from 'cheerio';

export const getSpotifySongs = async (
  url: string
): Promise<SongData[] | null> => {
  try {
    const res = await fetch(url);
    const htmlString = await res.text();
    const $ = load(htmlString);
    const searchSelector = '.container .subcontainer .sortable tbody tr';

    const songs = $(searchSelector)
      .text()
      .split('\n')
      .filter((_, index) => index % 9 === 2)
      .map((name, index) => ({
        ranking: index + 1,
        artist: name.split(' - ').map((e) => e.trim())[0],
        song: name
          .split(' - ')
          .map((e) => e.trim())
          .slice(1)
          .join(' - '),
      }));

    return songs;
  } catch (e) {
    return null;
  }
};

// TODO: Error handling?
export const getAppleSongs = async (
  url: string
): Promise<SongData[] | null> => {
  try {
    const res = await fetch(url);
    const htmlString = await res.text();
    const $ = load(htmlString);
    const searchSelector = '.container .subcontainer .sortable tbody tr';

    const songs = $(searchSelector)
      .map((_, e) => $(e).text())
      .toArray()
      .map((el) => el.split(/\n|[+-][0-9]|=|NEW/))
      .map(([rank, name]) => ({
        ranking: parseInt(rank, 10),
        artist: name.split(' - ').map((e) => e.trim())[0],
        song: name
          .split(' - ')
          .map((e) => e.trim())
          .slice(1)
          .join(' - '),
      }));

    return songs;
  } catch (e) {
    return null;
  }
};

export const getITunesSongs = async (
  url: string
): Promise<SongData[] | null> => {
  try {
    const res = await fetch(url);
    const htmlString = await res.text();
    const $ = load(htmlString);
    const searchSelector = '.container .subcontainer .sortable tbody tr';

    const songs = $(searchSelector)
      .map((_, e) => $(e).text())
      .toArray()
      .map((e) =>
        e
          .split('\n')[0]
          .replace(/^[0-9]*/, '')
          .replace('$', '')
          .trim()
      )
      .map((name, rank) => ({
        ranking: rank + 1,
        artist: name.split(' - ').map((e) => e.trim())[0],
        song: name
          .split(' - ')
          .map((e) => e.trim())
          .slice(1)
          .join(' - '),
      }));

    return songs.filter((song) => song.ranking <= 100 && song.ranking > 0);
  } catch (e) {
    return null;
  }
};
