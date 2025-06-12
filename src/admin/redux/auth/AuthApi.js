import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://planetwash.onrender.com', 
  }),
  tagTypes: ['Shop', 'Offer'],
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
        const patchResult = dispatch(
          authApi.util.updateQueryData('getAllShops', undefined, (draft) => {
            draft.shops = draft.shops.filter((shop) => shop._id !== shopId);
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
    getAllOffers: builder.query({
      query: () => ({
        url: `/shop/offer/all`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Shop', id: _id })),
              { type: 'Shop', id: 'LIST_OFFERS' },
            ]
          : [{ type: 'Shop', id: 'LIST_OFFERS' }],
    }),

    // ✅ NEW: Get All Pending Offers
    getPendingOffers: builder.query({
      query: () => ({
        url: '/shop/offer/pending',
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Offer', id: _id })),
              { type: 'Offer', id: 'LIST_PENDING' },
            ]
          : [{ type: 'Offer', id: 'LIST_PENDING' }],
    }),

    approveOffer: builder.mutation({
      query: (offerId) => ({
        url: `/shop/offer/approve/${offerId}`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, offerId) => [
        { type: 'Shop', id: offerId },
        { type: 'Shop', id: 'LIST_OFFERS' },
        { type: 'Offer', id: 'LIST_PENDING' },
      ],
    }),
    rejectOffer: builder.mutation({
      query: (offerId) => ({
        url: `/shop/offer/rejected/${offerId}`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, offerId) => [
        { type: 'Shop', id: offerId },
        { type: 'Shop', id: 'LIST_OFFERS' },
        { type: 'Offer', id: 'LIST_PENDING' },
      ],
    }),
    OfferAddedByAdmin: builder.mutation({
      query: (formData) => ({
        url: `/shop/offer/addOfferByAdmin`,
        method: 'POST',
        body: formData,
        responseHandler: 'text',
      }),
      invalidatesTags: [{ type: 'Shop', id: 'LIST_OFFERS' }],
    }),
    deleteOffers: builder.mutation({
      query: (id) => ({
        url: `/shop/offer/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Offer'],
    }),
  }),
});

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
  useGetAllOffersQuery,
  useApproveOfferMutation,
  useRejectOfferMutation,
  useOfferAddedByAdminMutation,
  useDeleteOffersMutation,
  useGetPendingOffersQuery, 
} = authApi;
