import { addButton } from './anilistOverrides/addButton';
import { addOverrideStyles } from './anilistOverrides/overrideStyles';
import { fetchMalId } from './api/api';
import sleep from 'sleep-promise';

addOverrideStyles();

const URL_REGEX = /(?:anilist\.co\/anime\/)(?<id>[^\/]*)/;
const anilistId = document.URL.match(URL_REGEX)?.groups?.id;
if (!anilistId) throw new Error('No id found in url');

const malIdPromise = fetchMalId(anilistId);
const TIMEOUT = 300;
const MAX_RETRIES = 5;

const addButtonWithRetries = async (retries: number) => {
  try {
    if (retries > 0) {
      addButton(malIdPromise);
    }
  } catch (e) {
    await sleep(TIMEOUT);
    addButtonWithRetries(retries - 1);
  }
};

addButtonWithRetries(MAX_RETRIES);
