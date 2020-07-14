import { gql } from 'apollo-boost';

export const updateTodo = gql`
  mutation($todoId: Int!, $title: String!) {
    updateTodo(id: $todoId, title: $title) {
      title
      id
      tasks {
        content
        done
        id
      }
    }
  }
`;

export const createTodo = gql`
  mutation($title: String!) {
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

export const deleteTodo = gql`
  mutation($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;
