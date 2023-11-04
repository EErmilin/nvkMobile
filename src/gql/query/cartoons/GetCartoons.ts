import {gql} from '@apollo/client';

export const GET_CARTOONS = gql`
  query Animations($take: Int, $orderBy: AnimationOrderByWithRelationInput) {
    animations(take: $take, orderBy: $orderBy) {
      age
      content
      country
      date
      duration
      genre
      language
      name
      animationSeasons {
        id
        name
        number
        animationId
        createdAt
        animationEpisode {
          media {
            indexM3u8Url
          }
        }
      }
      coverId
      cover {
        url
      }
    }
  }
`;
