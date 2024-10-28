import { getAllgenres } from "@/helper/helper";
import styles from "@/styles/Genre.module.css"; // Ensure this path is correct
import Link from "next/link";

export default function Genre({ genres }) {
    return (
        <div className={styles.container}>
            {genres.map((genre) => (
                <div key={genre.id} className={styles.genreItem}>
                    <p className={styles.genreID}>{genre.id}</p>
                    <p className={styles.genreName}>{genre.name}</p>
                    <Link className={styles.viewDetailButton} href={`/genres/${genre.id}`}>View Detail</Link>
                </div>
            ))}
        </div>
    );
}

// Function to fetch genres on every request
export async function getServerSideProps() {
    const genres = await getAllgenres(); // Ensure this function returns a promise

    return {
        props: {
            genres,
        },
    };
}
