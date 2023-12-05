import {gql} from '@apollo/client';

export const SERIALS = gql`
  query Serials(
    $take: Int
    $orderBy: SeriesOrderByWithRelationInput
    $search: String
    $where: SeriesWhereInput
  ) {
    serials(take: $take, orderBy: $orderBy, search: $search, where: $where) {
      age
      content
      createdAt
      country
      date
      duration
      genre
      id
      kinoPoisk
      kinoPoisk_url
      language
      name
      ratingKinopoisk
      ratingNvk
      seriesSeasons {
        seriesEpisodes {
          media {
            indexM3u8Url
          }
        }
      }
      image {
        url
      }
    }
  }
`;

export const SEASONS = gql`
  query SeriesSeason($where: SeriesSeasonWhereInput) {
    seriesSeasons(where: $where) {
      id
      name
      number
      series {
        id
        name
        duration
        country
        age
        date
        genre
        favorites {
          id
        }
        language
        kinoPoisk
        kinoPoisk_url
        ratingKinopoisk
        ratingNvk
        id
        rating {
          id
        }
        image {
          url
        }
      }
      seriesId
      seriesEpisodes {
        media {
          indexM3u8Url
          id
        }
      }
    }
  }
`;

export const CURRENT_SERIAS = gql`
  query SeriesSeason($where: SeriesSeasonWhereInput) {
    seriesSeasons(where: $where) {
      id
      name
      number
      series {
        id
        name
        duration
        country
        age
        date
        genre
        favorites {
          id
        }
        language
        kinoPoisk
        kinoPoisk_url
        ratingKinopoisk
        ratingNvk
        id
        rating {
          id
        }
      }
      seriesId
      seriesEpisodes {
        media {
          indexM3u8Url
          id
        }
        id
        name
        series {
          genre
          date
          duration
          id
          name
          language
          country
          content
          ratingKinopoisk
          ratingNvk
        }
        number
        duration
        seriesSeasonId
      }
    }
  }
`;

export const GET_SERIES = gql`
  query GetSeries($id: Int!) {
    series(id: $id) {
      id
      name
      duration
      country
      age
      date
      genre
      language
      kinoPoisk
      kinoPoisk_url
      ratingKinopoisk
      ratingNvk
    }
  }
`;

// export const SERIES = gql`
//   query Season($showId: Int!) {
//     show(id: $showId) {
//       id
//       name
//       content
//       createdAt
//       image {
//         id
//         url_256
//         url_512
//         url_1536
//         url
//       }
//       seasons {
//         id
//         showId
//         number
//         name
//         createdAt
//         episodes {
//           name
//           id
//           duration
//           number
//           seasonId
//           createdAt
//           media {
//             id
//             name
//             indexM3u8Url
//             episodeId
//             createdAt
//             hls {
//               id
//               m3u8Url
//               name
//             }
//             covers {
//               url_512
//               url_256
//               url_1536
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export const MARK_SERIES_VIEWED = gql`
  mutation SeriesViewed($id: Int!) {
    markSeriesAsViewed(id: $id)
  }
`;

export const SERIES_IS_VIEWED = gql`
  query SeriesIsViewed($id: Int!) {
    seriesIsViewed(id: $id)
  }
`;
