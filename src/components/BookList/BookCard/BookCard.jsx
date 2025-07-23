import s from "./BookCard.module.css"

const BookCard = ({ book }) => (
    <div className={s.bookBox}>
    <img src={book.imageUrl} alt='Book image' className={s.img}></img>
      <h3 className={s.title}>{book.title}</h3>
      <p className={s.author}>Author: {book.author}</p>
    </div>
  );

export default BookCard


