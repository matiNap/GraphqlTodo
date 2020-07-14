import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import palette from '_palette';
import Header from './components/Header';
import TodoList from './components/TodoList';

export default () => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Text style={styles.title}>Todo</Text>
      </Header>
      <TodoList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.primary,
  },
  title: {
    fontSize: 40,
    color: palette.text.primary,
  },
});
