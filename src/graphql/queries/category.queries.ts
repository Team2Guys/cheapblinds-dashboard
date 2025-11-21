import { gql } from "@apollo/client";

export const CATEGORY_LIST_QUERY = gql`
  query GetCategoryList {
    getCategoryList {
      status
      message
      data {
        id
        name
        description
        shortDescription
        breadCrumb
        seoSchema
        status
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        thumbnailUrl
        lastEditedBy
        createdAt
        updatedAt
      }
    }
  }
`;

export const CATEGORY_BY_ID_QUERY = gql`
  query GetCategoryById($input: GetCategoryByIdInput!) {
    getCategoryById(input: $input) {
      status
      message
      data {
        id
        name
        description
        shortDescription
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        thumbnailUrl
        thumbnailPublicId
        thumbnailText
        createdAt
        updatedAt
      }
    }
  }
`;
