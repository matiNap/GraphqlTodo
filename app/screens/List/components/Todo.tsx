import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import palette from '_palette';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { todo } from 'types';

interface Props {
  todo: todo;
}

export default function Todo({ todo }: Props) {
  const { navigate } = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigate('Tasks', { todo })}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{todo.title}</Text>
        <View style={styles.unchecked} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    color: palette.text.primary,
  },
  unchecked: {
    width: 25,
    height: 25,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: palette.actions.succes,
  },
});
