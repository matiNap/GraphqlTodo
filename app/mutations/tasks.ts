import { gql } from 'apollo-boost';

export const updateTask = gql`
  mutation($taskId: Int!, $content: String!, $done: Boolean!) {
    updateTask(
      id: $taskId
      update: { content: $content, done: $done }
    ) {
      content
      id
      done
      todoId
    }
  }
`;

export const createTask = gql`
  mutation($todoId: Int!, $content: String!, $done: Boolean!) {
    createTask(todoId: $todoId, content: $content, done: $done) {
      id
      content
      done
      todoId
    }
  }
`;

export const deleteTask = gql`
  mutation($id: Int!) {
    deleteTask(id: $id) {
      id
      todoId
    }
  }
`;
