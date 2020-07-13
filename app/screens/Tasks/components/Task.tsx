import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import palette from '_palette';
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { task, updateTaskVariables } from 'types';
import { useMutation } from 'react-apollo';
import { updateTask } from '../../../mutations/tasks';

interface Props {
  task: task;
}

export default function Task({ task: { content, done, id } }: Props) {
  const [contentValue, setContentValue] = useState(content);
  const [isDone, setIsDone] = useState(done);
  const [editTask] = useMutation<any, updateTaskVariables>(
    updateTask,
  );
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsDone(!isDone);
          editTask({
            variables: {
              taskId: id,
              done: !isDone,
              content: contentValue,
            },
          });
        }}
      >
        <View style={[styles.point, isDone ? styles.checked : {}]} />
      </TouchableWithoutFeedback>
      <TextInput
        style={styles.content}
        value={contentValue}
        onChangeText={(text) => {
          setContentValue(text);
          editTask({
            variables: {
              taskId: id,
              done: isDone,
              content: text,
            },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  content: {
    fontSize: 20,
    marginLeft: 10,
    flex: 1,
  },
  point: {
    width: 25,
    height: 25,
    borderColor: palette.grayscale.dark,
    borderRadius: 25,
    borderWidth: 2,
  },
  checked: {
    backgroundColor: palette.actions.succes,
    borderColor: '#00bf39',
  },
});
