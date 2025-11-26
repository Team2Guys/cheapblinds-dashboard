import { gql } from "@apollo/client";

export const USER_LIST_QUERY = gql`
  query GetUserList {
    getUserList {
      id
      firstName
      lastName
      email
      isEmailVerified
      isNewsletterSubscribed
      role
      createdAt
      updatedAt
    }
  }
`;

export const USER_BY_ID_QUERY = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      email
      isEmailVerified
      isNewsletterSubscribed
      role
      createdAt
      updatedAt
    }
  }
`;
