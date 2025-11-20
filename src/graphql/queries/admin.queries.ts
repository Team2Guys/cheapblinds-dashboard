import { gql } from "@apollo/client";

export const GET_ADMIN_LIST = gql`
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

export const GET_ADMIN_BY_ID = gql`
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
