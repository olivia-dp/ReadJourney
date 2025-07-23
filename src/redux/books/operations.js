import { createAsyncThunk } from "@reduxjs/toolkit";
import { readJourneyAPI } from "../auth/operations";


export const fetchRecommended = createAsyncThunk(
    "books/fetchAll",
    async ({ page, limit = 12, filters = {} }, thunkAPI) => {
      try {
        const cleanedFilters = Object.entries(filters).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== "") {
              acc[key] = value;
            }
            return acc;
          },
          {},
        );
  
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          ...cleanedFilters,
        });
  
        const response = await readJourneyAPI.get(`/books/recommend?${params.toString()}`);
        const data = response.data;
  
        return {
          books: data.results,
          total: data.totalPages,
        };
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    },
  );