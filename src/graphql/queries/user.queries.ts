import { gql } from "@apollo/client";

export const USER_LIST_QUERY = gql`
  query GetUserList {
    getUserList {
      id
      firstName
      lastName
      email
      password
      isEmailVerified
      isNewsletterSubscribed
      role
      createdAt
      updatedAt
    }
  }
`;

export const USER_BY_ID_QUERY = gql`
  query GetUserById($input: GetUserByIdInput!) {
    getUserById(input: $input) {
      id
      firstName
      lastName
      email
      password
      isEmailVerified
      isNewsletterSubscribed
      role
      createdAt
      updatedAt
    }
  }
`;
