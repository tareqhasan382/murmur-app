import { createSlice } from "@reduxjs/toolkit";

// Parse localStorage once
const authString = localStorage.getItem("murmur");
const auth = authString ? JSON.parse(authString) : null;
// const authString = localStorage.getItem("auth") ?? null;
// const auth = authString ? JSON.parse(authString) : null;
const initialState = {
  accessToken: auth ? auth.accessToken : null,
  user: auth ? auth.user : undefined,
  error: null,
};

const authSlice = createSlice({
  name: "murmur",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      //   console.log("action:", action.payload); //  accessToken

      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      localStorage.setItem(
        "murmur",
        JSON.stringify({
          accessToken: action.payload.accessToken,
          user: action.payload.user,
        })
      );
    },
    userLoggedOut: (state) => {
      // Remove item from localStorage
      localStorage.removeItem("murmur");
      // Reset state values
      state.accessToken = null;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;