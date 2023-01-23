import { fetchMalId } from '../api/api';
import { createMALButton } from '../components/MalButton/button';

export async function addButton(anilistId: string) {
  // const buttonContainer = document.querySelector(
  //   '#app > div.page-content > div > div.header-wrap > div.header > div > div.cover-wrap.overlap-banner > div > div'
  // );

  const buttonContainer = document.querySelector('div.actions');
  if (!buttonContainer) throw new Error('Cannot find button container!');

  const malIdPromise = fetchMalId(anilistId);
  const button = createMALButton(malIdPromise);

  buttonContainer.appendChild(button);
}
