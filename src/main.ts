import { createButton } from './components/Button/button';
import { fetchMalId } from './utils/anilist/api';

const URL_REGEX = /(?:anilist\.co\/anime\/)(?<id>.*)\//;

async function addButton() {
  const anilistId = document.URL.match(URL_REGEX)?.groups?.id;
  console.log(document.URL.match(URL_REGEX));
  if (!anilistId) throw new Error('No id found in url');

  const malIdPromise = fetchMalId(anilistId);

  const button = createButton('Go to MAL', async () => {
    const malId = await malIdPromise;
    window.location.href = `https://myanimelist.net/anime/${malId}/`;
  });

  document.body.appendChild(button);
}

addButton();
