export const POST_JOIN_AND_SELECT = {
  medias: {
    select: {
      id: true,
      url: true,
      type: true,
    },
  },
  categories: {
    select: { id: true, name: true },
  },
};
