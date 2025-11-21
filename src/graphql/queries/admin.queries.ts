import { gql } from "@apollo/client";

export const ADMIN_LIST_QUERY = gql`
  query GetAdminList {
    getAdminList {
      status
      message
      data {
        id
        name
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

export const ADMIN_BY_ID_QUERY = gql`
  query GetAdminById($input: GetAdminByIdInput!) {
    getAdminById(input: $input) {
      status
      message
      data {
        id
        name
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`;
