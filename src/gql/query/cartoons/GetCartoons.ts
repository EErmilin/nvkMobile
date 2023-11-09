import {gql} from '@apollo/client';

export const GET_CARTOONS = gql`
  query Animations(
    $take: Int
    $orderBy: AnimationOrderByWithRelationInput
    $where: AnimationWhereInput
  ) {
    animations(take: $take, orderBy: $orderBy, where: $where) {
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
