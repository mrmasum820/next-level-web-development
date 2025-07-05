import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Borrow, BorrowFormData, BorrowSummary } from "../types";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://libeary-mng-api.vercel.app/api/",
  }),
  tagTypes: ["Borrows"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<
      Borrow,
      { bookId: string; borrow: BorrowFormData }
    >({
      query: ({ bookId, borrow }) => ({
        url: `borrow/${bookId}`,
        method: "POST",
        body: borrow,
      }),
      invalidatesTags: ["Borrows"],
    }),
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => "borrow/summary",
      providesTags: ["Borrows"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
