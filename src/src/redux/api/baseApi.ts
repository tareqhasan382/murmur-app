import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const BASEURL = "http://localhost:8000"; //"http://localhost:8000/api/v1/";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders: (headers) => {
      const authString = localStorage.getItem("murmur");
      // console.log("authString:", authString);
      const auth = authString ? JSON.parse(authString) : null;
      // console.log("auth:", auth);
      const token = auth ? auth.accessToken : null;
      if (token) {
        // console.log("token:", token);
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["auth"],
});

export default baseApi;