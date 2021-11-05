/* eslint-disable import/prefer-default-export */
const queryTomtomAdd = {
  tomtomSearch: async (_, args, { dataSources }) => dataSources.tomtomApi.poiSearch(args),
};

export {
  queryTomtomAdd,
};