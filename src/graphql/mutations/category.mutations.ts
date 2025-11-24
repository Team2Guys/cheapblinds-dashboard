import { gql } from "@apollo/client";

// Create category
export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      breadCrumb
      thumbnailUrl
      lastEditedBy
      seoSchema
      status
      createdAt
      updatedAt
    }
  }
`;

// Update category by ID
export const UPDATE_CATEGORY_BY_ID_MUTATION = gql`
  mutation UpdateCategoryById($id: ID!, $input: UpdateCategoryByIdInput!) {
    updateCategoryById(id: $id, input: $input) {
      id
      name
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      breadCrumb
      thumbnailUrl
      lastEditedBy
      seoSchema
      status
      products
      subcategories
      createdAt
      updatedAt
    }
  }
`;

// Remove category by ID
export const REMOVE_CATEGORY_BY_ID_MUTATION = gql`
  mutation RemoveCategoryById($id: ID!) {
    removeCategoryById(id: $id) {
      message
    }
  }
`;
