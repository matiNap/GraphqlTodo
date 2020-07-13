import { gql } from 'apollo-boost';

export const updateTodo = gql`
  mutation($todoId: Int!, $title: String!) {
    updateTodo(id: $todoId, title: $title)
  }
`;

export const createTodo = gql`
  mutation createTodo($title: String!) {
    createTodo(title: $title) {
      title
      id
      tasks {
        id
        content
      }
    }
  }
`;
