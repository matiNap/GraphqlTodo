import React from 'react';
import AppContainer from './screens/AppContainer';
import { toIdValue } from 'apollo-utilities';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { resolvers } from './resolvers';
import { persistCache } from 'apollo-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchTasks } from './queries/tasks';
import { fetchTasksVariables } from 'types';

console.disableYellowBox = true;

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      fetchTasks: (_, args: fetchTasksVariables) => {
        console.log('args', args);
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

persistCache({
  cache,
  storage: AsyncStorage,
});

const client = new ApolloClient({
  uri: 'http://d181012e1821.ngrok.io/graphql',
  cache,
  resolvers,
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
