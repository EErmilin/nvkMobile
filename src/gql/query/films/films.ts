import {gql} from '@apollo/client';

export const GET_MOVIES = gql`
  query Movies(
    $take: Int
    $search: String
    $where: MovieWhereInput
    $orderBy: MovieOrderByWithRelationInput
  ) {
    movies(take: $take, search: $search, where: $where, orderBy: $orderBy) {
      id
      name
      image {
        url
        url_512
      }
      ratingKinopoisk
      ratingNvk
    }
  }
`;

export const GET_MOVIE = gql`
  query Movie($movieId: Int!) {
    movie(id: $movieId) {
      id
      name
      content
      media {
        indexM3u8Url
        hls {
          m3u8Url
        }
      }
      kinoPoisk_url
      kinoPoisk
      ratingKinopoisk
      ratingNvk
      age
      language
      country
      date
      genre
      duration
      views
      image {
        url
      }
      userVote {
        id
        comment
        vote
        user {
          avatar {
            url_256
          }
          firstname
          lastname
        }
      }
    }
  }
`;

export const MARK_MOVIE_VIEWED = gql`
  mutation MovieViewed($id: Int!) {
    markMoviesAsViewed(id: $id)
  }
`;

export const MOVIE_IS_VIEWED = gql`
  query MovieIsViewed($id: Int!) {
    movieIsViewed(id: $id)
  }
`;
