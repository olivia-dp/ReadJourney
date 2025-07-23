import { createSlice } from "@reduxjs/toolkit";
import { fetchRecommended } from "./operations";

const initialState = {
  books: [],
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
};

const recommendedSlice = createSlice({
  name: "recommended",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommended.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecommended.fulfilled, (state, action) => {
        state.books = action.payload.books;
        state.totalPages = action.payload.total;
        state.isLoading = false;
      })
      .addCase(fetchRecommended.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = recommendedSlice.actions;
export const recommendedReducer = recommendedSlice.reducer;
