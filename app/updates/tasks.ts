import { getTasks } from '../queries/tasks';
import { MutationUpdaterFn } from 'apollo-boost';

export const updateCreateTask: MutationUpdaterFn<any> = (
  store,
  { data: { createTask } },
) => {
  const storeData = store.readQuery({
    query: getTasks,
  });
  // console.log(createTask);
  storeData.tasks.push(createTask);

  store.writeQuery({
    query: getTasks,
    data: storeData,
  });
};
