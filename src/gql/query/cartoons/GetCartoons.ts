import {gql} from '@apollo/client';

export const GET_CARTOONS = gql`
  query Animations(
    $take: Int
    $orderBy: AnimationOrderByWithRelationInput
    $where: AnimationWhereInput
  ) {
    animations(take: $take, orderBy: $orderBy, where: $where) {
      id
      age
      content
      country
      date
      duration
      genre
      language
      name
      views
      content
      ratingKinopoisk
      ratingNvk
      animationSeasons {
        id
        name
        number
        animationId
        createdAt
        animationEpisode {
          number
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


export const MARK_ANIMATION_VIEWED = gql`
  mutation AnimationViewed($id: Int!) {
    markAnimationAsViewed(id: $id)
  }
`;

export const ANIMATION_IS_VIEWED = gql`
  query AnimationIsViewed($id: Int!) {
    animationIsViewed(id: $id)
  }
`;
