import data from '../Data.json'

export function getAllbooks(){
    return data.books;
}
export function getFeaturedBooks(){
    return data.books
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3); // Get top 3 rated books
}
export function getAllgenres(){
    return data.genres
}
export const getAuthorById=(id)=>{
    return data.authors.find((i)=>{
        return i.id===id
    });
}

export const getBookById=(id)=>{
    return data.books.find((i)=>{
        return i.id===id
    });
}
export function getAllAuthors(){
   return data.authors
}