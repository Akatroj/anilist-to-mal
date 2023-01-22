import { button } from './button.css';

export function createButton(text: string, onClick: () => void) {
  const element = document.createElement('button');
  element.className = button;
  element.innerText = text;
  element.addEventListener('click', onClick);

  return element;
}
