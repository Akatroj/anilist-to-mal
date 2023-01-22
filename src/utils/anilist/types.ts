export type AnilistListResponse = {
  Page: {
    media: {
      id: string;
      idMal: string;
    }[];
  };
};

export type AnilistSingleResponse = {
  Media: {
    id: string;
    idMal: string;
  };
};

// TODO:
export type PagedQuery<T> = {
  Page: {
    [key in keyof T]: T[key];
  };
};
