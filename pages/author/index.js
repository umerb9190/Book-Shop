import useSWR from 'swr';
// Adjust the path to your fetcher function
import styles from "@/styles/Author.module.css"; // Your CSS styles
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Author() {
    // Use SWR to fetch authors data
    const { data, error } = useSWR('/api/author', fetcher); // Replace with your API endpoint
  
    // Handle loading state
    if (!data) return <p>Loading authors...</p>;

    // Handle error state
    if (error) return <p>Error loading authors: {error.message}</p>;

    return (
        <div className={styles.authorContainer}>
            {data.map((author) => (
                <div key={author.id} className={styles.authorItem}>
                    <p>Name: {author.name}</p>
                    <p>Biography: {author.biography}</p>
                    <p>Author ID: {author.id}</p>
                </div>
            ))}
        </div>
    );
}
