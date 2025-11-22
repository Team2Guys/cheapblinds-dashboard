import { gql } from "@apollo/client";

export const CREATE_ADMIN_MUTATION = gql`
  mutation CreateAdmin($input: CreateAdminInput!) {
    createAdmin(input: $input) {
      message
    }
  }
`;

export const UPDATE_ADMIN_BY_ID_MUTATION = gql`
  mutation UpdateAdminById($input: UpdateAdminByIdInput!) {
    updateAdminById(input: $input) {
      message
    }
  }
`;

export const REMOVE_ADMIN_BY_ID_MUTATION = gql`
  mutation removeAdminById($input: RemoveAdminByIdInput!) {
    removeAdminById(input: $input) {
      message
    }
  }
`;
