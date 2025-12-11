import { gql } from "@apollo/client";

export const ADDRESS_LIST_QUERY = gql`
  query GetAddressList {
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

export const ADDRESS_BY_ID_QUERY = gql`
  query GetAddressById($id: ID!) {
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
