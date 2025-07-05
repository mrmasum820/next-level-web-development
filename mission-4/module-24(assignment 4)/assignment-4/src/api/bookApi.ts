import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, BookFormData } from "../types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://libeary-mng-api.vercel.app/api/",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => "book",
      providesTags: ["Books"],
    }),
    getBook: builder.query<Book, string>({
      query: (id) => `book/${id}`,
      providesTags: ["Books"],
    }),
    createBook: builder.mutation<Book, BookFormData>({
      query: (book) => ({
        url: "book",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<Book, { id: string; book: BookFormData }>({
      query: ({ id, book }) => ({
        url: `book/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
