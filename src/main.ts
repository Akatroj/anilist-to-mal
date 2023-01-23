import { addButton } from './anilistOverrides/addButton';
import { overrideAnilistStyles } from './anilistOverrides/overrideStyles';

overrideAnilistStyles();

const URL_REGEX = /(?:anilist\.co\/anime\/)(?<id>.*)\//;
const anilistId = document.URL.match(URL_REGEX)?.groups?.id;
if (!anilistId) throw new Error('No id found in url');

/*
  No idea why it has to be like this, probably adding `style` tag to head triggers vue rerender?
*/
setTimeout(() => {
  addButton(anilistId);
}, 300);
