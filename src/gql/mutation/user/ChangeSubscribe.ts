import {gql} from '@apollo/client';

export const CHANGE_SUBSCRIBE = gql`
  mutation ChangeSubscribe(
    $authorId: Int!
    $userId: Int!
    $isSubscribe: Boolean!
  ) {
    authorSubscribe(
      authorId: $authorId
      userId: $userId
      isSubscribe: $isSubscribe
    ) {
      isSubscribe
    }
  }
`;
