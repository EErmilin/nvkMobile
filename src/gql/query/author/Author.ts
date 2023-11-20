import {gql} from '@apollo/client';

export const AUTHOR = gql`
  query GetAuthor($id: Int!) {
    authorAggregate(authorId: $id) {
      subsCount
      postsCount
      followsCount
    }
    author(id: $id) {
      id
      nickname
      avatar {
        url: url_512
      }
      description
      vk
      telegram
      odnoklassniki
      youtube

      posts {
        title
        published
        id
        images {
          id
          url
          url_1536
          name
          key
          date
        }
        hashtags {
          hashtag {
            id
            name
          }
        }
        views
        preview
        createdAt
        updatedAt
        media {
          id
          name
          indexM3u8Url
          createdAt
          hls {
            createdAt
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
`;
