import { baseApi } from "../api/baseApi";

/* ---------------- TYPES ---------------- */

export interface User {
  id: number;
  name: string;
  profileImage?: string;
}

export interface Murmur {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  user: User;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface TimelineQuery {
  page?: number;
  limit?: number;
}

/* ---------------- API ---------------- */

export const murmursApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🟢 Get timeline
  getMurmurs: builder.query<ApiResponse<Murmur[]>, TimelineQuery | void>({
  query: (params) => ({
    url: "/murmurs/murmurs",
    method: "GET",
    ...(params ? { params } : {}),
  }),
  providesTags: ["Murmur"],
}),

    // 🟢 Create murmur
    createMurmur: builder.mutation<ApiResponse<Murmur>, { content: string }>({
      query: (body) => ({
        url: "/murmurs/me/murmurs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Murmur"],
    }),

    // 🔴 Delete murmur
    deleteMurmur: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: `/murmurs/me/murmurs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Murmur"],
    }),

    // ❤️ Like murmur
    likeMurmur: builder.mutation<ApiResponse<null>, number>({
      query: (id) => ({
        url: `/murmurs/murmurs/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Murmur"],
    }),
  }),
});

/* ---------------- HOOKS ---------------- */

export const {
  useGetMurmursQuery,
  useCreateMurmurMutation,
  useDeleteMurmurMutation,
  useLikeMurmurMutation,
} = murmursApi;
