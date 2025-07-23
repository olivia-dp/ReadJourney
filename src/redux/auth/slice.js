import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  registerThunk,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isAuthLoading: false,
  isAuthError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logoutThunk.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUserThunk.rejected, (state) => {
        state.isRefreshing = false;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addMatcher(
        isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled),
        (state, action) => {        
          state.user.name = action.payload.name;
          state.user.email = action.payload.email;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        isAnyOf(registerThunk.pending, loginThunk.pending),
        (state) => {
          state.isAuthLoading = true;
          state.isAuthError = null;
        }
      )
      .addMatcher(
        isAnyOf(registerThunk.rejected, loginThunk.rejected),
        (state, action) => {
          state.isAuthLoading = false;
          state.isAuthError = action.payload;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
