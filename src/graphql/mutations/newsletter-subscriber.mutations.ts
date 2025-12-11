import { gql } from "@apollo/client";

export const CREATE_NEWSLETTER_SUBSCRIBER_MUTATION = gql`
  mutation CreateNewsletterSubscriber($input: CreateNewsletterSubscriberInput!) {
    createNewsletterSubscriber(input: $input) {
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

export const UPDATE_NEWSLETTER_SUBSCRIBER_BY_ID_MUTATION = gql`
  mutation UpdateNewsletterSubscriberById($id: ID!, $input: UpdateNewsletterSubscriberByIdInput!) {
    updateNewsletterSubscriberById(id: $id, input: $input) {
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

export const REMOVE_NEWSLETTER_SUBSCRIBER_BY_ID_MUTATION = gql`
  mutation RemoveNewsletterSubscriberById($id: ID!) {
    removeNewsletterSubscriberById(id: $id) {
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
