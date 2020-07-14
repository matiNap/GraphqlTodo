import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import palette from '_palette';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { todo, deleteTodoVariables } from 'types';
import Animated from 'react-native-reanimated';
import { useMutation } from 'react-apollo';
import { deleteTodo } from '../../../mutations/todos';
import { updateDeleteTodo } from '../../../updates/todos';

interface Props {
  todo: todo;
  editEnabled: boolean;
  editTransition: Animated.Node<number>;
}

export default function Todo({
  todo,
  editEnabled,
  editTransition,
}: Props) {
  const { tasks } = todo;
  const { navigate } = useNavigation();
  const [removeTodo] = useMutation<any, deleteTodoVariables>(
    deleteTodo,
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!editEnabled) navigate('Tasks', { todo });
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={1}>
          {todo.title}
        </Text>

        <Animated.View style={{ opacity: editTransition }}>
          <TouchableWithoutFeedback
            onPress={() => {
              removeTodo({
                variables: {
                  id: todo.id,
                },
                optimisticResponse: {
                  __typename: 'Mutation',
                  deleteTodo: {
                    __typename: 'Todo',
                    id: todo.id,
                  },
                },
                update: updateDeleteTodo,
              });
            }}
          >
            <Text style={styles.removeText}>Remove</Text>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 23,
    color: palette.text.primary,
    width: '70%',
  },

  removeText: {
    fontSize: 20,
    color: palette.actions.error,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 19,
    color: palette.grayscale.dark,
  },
});
