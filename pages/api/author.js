import { getAllAuthors } from "@/helper/helper";



const authors=getAllAuthors();
export default function handler(req, res) {
    res.status(200).json(authors);
}