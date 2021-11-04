/* eslint-disable import/prefer-default-export */
const queryGeoRisque = {
  geoRisqueSearch: async (_, args, { dataSources }) => dataSources.geoRisqueApi.geoRisque(args),
};

export {
  queryGeoRisque,
};
