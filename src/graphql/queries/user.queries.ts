import { gql } from '@apollo/client';

export const USER_LIST_QUERY = gql`
  query GetUserList {
    userList {
      id
      firstName
      lastName
      email
      isEmailVerified
      role
      createdAt
      updatedAt
    }
  }
`;

export const USER_BY_ID_QUERY = gql`
  query GetUserById($id: ID!) {
    userById(id: $id) {
      id
      firstName
      lastName
      email
      isEmailVerified
      role
      createdAt
      updatedAt
    }
  }
`;
