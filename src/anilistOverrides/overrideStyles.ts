import styles from './anilistOverrides.css?inline';

export function overrideAnilistStyles() {
  const style = document.createElement('style');
  style.innerHTML = styles;
  document.head.appendChild(style);
}
