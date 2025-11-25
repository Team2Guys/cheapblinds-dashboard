import { gql } from "@apollo/client";

export const PRODUCT_LIST_QUERY = gql`
  query GetProductList {
    getProductList {
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
      productImages
      lastEditedBy
      seoSchema
      price
      discountPrice
      stock
      height
      width
      weight
      color
      pattern
      composition
      status
      categoryId
      subcategoryId
      category {
        id
        name
        slug
      }
      subcategory {
        id
        name
        slug
      }
      additionalInfo
      measuringGuide
      updatedAt
      createdAt
    }
  }
`;

export const PRODUCT_BY_ID_QUERY = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
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
      productImages
      lastEditedBy
      seoSchema
      price
      discountPrice
      stock
      height
      width
      weight
      color
      pattern
      composition
      status
      categoryId
      subcategoryId
      category {
        id
        name
        slug
      }
      subcategory {
        id
        name
        slug
      }
      additionalInfo
      measuringGuide
      updatedAt
      createdAt
    }
  }
`;
