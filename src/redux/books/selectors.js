export const selectRecommendedBooks = (state) => state.recommended.books;
export const selectTotalPages = (state) => state.recommended.totalPages;
export const selectCurrentPage = (state) => state.recommended.currentPage;
export const selectIsLoading = (state) => state.recommended.isLoading;
export const selectError = (state) => state.recommended.error;
