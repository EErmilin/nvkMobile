import {gql} from '@apollo/client';

export const CREATE_REVIEW = gql`
  mutation CreateReview($createUserVoteInput: CreateUserVoteInput!) {
    createUserVote(createUserVoteInput: $createUserVoteInput) {
      id
    }
  }
`;
