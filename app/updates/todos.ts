import { getTodos } from '../queries/todos';
import { MutationUpdaterFn } from 'apollo-boost';

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
