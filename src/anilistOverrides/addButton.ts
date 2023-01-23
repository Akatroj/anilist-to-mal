import { fetchMalId } from '../api/api';
import { createMALButton } from '../components/MalButton/button';

export async function addButton(anilistId: string) {
  // const buttonContainer = document.querySelector(
  //   '#app > div.page-content > div > div.header-wrap > div.header > div > div.cover-wrap.overlap-banner > div > div'
  // );
  const TIMEOUT = 300;
  let MAX_RETRIES = 5;

  const buttonContainer = document.querySelector('div.actions');

  if (buttonContainer) {
    const malIdPromise = fetchMalId(anilistId);
    const button = createMALButton(malIdPromise);
    buttonContainer.appendChild(button);
  } else {
    console.log('Cannot find button container!');
    if (MAX_RETRIES) {
      MAX_RETRIES--;
      setTimeout(addButton, TIMEOUT);
    } else {
      throw new Error('Exceeded max retry count!');
    }
  }
}
