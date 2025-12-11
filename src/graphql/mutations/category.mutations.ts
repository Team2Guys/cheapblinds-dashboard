import { gql } from '@apollo/client';

// Create category
export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      description
      shortDescription
      slug
      metaTitle
      metaDescription
      canonicalTag
      breadcrumb
      posterImageUrl
      seoSchema
      lastEditedBy
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
      slug
      metaTitle
      metaDescription
      canonicalTag
      breadcrumb
      posterImageUrl
      lastEditedBy
      seoSchema
      status
      products {
        id
        name
      }
      subcategories {
        id
        name
      }
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
