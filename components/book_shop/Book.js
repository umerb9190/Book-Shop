import styles from '@/styles/Books.module.css';

export default function Books(props) {
  return (
    <div className={styles.booksContainer}>
      {props.books.map((i) => 
        <div key={i.id} className={styles.bookItem}> {/* Added key prop here */}
          <p className={styles.bookTitle}>{i.title}</p>
          <p className={styles.bookID}>ID: {i.id}</p>
        </div>
      )}
    </div>
  );
}
