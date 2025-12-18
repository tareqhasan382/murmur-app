//import authSlice from "./auth/authSlice";

import baseApi from "./api/baseApi";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  //auth: authSlice,
};