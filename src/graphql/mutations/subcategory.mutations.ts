import { gql } from "@apollo/client";

// Create a subcategory
export const CREATE_SUBCATEGORY_MUTATION = gql`
  mutation CreateSubcategory($input: CreateSubcategoryInput!) {
    createSubcategory(input: $input) {
      id
      categoryId
      name
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      breadCrumb
      posterImageUrl
      seoSchema
      lastEditedBy
      status
      createdAt
      updatedAt
    }
  }
`;

// Update a subcategory by ID
export const UPDATE_SUBCATEGORY_BY_ID_MUTATION = gql`
  mutation UpdateSubcategoryById($id: ID!, $input: UpdateSubcategoryByIdInput!) {
    updateSubcategoryById(id: $id, input: $input) {
      id
      categoryId
      name
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      breadCrumb
      posterImageUrl
      seoSchema
      lastEditedBy
      status
      category {
        name
      }
      products {
        name
      }
      createdAt
      updatedAt
    }
  }
`;

// Remove a subcategory by ID
export const REMOVE_SUBCATEGORY_BY_ID_MUTATION = gql`
  mutation RemoveSubcategoryById($id: ID!) {
    removeSubcategoryById(id: $id) {
      message
    }
  }
`;
