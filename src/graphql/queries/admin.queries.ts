import { gql } from "@apollo/client";

export const ADMIN_LIST_QUERY = gql`
  query GetAdminList {
    getAdminList {
      id
      name
      email
      permissions
      role
      createdAt
      updatedAt
    }
  }
`;

export const ADMIN_BY_ID_QUERY = gql`
  query GetAdminById($id: ID!) {
    getAdminById(id: $id) {
      id
      name
      email
      permissions
      role
      createdAt
      updatedAt
    }
  }
`;
