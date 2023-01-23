import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'anilist-to-mal',
        namespace: 'akatroj.github.io',
        version: '1.0.2',
        description:
          'Adds a button on anilist anime pages that links to the same anime entry on MAL',
        author: 'Akatroj',
        match: ['*://anilist.co/anime/*'],
        icon: 'https://vitejs.dev/logo.svg',
        connect: ['graphql.anilist.co'],
        updateURL:
          'https://github.com/Akatroj/anilist-to-mal/raw/deploy/dist/anilist-to-mal.user.js',
        downloadURL:
          'https://github.com/Akatroj/anilist-to-mal/raw/deploy/dist/anilist-to-mal.user.js',
      },
    }),
  ],
});
