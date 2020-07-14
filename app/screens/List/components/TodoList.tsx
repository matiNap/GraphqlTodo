import React, { useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
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
import Animated, {
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash';
import metrics from '_metrics';

const CLOSE_EDIT_HEIGHT = metrics.width * 0.15;

export default function TodoList() {
  const { data, loading } = useQuery<{ todos: todo[] }>(getTodos, {
    fetchPolicy: 'cache-and-network',
  });
  const [editEnabled, setEditEnabled] = useState(false);
  const [addTodo] = useMutation<any, createTodoVariables>(createTodo);
  const transition = useTimingTransition(editEnabled, {
    easing: Easing.inOut(Easing.ease),
  });
  const offsetY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [CLOSE_EDIT_HEIGHT, 0],
  });
  const addOpacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
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
            <TouchableWithoutFeedback
              key={`$todo:${todo.id}`}
              onLongPress={() => {
                setEditEnabled(true);
              }}
            >
              <Todo
                {...{ todo }}
                key={`$todo:${todo.id}`}
                {...{ editEnabled }}
                editTransition={transition}
              />
            </TouchableWithoutFeedback>
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
          <Animated.Text
            style={[styles.add, { opacity: addOpacity }]}
          >
            ADD
          </Animated.Text>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Animated.View
        style={[
          styles.closeEdit,
          { transform: [{ translateY: offsetY }] },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setEditEnabled(false);
          }}
        >
          <Text style={styles.closeEditText}>Close</Text>
        </TouchableWithoutFeedback>
      </Animated.View>
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
  closeEdit: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    height: CLOSE_EDIT_HEIGHT,
  },
  closeEditText: {
    fontSize: 22,
    color: palette.secondary,
    fontWeight: 'bold',
  },
});
