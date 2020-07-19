import React from 'react';
import AppContainer from './screens/AppContainer';
import { toIdValue } from 'apollo-utilities';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

console.disableYellowBox = true;

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      fetchTasks: (_, args) => {
        return toIdValue(
          cache.config.dataIdFromObject({
            __typename: 'Task',
            todoId: args.todoId,
          }),
        );
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://f84f43c2c3b6.ngrok.io/graphql',
  cache,
});

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <ApolloProvider {...{ client }}>
          <AppContainer />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
