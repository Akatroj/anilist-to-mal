import { graphqlRequest } from '../request';
import type { AnilistSingleResponse } from './types';

export async function fetchMalId(anilistId: string) {
  const {
    Media: { id, idMal },
  } = await graphqlRequest<AnilistSingleResponse>(anilistApiEndpoint, {
    query: querySingle,
    variables: {
      anilistId,
    },
  });

  console.log(`anilistId: ${id}, malId: ${idMal}`);

  return idMal;
}

const anilistApiEndpoint = 'https://graphql.anilist.co/';

const querySingle = /* GraphQL */ `
query ($anilistId: Int) {
    Media(id: $anilistId, type: ANIME) {
      id,
      idMal
    }
}
`.replace(/(^[\s]+)|(\n)/gm, '');

// TODO:
const queryList = /* GraphQL */ `
  query ($anilistIdList: [Int]) {
    Page(page: 1, perPage: 100) {
      media(id_in: $anilistIdList, type: ANIME) {
        id,
        idMal
      }
    }
  }
`.replace(/(^[\s]+)|(\n)/gm, '');
