import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AllProductResponse, CategoriesResponse, deleteProductRequest, MessageResponse, NewProductRequest, ProductResponse, SearchProductRequest, SearchProductResponse, UpdateProductRequest } from "../../types/api-types";




export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`,
  }),
  //for invalidate purpose tags
  tagTypes: ["products"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductResponse, string>({
      query: () => "latest",
  //for invalidate purpose tags
      providesTags: ["products"],
    }),
     allProducts: builder.query<AllProductResponse, string>({
      query: (id) => `Admin-products?id=${id}`,
      providesTags: ["products"],
    }),
      Categories: builder.query<CategoriesResponse, string>({
      query: () => "Categories",
      providesTags: ["products"],
    }),
    searchProducts: builder.query<SearchProductResponse, SearchProductRequest>({
      query: ({price, search, sort, page, category}) => {
        let base = `all?serach=${search}&page=${page}`;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;

        return base;
      },
      providesTags: ["products"],
    }),
     ProductDetail: builder.query<ProductResponse, string>({
      query: (id) => id,
  //for invalidate purpose tags
      providesTags: ["products"],
    }),
    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({formData, id}) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
  //for invalidate purpose tags
      invalidatesTags:["products"],
    }),
    updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
      query: ({formData, userId, productId}) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
  //for invalidate purpose tags
      invalidatesTags:["products"],
    }),
     deleteProduct: builder.mutation<MessageResponse, deleteProductRequest>({
      query: ({ userId, productId}) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
  //for invalidate purpose tags
      invalidatesTags:["products"],
    }),
  }),
});

export const { useLatestProductsQuery,
              useAllProductsQuery,
              useCategoriesQuery,
              useSearchProductsQuery,
              useProductDetailQuery,
              useNewProductMutation,
              useUpdateProductMutation,
              useDeleteProductMutation,
              
   } = productAPI;