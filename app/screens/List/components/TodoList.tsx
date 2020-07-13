import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import Todo from './Todo';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { useQuery, useMutation } from 'react-apollo';
import { getTodos } from '../../../queries/todos';
import { todo, createTodoVariables } from 'types';
import palette from '_palette';
import { createTodo } from '../../../mutations/todos';
import { updateCreateTodo } from '../../../updates/todos';

export default function TodoList() {
  const { data, loading } = useQuery<{ todos: todo[] }>(getTodos, {
    fetchPolicy: 'cache-and-network',
  });

  const [addTodo] = useMutation<any, createTodoVariables>(createTodo);
  return (
    <View style={styles.container}>
      {loading && !data && (
        <ActivityIndicator
          style={{ alignSelf: 'center' }}
          color={palette.secondary}
          size={50}
        />
      )}

      <ScrollView style={styles.listContainer}>
        {data &&
          data.todos &&
          data.todos.map((todo) => (
            <Todo {...{ todo }} key={`$todo:${todo.id}`} />
          ))}
        {loading && data && (
          <ActivityIndicator
            style={styles.updateLoader}
            size={40}
            color={palette.secondary}
          />
        )}
        <TouchableWithoutFeedback
          onPress={() => {
            addTodo({
              variables: {
                title: 'New todo',
              },
              optimisticResponse: {
                __typename: 'Mutation',
                createTodo: {
                  __typename: 'Todo',
                  title: 'New todo',
                  id: -1,
                  tasks: [],
                },
              },
              update: updateCreateTodo,
            });
          }}
        >
          <Text style={styles.add}>ADD</Text>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  updateLoader: {
    marginTop: 30,
  },
  add: {
    color: palette.secondary,
    fontSize: 22,
    marginTop: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
