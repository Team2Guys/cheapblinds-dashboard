import { gql } from '@apollo/client';

export const CREATE_ADMIN_MUTATION = gql`
  mutation CreateAdmin($input: CreateAdminInput!) {
    createAdmin(input: $input) {
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

export const UPDATE_ADMIN_BY_ID_MUTATION = gql`
  mutation UpdateAdminById($id: ID!, $input: UpdateAdminByIdInput!) {
    updateAdminById(id: $id, input: $input) {
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

export const REMOVE_ADMIN_BY_ID_MUTATION = gql`
  mutation RemoveAdminById($id: ID!) {
    removeAdminById(id: $id) {
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
