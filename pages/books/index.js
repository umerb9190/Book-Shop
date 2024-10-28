import { useState } from 'react';
import { getAllbooks, getAllgenres } from '@/helper/helper';
import Link from 'next/link';
import styles from '@/styles/AllBooks.module.css';
import Header from '@/components/book_shop/Header';

export default function AllBooks({ books, genres }) {
    const [selectedGenre, setSelectedGenre] = useState('all');

    // Filter books based on the selected genre
    const filteredBooks = selectedGenre === 'all' 
        ? books 
        : books.filter(book => book.genreId === selectedGenre);
    return (
        <div className={styles.container}>
              <Header/>
            <h1 className={styles.title}>All Books</h1>
            
            <div className={styles.filterContainer}>
                <select 
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="all">All Genres</option>
                    {genres && genres.length > 0 ? (
                        genres.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name} {/* Display the genre name */}
                            </option>
                        ))
                    ) : (
                        <option disabled>No genres available</option> // Message if genres are not available
                    )}
                </select>
            </div>

            <div className={styles.bookList}>
                {filteredBooks.map(book => (
                    <div key={book.id} className={styles.bookItem}>
                        <p className={styles.bookID}>ID: {book.id}</p>
                        <p className={styles.bookTitle}>{book.title}</p>
                        <p className={styles.bookGenre}>Genre: {genres.find(genre => genre.id === book.genreId)?.name}</p> {/* Show genre name */}
                        <p className={styles.bookPrice}>Price: ${book.price}</p>
                        <p className={styles.bookRating}>Rating: {book.rating} / 5</p>
                        <Link className={styles.viewDetailButton} href={`/books/${book.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const allBooks = await getAllbooks();
    const genres = await getAllgenres();

    return {
        props: {
            books: allBooks,
            genres
        },
        revalidate: 3600 // ISR: Revalidate every hour
    };
}
