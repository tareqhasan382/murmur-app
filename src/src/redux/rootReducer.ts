import baseApi from "./api/baseApi";
import authSlice from "./auth/authSlice";
import { followsApi } from "./follows/followsApi";
import { murmursApi } from "./murmurs/murmursApi";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice,
  murmurs:murmursApi,
  follows:followsApi
};