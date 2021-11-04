import { gql } from 'apollo-server-express';

const geoApi = gql`
  type Risques_detail{
    num_risque: String
    libelle_risque_long: String
    zone_sismicite: String 
  }

  type Risques{
    code_insee: String
    libelle_commune: String
    risques_detail:[Risques_detail]
  }

  type GeoApi {
    results: Int
    page: Int
    total_pages:Int
    data: [Risques]
    response_code: Int,
    message: String,
    next: String,
    previous: String
    
  }

  extend type Query {
    geoRisqueSearch(
      lat: Float!,
      lon: Float!
      radius: Int!
      page:Int!
      pageSize:Int!
    ):[Risques]
  }
`;
export default geoApi;
