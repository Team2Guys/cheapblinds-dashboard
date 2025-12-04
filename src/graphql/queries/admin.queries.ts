import { gql } from "@apollo/client";

export const ADMIN_LIST_QUERY = gql`
  query GetAdminList {
    adminList {
      id
      name
      email
      permissions
      role
      lastEditedBy
      createdAt
      updatedAt
    }
  }
`;

export const ADMIN_BY_ID_QUERY = gql`
  query GetAdminById($id: ID!) {
    adminById(id: $id) {
      id
      name
      email
      permissions
      role
      lastEditedBy
      createdAt
      updatedAt
    }
  }
`;
