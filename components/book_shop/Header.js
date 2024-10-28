import Link from 'next/link';
import styles from "@/styles/Header.module.css"; // Ensure correct path

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/author" className={styles.link}>Author</Link>
                <Link href="/books" className={styles.link}>Books</Link>
                <Link href="/search" className={styles.link}>Search</Link>
                <Link href="/genres" className={styles.link}>Genres</Link>
            </nav>
        </header>
    );
}
