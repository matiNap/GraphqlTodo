import { gql } from 'apollo-boost';

export const updateTask = gql`
  mutation($taskId: Int!, $content: String!, $done: Boolean!) {
    updateTask(
      id: $taskId
      update: { content: $content, done: $done }
    )
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
