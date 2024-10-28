
import { useRouter } from 'next/router';
import styles from "@/styles/Author.module.css"; // Ensure correct path
import { getAllbooks, getAuthorById } from '@/helper/helper';

export default function Author({ author }) {
    const router = useRouter();
    const { id } = router.query; // Get the author ID from the URL

    // Handle case when no author is found
    if (!author) {
        return <p>No author found!</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Author Page for Author ID: {id}</h1>
            <h2 className={styles.authorName}>{author.name}</h2>
            <p className={styles.biography}>{author.biography}</p>
        </div>
    );
}

// Function to generate paths for all authors
export async function getStaticPaths() {
    const books = await getAllbooks(); // Fetch all books to get authors

    // Create a set of unique author IDs from the books
    const authorIds = new Set(books.map(book => book.authorId));

    // Create paths for each author ID
    const paths = Array.from(authorIds).map(authorId => ({
        params: { id: authorId.toString() }, // Ensure authorId is a string
    }));

    return {
        paths,
        fallback: false // Return a 404 for paths not found
    };
}

export async function getStaticProps({ params }) {
    const author = getAuthorById(params.id); // Get author by ID

    return {
        props: {
            author: author || null, // If no author found, return null
        },
        revalidate: 3600 // ISR: Revalidate every hour
    };
}

