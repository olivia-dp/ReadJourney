export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsAuthLoading = (state) => state.auth.isAuthLoading;
export const selectIsAuthError = (state) => state.auth.isAuthError;