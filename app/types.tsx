import { interpolate } from 'react-native-reanimated';

export interface task {
  content: string;
  id: number;
  done: boolean;
}

export interface todo {
  title: string;
  id: number;
  tasks: task[];
}

export interface updateTaskVariables {
  taskId: number;
  content: string;
  done: boolean;
}

export interface updateTodoVariables {
  todoId: number;
  title: string;
}

export interface createTaskVariables {
  todoId: number;
  content: string;
  done: boolean;
}
export interface createTodoVariables {
  title: string;
}

export interface fetchTasksVariables {
  todoId: number;
}

export interface fetchTasksData {
  fetchTasks: task[];
}

export interface deleteTodoVariables {
  id: number;
}
export interface deleteTaskVariables {
  id: number;
}
