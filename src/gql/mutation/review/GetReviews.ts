import {gql} from '@apollo/client';

export const GET_REVIEWS = gql`
  query UserVotes($where: UserVoteWhereInput) {
    userVotes(where: $where) {
      vote
      movieId
      animationId
      seriesId
      comment
      user {
        avatar {
          url_256
        }
        firstname
        lastname
      }
    }
  }
`;
