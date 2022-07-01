import puppeteer from 'puppeteer';

// TODO: Error handling?
export const getSongs = async (url: string): Promise<SongData[] | null> => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();

    await page.goto(url);
    await page.setViewport({ width: 1440, height: 744 });
    await navigationPromise;

    await page.waitForSelector('.container .subcontainer .sortable tbody tr');
    const songs = await page.$$eval(
      '.container .subcontainer .sortable tbody tr',
      (elements) =>
        elements
          .map((e) => (e as HTMLElement).innerText.split('\t'))
          .map((data) => ({
            ranking: parseInt(data[0], 10),
            artist: data[2].split(' - ').map((e) => e.trim())[0],
            song: data[2]
              .split(' - ')
              .map((e) => e.trim())
              .slice(1)
              .join(' - '),
          }))
    );

    return songs;
  } catch (e) {
    return null;
  }
};

export const getITunesSongs = async (
  url: string
): Promise<SongData[] | null> => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();

    await page.goto(url);
    await page.setViewport({ width: 1440, height: 744 });
    await navigationPromise;

    await page.waitForSelector('.container .subcontainer .sortable tbody tr');
    const songs = await page.$$eval(
      '.container .subcontainer .sortable tbody tr',
      (elements) =>
        elements
          .map((e) => (e as HTMLElement).innerText.split('\t'))
          .map((data) => ({
            ranking: parseInt(data[0], 10),
            artist: data[1].split(' - ').map((e) => e.trim())[0],
            song: data[1]
              .split(' - ')
              .map((e) => e.trim())
              .slice(1)
              .join(' - '),
          }))
    );

    return songs.filter((song) => song.ranking <= 100 && song.ranking > 0);
  } catch (e) {
    return null;
  }
};
