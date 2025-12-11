import { gql } from "@apollo/client";

export const CREATE_INQUIRY_MUTATION = gql`
  mutation CreateInquiry($input: CreateInquiryInput!) {
    createInquiry(input: $input) {
      id
      name
      email
      phone
      message
      inquiryType
      inquiryStatus
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_INQUIRY_BY_ID_MUTATION = gql`
  mutation UpdateInquiryById($id: ID!, $input: UpdateInquiryByIdInput!) {
    updateInquiryById(id: $id, input: $input) {
      id
      name
      email
      phone
      message
      inquiryType
      inquiryStatus
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_INQUIRY_BY_ID_MUTATION = gql`
  mutation RemoveInquiryById($id: ID!) {
    removeInquiryById(id: $id) {
      id
      name
      email
      phone
      message
      inquiryType
      inquiryStatus
      createdAt
      updatedAt
    }
  }
`;
