import { baseApi } from "../api/baseApi";
import { userLoggedIn } from "./authSlice";
import { jwtDecode } from "jwt-decode";
export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log(
          //   "queryFulfilled result:",
          //   result?.data?.data?.accessToken
          // );
          const user = jwtDecode(result?.data?.data?.accessToken);
          // console.log("user token:",user)
          // localStorage.setItem(
          //   "womensAuth",
          //   JSON.stringify({
          //     accessToken: result?.data?.token,
          //     user: user,
          //   })
          // );

          dispatch(
            userLoggedIn({
              accessToken: result?.data?.data?.accessToken,
              user: user,
            })
          );
        } catch (err) {
          console.log("something went to wrong", err);
          // do nothing
        }
      },
    }),

    allUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useAllUserQuery,
  useUpdateUserMutation,
} = authApi;