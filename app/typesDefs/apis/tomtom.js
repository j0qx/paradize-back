/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-server-express';
// TODO : type from  base seems strange , check it and ajust this file

const tomtom = gql`
  type Address{
    streetNumber: String,
    streetName: String,
    municipality: String,
    countrySecondarySubdivision: String,
    countrySubdivision: String,
    postalCode: String,
    countryCode: String,
    country: String,
    countryCodeISO3: String,
    freeformAddress: String,
    localName: String,
  }
  type CategorySet {
      id:Int
  }

  type NameFromLocalLanguage {
    nameLocale:String,
    name:String,
  }

  type Classifications {
    code:String,
    names:[NameFromLocalLanguage]
  }

  type Poi {
    name: String,
    categorySet: [CategorySet]
    categories: [String],
    classifications: [Classifications]
  }

  type Position {
    lat: Float,
    lon: Float,
  }

  type EntryPoint {
      type: String,
      position: Position,
  }
  type Viewport {
    topLeftPoint: Position,
    btmRightPoint: Position
  }

  type poiSearch {
    type: String,
    id: String,
    score: Float,
    dist: Float,
    info: String,
    poi: Poi,
    position: Position,
    address: Address,
    viewport: Viewport,
    entryPoints: [EntryPoint]
  }

  extend type Query {
    tomtomSearch(
      keyword: String!,
      lat: Float!,
      lon: Float!
      radius: Int!
      limit: Int
    ):[poiSearch]!
  }

`;
export default tomtom;
