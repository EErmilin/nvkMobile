import {
  ApolloClient,
  InMemoryCache,
  // DefaultOptions,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GRAPHQL_URL} from './api/config';

const getToken = async () => {
  try {
    let data = await AsyncStorage.getItem('persist:root');
    if (data !== null) {
      let jsonData = JSON.parse(data);
      return jsonData.auth.token;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext(async (_, {headers}) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

// const defaultOptions: DefaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'no-cache',
//   },
//   query: {
//     fetchPolicy: 'no-cache',
//   },
// };

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  // defaultOptions: defaultOptions,
});
