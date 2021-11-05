import { RESTDataSource } from 'apollo-datasource-rest';

class TomtomApiAddress extends RESTDataSource {
  constructor() {
    super();
    this.baseUrl = 'https://api.tomtom.com/search/';
  }

  async poiSearch({
    codePostal, nomRue, radius, typeRue, city, number,
  }) {
    const { results } = await this.get(`${this.baseUrl}2/geocode/${number}%20${typeRue}%20${nomRue}%20${codePostal}%20${city}.json?radius=${radius}&key=*****`);
    return results;
  }
}

export default TomtomApiAddress;
