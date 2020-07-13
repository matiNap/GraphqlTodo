import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import palette from '_palette';
import {
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from 'react-native-gesture-handler';
import metrics from '_metrics';
import Header from '../List/components/Header';
import { useNavigation } from '@react-navigation/native';
import Task from './components/Task';
import {
  todo,
  updateTodoVariables,
  createTaskVariables,
  task,
  fetchTasksVariables,
  fetchTasksData,
} from 'types';
import { updateTodo } from '../../mutations/todos';
import { useMutation, useQuery } from 'react-apollo';
import { getTodos } from '../../queries/todos';
import { fetchTasks, getTasks } from '../../queries/tasks';
import { createTask } from '../../mutations/tasks';
import { updateCreateTask } from '../../updates/tasks';

interface Props {
  route: {
    params: {
      todo: todo;
    };
  };
}

export default function Tasks({
  route: {
    params: {
      todo: { title, id },
    },
  },
}: Props) {
  const { goBack } = useNavigation();
  const [name, setName] = useState(title);
  const [editTodo] = useMutation<any, updateTodoVariables>(
    updateTodo,
    { refetchQueries: [{ query: getTodos }] },
  );
  const { data } = useQuery<fetchTasksData, fetchTasksVariables>(
    fetchTasks,
    {
      variables: {
        todoId: id,
      },
    },
  );
  const [addTask] = useMutation<any, createTaskVariables>(createTask);
  return (
    <View>
      <Header>
        <TextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
            editTodo({
              variables: {
                todoId: id,
                title: name,
              },
            });
          }}
          style={styles.textInput}
        />
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            flexGrow: 2,
          }}
        >
          <TouchableWithoutFeedback onPress={() => goBack()}>
            <View style={styles.backContainer}>
              <Text style={styles.backText}>Back</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Header>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {data &&
          data.fetchTasks.map((task) => (
            <Task {...{ task }} key={task.id} />
          ))}
        <TouchableWithoutFeedback
          onPress={() => {
            addTask({
              variables: {
                todoId: id,
                content: 'New task',
                done: false,
              },
              optimisticResponse: {
                __typename: 'Mutation',
                createTask: {
                  __typename: 'Task',
                  id: -1,
                  content: 'New task',
                  done: false,
                  todoId: id,
                },
              },
              update: updateCreateTask,
              refetchQueries: [
                {
                  query: fetchTasks,
                  variables: {
                    todoId: id,
                  },
                },
              ],
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
  backContainer: {
    borderRadius: 5,
    borderColor: palette.secondary,
    borderWidth: 2,
    padding: 4,
    width: metrics.width * 0.15,
  },
  backText: {
    fontSize: 15,
    color: palette.secondary,
    alignSelf: 'center',
  },
  textInput: {
    fontSize: 25,
  },
  listContainer: {
    paddingHorizontal: 30,
  },
  add: {
    color: palette.secondary,
    fontSize: 22,
    marginTop: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
