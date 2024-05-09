import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../../shared/utility/services/axiosBaseQuery.service';
import { baseUrl } from '../../../../environments/environment';
import { Constants } from '../../../../shared/utility/constants/shared.constant';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: axiosBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ['Admin'],
  endpoints: (builder) => ({
    // get user list data
    getUserListData: builder.query<
      any,
      { statusId: number; pageNumber: number; pageSize: number }
    >({
      query: ({ statusId, pageNumber, pageSize }) => ({
        url: `admin/users/${statusId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'GET',
      }),
      providesTags: ['Admin'],
    }),

    // approve and reject user registration
    postApproveRejectUserList: builder.mutation<void, { approveUserList: any }>({
      query: (approveUserList) => ({
        url: Constants.END_POINTS.registrationRequests,
        method: 'POST',
        data: approveUserList,
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
});

export const { useGetUserListDataQuery, usePostApproveRejectUserListMutation } =
  adminApi;
