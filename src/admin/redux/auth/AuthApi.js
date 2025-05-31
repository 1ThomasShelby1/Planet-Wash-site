import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://planetwash.onrender.com' }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (email) => ({
        url: '/admin/auth/login',
        method: 'POST',
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: '/admin/auth/verify-otp',
        method: 'POST',
        body: { email, otp, isLogin: true },
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: '/user/auth/getall',
        method: 'GET',
      }),
    }),

    getAllShops: builder.query({
      query: () => '/shop/auth/shops',
      providesTags: (result) =>
        result
          ? [
            ...result.shops.map(({ _id }) => ({ type: 'Shop', id: _id })),
            { type: 'Shop', id: 'LIST' },
          ]
          : [{ type: 'Shop', id: 'LIST' }],
    }),
    deleteShop: builder.mutation({
      query: (shopId) => ({
        url: `/shop/auth/delete/${shopId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, shopId) => [
        { type: 'Shop', id: shopId },
        { type: 'Shop', id: 'LIST' },
      ],
    }),
    getUsersTotalOrders: builder.query({
      query: (userId) => ({
        url: `/user/order/orders/${userId}`,
        method: 'GET',
      }),
    }),
    getAllDeliveryBoy: builder.query({
      query: () => ({
        url: '/delivery/auth/getall',
        method: 'GET',
      }),
    }),

    getAllOrderByStatus: builder.query({
      query: (status) => ({
        url: `/user/order/status/${status}`,
        method: 'GET',
      }),
    }),
    getAllOrderByShopId: builder.query({
      query: (shopId) => ({
        url: `/user/order/shop/${shopId}`,
        method: 'GET',
      }),
    }),
    getAllDeliveryBoysByShopId: builder.query({
      query: (shopId) => ({
        url: `/user/order/shop/${shopId}`,
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useGetAllUsersQuery,
  useGetAllShopsQuery,
  useDeleteShopMutation,
  useGetUsersTotalOrdersQuery,
  useGetAllDeliveryBoyQuery,
  useGetAllOrderByStatusQuery,
  useGetAllOrderByShopIdQuery,
  useGetAllDeliveryBoysByShopIdQuery,
} = authApi;
