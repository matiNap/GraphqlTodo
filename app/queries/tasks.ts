import { gql } from 'apollo-boost';

export const fetchTasks = gql`
  query($todoId: Int!) {
    fetchTasks(todoId: $todoId) {
      content
      done
      id
      todoId
    }
  }
`;

export const getTasks = gql`
  query {
    tasks {
      content
      done
      id
      todoId
    }
  }
`;
