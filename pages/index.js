import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import data from '../Data.json'
import Books from "@/components/book_shop/Book";
import { getAllbooks, getFeaturedBooks } from "@/helper/helper";
import { useRouter } from "next/router";
import Header from "@/components/book_shop/Header";



export default function Home() {
  
  const got_books = getFeaturedBooks();

  const router=useRouter();
  const HelperButton1=()=>{
    router.push('./genres');
  }
  const HelperButton2=()=>{
    router.push('./books');
  }
  
  return (
    <div className="mainContainer">
      <Header/>
      <Books books={got_books} />
      <div className={styles.buttonContainer}>
        <button className={styles.genreButton}  onClick={HelperButton1}>View Genre</button>
        <button className={styles.genreButton} onClick={HelperButton2}>Show All Books</button>
      </div>
    </div>
  );
}


