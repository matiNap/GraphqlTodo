import { fetchTasks } from '../queries/tasks';
import { MutationUpdaterFn } from 'apollo-boost';
import _ from 'lodash';

export const updateCreateTask: MutationUpdaterFn<any> = (
  store,
  { data: { createTask } },
) => {
  const storeData = store.readQuery({
    query: fetchTasks,
    variables: {
      todoId: createTask.todoId,
    },
  });

  storeData.fetchTasks.push(createTask);

  store.writeQuery({
    query: fetchTasks,
    variables: {
      todoId: createTask.todoId,
    },
    data: storeData,
  });
};

export const updateDeleteTask: MutationUpdaterFn<any> = (
  store,
  { data: { deleteTask } },
) => {
  const storeData = store.readQuery({
    query: fetchTasks,
    variables: {
      todoId: deleteTask.todoId,
    },
  });

  _.remove(storeData.fetchTasks, (task) => {
    return task.id === deleteTask.id;
  });

  store.writeQuery({
    query: fetchTasks,
    variables: {
      todoId: deleteTask.todoId,
    },
    data: storeData,
  });
};
