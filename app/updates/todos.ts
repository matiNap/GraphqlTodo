import { getTodos } from '../queries/todos';
import { MutationUpdaterFn } from 'apollo-boost';
import _ from 'lodash';

export const updateCreateTodo: MutationUpdaterFn<any> = (
  store,
  { data },
) => {
  const storeData = store.readQuery({
    query: getTodos,
  });

  storeData.todos.push(data.createTodo);

  store.writeQuery({
    query: getTodos,
    data: storeData,
  });
};

export const updateDeleteTodo: MutationUpdaterFn<any> = (
  store,
  { data: { deleteTodo } },
) => {
  const storeData = store.readQuery({
    query: getTodos,
  });

  _.remove(storeData.todos, (todo) => {
    return todo.id === deleteTodo.id;
  });

  store.writeQuery({
    query: getTodos,
    data: storeData,
  });
};
