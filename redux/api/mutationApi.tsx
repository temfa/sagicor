import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const publicRoutes = ["Onboarding/v1/Auth/RefreshToken", "login", "Onboarding/v1/Auth/Register", "forgotPassword", "validateOtp", "completePasswordReset"];

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { endpoint }) => {
    const token = "";
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    const requestUrl = endpoint as string;
    const isPublic = publicRoutes.some((route) => requestUrl.includes(route));

    // Only add Authorization if it's not a public route AND no explicit override
    if (token && !isPublic && !headers.has("skip-auth")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Remove the skip-auth flag after processing
    headers.delete("skip-auth");

    return headers;
  },
});

const mimeTypeMap: { [key: string]: string } = {
  "application/pdf": ".pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "text/csv": ".csv",
};

export const mutationApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Auth/Login",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Auth/InitiatePasswordReset",
        method: "POST",
        body,
      }),
    }),
    completePasswordReset: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Auth/CompletePasswordReset",
        method: "POST",
        body,
      }),
    }),
    completeInvite: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Auth/CompleteInvite",
        method: "POST",
        body,
      }),
    }),
    editProfile: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Profile/Manage",
        method: "PUT",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Auth/ChangePassword",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Auth/LogOut",
        method: "POST",
        body,
      }),
    }),
    createOrganization: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Tenant/Create",
        method: "POST",
        body,
      }),
    }),
    deleteOrganization: builder.mutation({
      query: (id) => ({
        url: `Onboarding/v1/Tenant/Revoke/${id}`,
        method: "DELETE",
      }),
    }),
    inviteUser: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Auth/InviteUser",
        method: "POST",
        body,
      }),
    }),
    editOrganization: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Tenant/Manage",
        method: "PUT",
        body,
      }),
    }),
    editUser: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Profile/Manage",
        method: "PUT",
        body,
      }),
    }),
    validateOtp: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/Auth/ValidateOTP",
        method: "POST",
        body,
      }),
    }),
    stats: builder.mutation({
      query: (body) => ({
        url: "Routing/v1/Transactions/Stats",
        method: "POST",
        body,
      }),
    }),
    createPaymentLink: builder.mutation({
      query: (body) => ({
        url: "Routing/v1/Requests",
        method: "POST",
        body,
      }),
    }),
    revokeDeviceAccess: builder.mutation({
      query: (body) => ({
        url: "Onboarding/v1/SoftPos/RevokeAccess",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.mutation({
      query: ({ size, sort, page, filter }) => ({
        url: `Onboarding/v1/Profile?page=${page}&size=${size}&sort=${sort}${filter}`,
        method: "GET",
      }),
    }),
    getOrganization: builder.mutation({
      query: ({ size, sort, page, filter }) => ({
        url: `Onboarding/v1/Tenant?page=${page}&size=${size}&sort=${sort}${filter}`,
        method: "GET",
      }),
    }),
    getSingleOrganization: builder.mutation({
      query: (id) => ({
        url: `Onboarding/v1/Tenant/${id}`,
        method: "GET",
      }),
    }),
    getSingleUser: builder.mutation({
      query: (id) => ({
        url: `Onboarding/v1/Profile/GetById/${id}`,
        method: "GET",
      }),
    }),
    getAnalysis: builder.mutation({
      query: (id) => ({
        url: `Routing/v1/Analysis/Dashboard?chunckType=${id}`,
        method: "GET",
      }),
    }),
    getTransactionBreakdown: builder.mutation({
      query: ({ id, filter }) => ({
        url: `Routing/v1/Transactions/Breakdown?chunckType=${id}${filter}`,
        method: "GET",
      }),
    }),
    getAnalysisData: builder.mutation({
      query: (id) => ({
        url: `Routing/v1/Analysis/Performance?chunckType=${id}`,
        method: "GET",
      }),
    }),
    getPaymentSummary: builder.mutation({
      query: () => ({
        url: `Routing/v1/Requests/Summary`,
        method: "GET",
      }),
    }),
    getTransactions: builder.mutation({
      query: ({ size, sort, page, filter }) => ({
        url: `Routing/v1/Transactions?page=${page}&size=${size}&sort=${sort}${filter}`,
        method: "GET",
      }),
    }),
    exportTransactions: builder.mutation<{ success: true }, { type: string; filter: string }>({
      query: ({ type, filter }) => ({
        url: `Routing/v1/Transactions?${filter}&export=${type}`,
        method: "GET",
        cache: "no-store",
        responseHandler: async (response) => {
          const contentDisposition = response.headers.get("content-disposition");

          const filenameMatch = contentDisposition?.match(/filename="(.+)"/);

          let filename = filenameMatch ? filenameMatch[1] : "transaction";

          const contentType = response.headers.get("content-type") || "";

          const fileExtension = mimeTypeMap[contentType] ?? ".bin";

          if (!filename.includes(".")) {
            filename += fileExtension;
          }

          const blob = await response.blob();

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);

          return { success: true };
        },
      }),
    }),
    exportMerchants: builder.mutation<{ success: true }, { type: string }>({
      query: ({ type }) => ({
        url: `Routing/v1/Merchants?export=${type}`,
        method: "GET",
        cache: "no-store",
        responseHandler: async (response) => {
          const contentDisposition = response.headers.get("content-disposition");

          const filenameMatch = contentDisposition?.match(/filename="(.+)"/);

          let filename = filenameMatch ? filenameMatch[1] : "merchants";

          const contentType = response.headers.get("content-type") || "";

          const fileExtension = mimeTypeMap[contentType] ?? ".bin";

          if (!filename.includes(".")) {
            filename += fileExtension;
          }

          const blob = await response.blob();

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);

          return { success: true };
        },
      }),
    }),
    exportDevices: builder.mutation<{ success: true }, { type: string }>({
      query: ({ type }) => ({
        url: `Onboarding/v1/SoftPos/GetAll?export=${type}`,
        method: "GET",
        cache: "no-store",
        responseHandler: async (response) => {
          const contentDisposition = response.headers.get("content-disposition");

          const filenameMatch = contentDisposition?.match(/filename="(.+)"/);

          let filename = filenameMatch ? filenameMatch[1] : "merchants";

          const contentType = response.headers.get("content-type") || "";

          const fileExtension = mimeTypeMap[contentType] ?? ".bin";

          if (!filename.includes(".")) {
            filename += fileExtension;
          }

          const blob = await response.blob();

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);

          return { success: true };
        },
      }),
    }),
    getSingleTransactions: builder.mutation({
      query: (id) => ({
        url: `Routing/v1/Transactions/${id}`,
        method: "GET",
      }),
    }),
    getSinglePaymentPage: builder.mutation({
      query: (id) => ({
        url: `Routing/v1/Requests/${id}`,
        method: "GET",
      }),
    }),
    getOrganizationStats: builder.mutation({
      query: (body) => ({
        url: `Onboarding/v1/Tenant/BreakDown`,
        method: "PUT",
        body,
      }),
    }),
    editPaymentPage: builder.mutation({
      query: (body) => ({
        url: `Routing/v1/Requests/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
    editDevice: builder.mutation({
      query: (body) => ({
        url: `Onboarding/v1/SoftPos/Manage`,
        method: "PUT",
        body,
      }),
    }),
    deletePaymentPage: builder.mutation({
      query: (id) => ({
        url: `Routing/v1/Requests/${id}`,
        method: "DELETE",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `Onboarding/v1/Profile/Revoke/${id}`,
        method: "DELETE",
      }),
    }),
    getCountries: builder.mutation({
      query: () => ({
        url: `Config/v1/Countries`,
        method: "GET",
      }),
    }),
    checkOrganizationName: builder.mutation({
      query: (name) => ({
        url: `Onboarding/v1/Tenant/IsAvailable?tenantName=${name}`,
        method: "GET",
      }),
    }),
    getPaymentPages: builder.mutation({
      query: ({ size, sort, page, filter }) => ({
        url: `Routing/v1/Requests?page=${page}&size=${size}&sort=${sort}${filter}`,
        method: "GET",
      }),
    }),
    getMerchants: builder.mutation({
      query: ({ size, sort, page, filter }) => ({
        url: `Routing/v1/Merchants?page=${page}&size=${size}&sort=${sort}${filter}`,
        method: "GET",
      }),
    }),
    getDevices: builder.mutation({
      query: ({ size, sort, page, filter }) => ({
        url: `Onboarding/v1/SoftPos/GetAll?page=${page}&size=${size}&sort=${sort}${filter}`,
        method: "GET",
      }),
    }),
    getMerchantsStats: builder.mutation({
      query: () => ({
        url: `Routing/v1/Analysis/Merchants`,
        method: "GET",
      }),
    }),
    getDevicesStats: builder.mutation({
      query: () => ({
        url: `Onboarding/v1/SoftPos/Summary`,
        method: "GET",
      }),
    }),
    getSingleMerchant: builder.mutation({
      query: (merchantId) => ({
        url: `Routing/v1/Merchants/${merchantId}`,
        method: "GET",
      }),
    }),
    getSingleDevice: builder.mutation({
      query: (deviceId) => ({
        url: `Onboarding/v1/SoftPos/GetById/${deviceId}`,
        method: "GET",
      }),
    }),
    getDeviceInfo: builder.mutation({
      query: ({ deviceId, tenantId }) => ({
        url: `Routing/v1/Transactions/DeviceInfo/${deviceId}?${tenantId}`,
        method: "GET",
      }),
    }),
    getCurrencies: builder.mutation({
      query: () => ({
        url: `Config/v1/Currencies`,
        method: "GET",
      }),
    }),
    getProcessors: builder.mutation({
      query: () => ({
        url: `Config/v1/CardProcessors`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useValidateOtpMutation,
  useGetUserMutation,
  useGetOrganizationMutation,
  useCompletePasswordResetMutation,
  useCompleteInviteMutation,
  useChangePasswordMutation,
  useGetSingleOrganizationMutation,
  useEditOrganizationMutation,
  useGetSingleUserMutation,
  useEditUserMutation,
  useCreateOrganizationMutation,
  useGetTransactionsMutation,
  useGetSingleTransactionsMutation,
  useStatsMutation,
  useGetAnalysisMutation,
  useGetCountriesMutation,
  useGetCurrenciesMutation,
  useInviteUserMutation,
  useDeleteOrganizationMutation,
  useLogoutMutation,
  useGetPaymentPagesMutation,
  useCreatePaymentLinkMutation,
  useGetSinglePaymentPageMutation,
  useEditPaymentPageMutation,
  useGetMerchantsMutation,
  useGetMerchantsStatsMutation,
  useGetSingleMerchantMutation,
  useGetAnalysisDataMutation,
  useGetOrganizationStatsMutation,
  useCheckOrganizationNameMutation,
  useGetProcessorsMutation,
  useDeletePaymentPageMutation,
  useExportTransactionsMutation,
  useExportMerchantsMutation,
  useGetPaymentSummaryMutation,
  useEditProfileMutation,
  useDeleteUserMutation,
  useGetDevicesMutation,
  useExportDevicesMutation,
  useGetDevicesStatsMutation,
  useGetSingleDeviceMutation,
  useGetDeviceInfoMutation,
  useEditDeviceMutation,
  useGetTransactionBreakdownMutation,
  useRevokeDeviceAccessMutation,
} = mutationApi;
