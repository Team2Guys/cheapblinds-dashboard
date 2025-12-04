import { gql } from "@apollo/client";

// Get all subcategories
export const SUBCATEGORY_LIST_QUERY = gql`
  query GetSubcategoryList {
    subcategoryList {
      id
      categoryId
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
      createdAt
      updatedAt
    }
  }
`;

// Get single subcategory by ID
export const SUBCATEGORY_BY_ID_QUERY = gql`
  query GetSubcategoryById($id: ID!) {
    subcategoryById(id: $id) {
      id
      categoryId
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
      category {
        name
      }
      createdAt
      updatedAt
    }
  }
`;
