import {gql} from '@apollo/client';

export const GET_CARTOONS = gql`
  query (
    $search: String
    $where: AnimationWhereInput
    $orderBy: AnimationOrderByWithRelationInput
  ) {
    animations(search: $search, where: $where, orderBy: $orderBy) {
      id
      genre
      name
      date
      duration
      content
      cover {
        id
        createdAt
        updatedAt
        name
        url
        url_64
        url_128
        url_256
        url_512
        url_1536
        key
        date
      }
      ratings {
        exampleField
      }
    }
  }
`;
