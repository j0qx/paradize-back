/* eslint-disable import/prefer-default-export */
const queryTomtom = {
  tomtomSearch: async (_, args, { dataSources }) => dataSources.tomtomApi.poiSearch(args),
};

export {
  queryTomtom,
};
