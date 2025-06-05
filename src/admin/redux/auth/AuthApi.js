import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://planetwash.onrender.com' }),
  tagTypes: ["Shop"],
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
      query: () => ({
        url: '/shop/auth/shops',
      }),
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
      async onQueryStarted(shopId, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResult = dispatch(
          api.util.updateQueryData('getAllShops', undefined, (draft) => {
            return {
              ...draft,
              shops: draft.shops.filter((shop) => shop._id !== shopId),
            };
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteDeliveryBoy: builder.mutation({
      query: (deliveryBoyId) => ({
        url: `/delivery/auth/delivery-boy/${deliveryBoyId}`,
        method: 'DELETE',
      }),
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
    getAllOrders: builder.query({
      query: () => ({
        url: `/user/order/all`,
        method: 'GET',
      }),
    }),
  })
})

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useGetAllUsersQuery,
  useGetAllShopsQuery,
  useGetAllOrdersQuery,
  useDeleteShopMutation,
  useGetUsersTotalOrdersQuery,
  useGetAllDeliveryBoyQuery,
  useGetAllOrderByStatusQuery,
  useGetAllOrderByShopIdQuery,
  useGetAllDeliveryBoysByShopIdQuery,
  useDeleteDeliveryBoyMutation,
} = authApi;
