import {gql} from '@apollo/client';

export const LOGIN = gql`
  mutation LoginRequest($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      user {
        phoneVerified
        phone
        id
        firstname
        emailVerified
        email
        isAuthor
        hashtags {
          hashtag {
            id
            name
          }
        }
      }
      accessToken
    }
  }
`;
