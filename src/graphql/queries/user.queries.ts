import { gql } from "@apollo/client";

export const GET_USER_LIST = gql`
  query GetUserList {
    getUserList {
      status
      message
      data {
        id
        firstName
        lastName
        password
        email
        permissions
        role
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($input: GetUserByIdInput!) {
    getUserById(input: $input) {
      status
      message
      data {
        id
        firstName
        lastName
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`;
