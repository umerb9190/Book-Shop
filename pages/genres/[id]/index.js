import { useRouter } from 'next/router';
import styles from "@/styles/GenreDetail.module.css"; // Ensure correct path
import { getAllbooks, getAllgenres } from '@/helper/helper';
import Link from 'next/link';

export default function GenreDetail({ matchingBooks, genreId }) {
    // Handle case when no books match the genre ID
    if (matchingBooks.length === 0) {
        return <p>No books found for this genre!</p>;
    }

    return (
        <div className={styles.container}>
            <h1>Books in Genre ID: {genreId}</h1>
            {matchingBooks.map((book) => (
                <div key={book.id} className={styles.bookItem}>
                    <p className={styles.genreID}>Book ID: {book.id}</p>
                    <p className={styles.bookTitle}>{book.title}</p>
                    <Link href={`/books/${book.id}`}>View detail</Link>
                </div>
            ))}
        </div>
    );
}

// Function to generate paths for all genres
export async function getStaticPaths() {
    const genres = await getAllgenres(); // Fetch all genres to generate paths

    // Create a path for each genre based on its ID
    const paths = genres.map(genre => ({
        params: { id: genre.id.toString() }, // Ensure ID is a string
    }));

    return {
        paths,
        fallback: false, // This will show a 404 page for any paths not generated at build time
    };
}

// Function to fetch books based on genre ID
export async function getStaticProps({ params }) {
    const books = await getAllbooks(); // Fetch all books
    const matchingBooks = books.filter(book => book.genreId === params.id); // Filter books by genre ID

    return {
        props: {
            matchingBooks,
            genreId: params.id,
        },
        revalidate: 3600, // Optional: ISR for revalidation
    };
}
