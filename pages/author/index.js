import useSWR from 'swr';
import styles from "@/styles/Authors.module.css";
import Header from '@/components/book_shop/Header';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Authors() {
    
    const { data, error } = useSWR('/api/author', fetcher);

    if (!data) return <p className={styles.loadingErrorText}>Loading authors...</p>;
    if (error) return <p className={styles.loadingErrorText}>Error loading authors: {error.message}</p>;

    return (
        <>
        <Header/>
        <div className={styles.authorContainer}>
           
            {data.map((author) => (
                <div key={author.id} className={styles.authorItem}>
                    <p className={styles.authorText}>Name: {author.name}</p>
                    <p className={styles.authorText}>Biography: {author.biography}</p>
                    <p className={styles.authorText}>Author ID: {author.id}</p>
                </div>
            ))}
        </div>
        </>
    );
}
