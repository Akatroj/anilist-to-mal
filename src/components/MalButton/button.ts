import styles from './button.module.css';

export function createMALButton(malId: Promise<string>) {
  const button = document.createElement('button');

  button.title = 'Go to MAL';
  button.className = styles.button;
  button.onclick = async () => {
    window.location.href = `https://myanimelist.net/anime/${await malId}/`;
  };

  return button;
}
