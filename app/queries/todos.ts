import { gql } from 'apollo-boost';

export const getTodos = gql`
  query {
    todos {
      id
      title
      tasks {
        content
        todoId
        done
        id
      }
    }
  }
`;
