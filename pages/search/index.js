import { useState, useEffect } from 'react';
import { getAllbooks } from '@/helper/helper'; // Adjust the path as necessary
import { getAllAuthors } from '@/helper/helper'; // Adjust the path as necessary
import styles from '@/styles/Search.module.css'; // Adjust the path as necessary

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [allAuthors, setAllAuthors] = useState([]);

    useEffect(() => {
        const books = getAllbooks(); // Fetch all books
        const authors = getAllAuthors(); // Fetch all authors
        setAllBooks(books);
        setAllAuthors(authors);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();

        const filteredBooks = allBooks.filter(book => {
            const titleMatch = book.title && book.title.toLowerCase().includes(query.toLowerCase());
            const authorMatch = allAuthors.find(author => author.id === book.authorId && author.name.toLowerCase().includes(query.toLowerCase()));
            return titleMatch || authorMatch;
        });

        setResults(filteredBooks);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Search Books</h1>
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Search by title or author name"
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>Search</button>
            </form>
            
            {results.length > 0 ? (
                <ul className={styles.resultsList}>
                    {results.map((book) => (
                        <li key={book.id} className={styles.resultItem}>
                            <h2>{book.title}</h2>
                            <p>Author: {allAuthors.find(author => author.id === book.authorId)?.name}</p> {/* Display author name */}
                            <p>Price: ${book.price}</p>
                            <p>Rating: {book.rating} / 5</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noResults}>No results found.</p>
            )}
        </div>
    );
}
