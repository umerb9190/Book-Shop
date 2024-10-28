import { getAllbooks, getAllgenres } from '@/helper/helper'; // Adjust the path as necessary
import styles from '@/styles/BookDetail.module.css'; // Adjust the path as necessary
import Link from 'next/link';

const BookDetail = ({ book, genres }) => {
    if (!book) {
        return <p>Book not found!</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.author}>Author: {book.authorName}</p>
            <p className={styles.genre}>Genre: {genres.find(genre => genre.id === book.genreId)?.name}</p>
            <p className={styles.price}>Price: ${book.price}</p>
            <p className={styles.rating}>Rating: {book.rating} / 5</p>
            <p className={styles.description}>{book.description}</p>
            <Link href={`/books/${book.id}/author`}>Show author</Link>
        </div>
    );
};

// Function to generate paths for all books
export async function getStaticPaths() {
    const allBooks = await getAllbooks();

    // Create a path for each book based on its id
    const paths = allBooks.map(book => ({
        params: { id: book.id.toString() }, // Ensure id is a string
    }));

    return {
        paths,
        fallback:true // Enable fallback mode for ISR
    };
}

export async function getStaticProps({ params }) {
    const allBooks = await getAllbooks();
    const genres = await getAllgenres();

    const book = allBooks.find(book => book.id.toString() === params.id);

    // Return notFound if the book is not found
    if (!book) {
        return {
            notFound: true, // This will render a 404 page
        };
    }

    return {
        props: {
            book,
            genres
        },
        revalidate: 3600 // ISR: Revalidate every hour
    };
}

export default BookDetail;
