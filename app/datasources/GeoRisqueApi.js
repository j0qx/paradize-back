import { RESTDataSource } from 'apollo-datasource-rest';

class GeoRisqueApi extends RESTDataSource {
  constructor() {
    super();
    this.baseUrl = 'https://www.georisques.gouv.fr/api/';
  }

  async geoRisque({
    radius, lat, lon, page, pageSize,
  }) {
    const url = `${this.baseUrl}v1/gaspar/risques?rayon=${radius}&latlon=${lat}%2C${lon}&page=${page}&page_size=${pageSize}`;
    const { data } = await this.get(url);
    return data;
  }
}

export default GeoRisqueApi;
