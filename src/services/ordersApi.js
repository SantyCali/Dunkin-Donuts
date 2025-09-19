// src/services/ordersApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.EXPO_PUBLIC_RTDB_URL}`.replace(/\/$/, '')

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ localId, order }) => ({
        url: `/orders/${localId}.json`,
        method: 'POST',
        body: order,
      }),
    }),
  }),
})

export const { useCreateOrderMutation } = ordersApi
