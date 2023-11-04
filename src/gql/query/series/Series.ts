import {gql} from '@apollo/client';

export const SERIALS = gql`
  query Serials($take: Int, $orderBy: SeriesOrderByWithRelationInput) {
    serials(take: $take, orderBy: $orderBy) {
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
        }
        number
        duration
        seriesSeasonId
      }
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
