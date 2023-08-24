/* eslint-disable prettier/prettier */
import {gql} from '@apollo/client';


export const SERIES = gql`
  query Season($showId: Int!) {
    show(id: $showId) {
      id
      name
      content
      createdAt
      image {
        id
        url_256
        url_512
        url_1536
        url
      }
      seasons {
        id
        showId
        number
        name
        createdAt
        episodes {
          name
          id
          duration
          number
          seasonId
          createdAt
          media {
            id
            name
            indexM3u8Url
            episodeId
            createdAt
            hls {
              id
              m3u8Url
              name
            }
            covers {
              url_512
              url_256
              url_1536
            }
          }
        }
      }
    }
  }
`;
