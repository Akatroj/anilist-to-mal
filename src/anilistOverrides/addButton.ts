import { createMALButton } from '../components/MalButton/button';

export function addButton(malIdPromise: Promise<string>) {
  const buttonContainer = document.querySelector('div.header div.actions');

  if (!buttonContainer) throw new Error('Cannot find button container!');

  const button = createMALButton(malIdPromise);
  buttonContainer.appendChild(button);
}
