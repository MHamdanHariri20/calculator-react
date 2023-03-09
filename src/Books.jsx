import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Books.css';

export default function Books(){
    const navigate = useNavigate();
    const [books, setBooks] = useState( [])

    const getBooks = async () => {
        try {
            let response = await axios.get(
                'https://sahabatpeduliyatim.com/public/api/books'
            )
            setBooks(response.data.data)
        } catch (e){
            console.log(e.message)
        }
    }

    useEffect(() =>{
        getBooks()
    }, [])

    const handleDelete = async (book) => {
        setBooks(books.filter((b) => b.id !== book.id));
        await axios.delete(`${'https://sahabatpeduliyatim.com/public/api/delete'}/${book.id}`);
    };


return(
    <div className="container">
        <button className="btn btn-primary" onClick={() => navigate("/post/new")}>Add Books</button>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">No</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {books.map((book, index) => (
                    <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{book.title}</th>
                    <th>{book.description}</th>
                    <th><button className="btn btn-secondary" onClick={() => navigate(`/post/${book.id}`)}>Update</button></th>
                    <th><button className="btn btn-danger" onClick={() => handleDelete(book)}>
                        Remove
                    </button></th>
                    </tr>
                    ))}
                </tbody>
                </table>
    </div>
);

}
