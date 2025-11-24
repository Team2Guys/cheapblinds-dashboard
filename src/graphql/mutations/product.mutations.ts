import { gql } from "@apollo/client";

// Create a product
export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      categoryId
      subcategoryId
      name
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      breadCrumb
      thumbnailUrl
      productImages
      seoSchema
      price
      discountPrice
      stock
      additionalInfo
      measuringGuide
      lastEditedBy
      status
      createdAt
      updatedAt
    }
  }
`;

// Update a product by ID
export const UPDATE_PRODUCT_BY_ID_MUTATION = gql`
  mutation UpdateProductById($id: ID!, $input: UpdateProductByIdInput!) {
    updateProductById(id: $id, input: $input) {
      id
      categoryId
      subcategoryId
      name
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      breadCrumb
      thumbnailUrl
      productImages
      seoSchema
      price
      discountPrice
      stock
      additionalInfo
      measuringGuide
      lastEditedBy
      status
      createdAt
      updatedAt
    }
  }
`;

// Remove a product by ID
export const REMOVE_PRODUCT_BY_ID_MUTATION = gql`
  mutation RemoveProductById($id: ID!) {
    removeProductById(id: $id) {
      message
    }
  }
`;
