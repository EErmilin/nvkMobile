import {gql} from '@apollo/client';

export const SEARCH_MEDIA = gql`
  query SearchMedia($take: Int, $search: String) {
    movies(search: $search, take: $take) {
      id
      name
      image {
        url
        url_512
      }
      rating {
        id
        createdAt
        updatedAt
        showId
        animationId
        movieId
        seriesId
      }
    }
    serials(search: $search, take: $take) {
      id
      name
      image {
        url
        url_512
      }
      rating {
        id
        createdAt
        updatedAt
        showId
        animationId
        movieId
        seriesId
      }
    }
    animations(search: $search, take: $take) {
      id
      name
      image: cover {
        url
        url_512
      }
      rating {
        id
        createdAt
        updatedAt
        showId
        animationId
        movieId
        seriesId
      }
    }
  }
`;
