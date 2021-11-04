import { RESTDataSource } from 'apollo-datasource-rest';

class TomtomApi extends RESTDataSource {
  constructor() {
    super();
    this.baseUrl = 'https://api.tomtom.com/search/';
  }

  async poiSearch({
    keyword, lat, lon, radius, limit,
  }) {
    const { results } = await this.get(`${this.baseUrl}2/poiSearch/${keyword}.json?key=9v1GdCG6vCA90i0tNkdwY48fQHOJOeXr&lat=${lat}&lon=${lon}&radius=${radius}&limit=${limit}`);
    return results;
  }
}

export default TomtomApi;
