import { baseApi } from "../api/baseApi";

/* ---------------- TYPES ---------------- */
export interface FollowDto {
  userId: number;
}

export interface Follower {
  id: number;
  name: string;
  profileImage?: string;
}

export interface FollowerResponse {
  followers: Follower[];
  following: Follower[];
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

/* ---------------- API ---------------- */
export const followsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Follow a user
    followUser: builder.mutation<ApiResponse<null>, FollowDto>({
      query: (body) => ({
        url: "/follows",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Follow"],
    }),

    // Unfollow a user
    unfollowUser: builder.mutation<ApiResponse<null>, FollowDto>({
      query: (body) => ({
        url: "/follows",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Follow"],
    }),

    // Get my followers and following
    getMyFollows: builder.query<ApiResponse<FollowerResponse>, void>({
      query: () => ({
        url: "/follows/me",
        method: "GET",
      }),
      providesTags: ["Follow"],
    }),
  }),
});


export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetMyFollowsQuery,
} = followsApi;
