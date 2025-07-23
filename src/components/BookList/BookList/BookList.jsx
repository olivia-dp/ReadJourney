import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommended } from "../../../redux/books/operations";
import {
  selectRecommendedBooks,
  selectIsLoading,
  selectError,
  selectCurrentPage,
  selectTotalPages,
} from "../../../redux/books/selectors";

import { setCurrentPage } from "../../../redux/books/slice";
import BookCard from "../BookCard/BookCard";
import s from "./BookList.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import useMedia from "../../../hooks/useMedia";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectRecommendedBooks);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const { isMobile } = useMedia();

  useEffect(() => {
    dispatch(fetchRecommended({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      dispatch(setCurrentPage(newPage));
    }
  };

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Recommended</h3>

      {isLoading && <p>...Loading</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isLoading && books.length === 0 && <p>No books found.</p>}

      {isMobile ? (
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={16}
          navigation
          className={s.swiper}
        >
          {books.map((book) => (
            <SwiperSlide key={book._id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <ul className={s.list}>
          {books.map((book) => (
            <li key={book._id}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      )}

      {/* Pagination only on desktop */}
      {!isMobile && (
        <div className={s.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              className={s.pageBtn}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
