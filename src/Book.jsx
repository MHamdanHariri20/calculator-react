import { useEffect, useState } from "react";
import axios from "axios";
import "./Book.css";
import { useParams, useNavigate } from "react-router-dom";


const Book = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        if (id === "new") return;
        const getBook = async () => {
            let {res} = await axios.get(`${'https://sahabatpeduliyatim.com/public/api/books'}/${id}`);
            setBook(res.data.data)
        };
        getBook();
    }, []);

    const handleChange = (e) => {
        const postClone = {...book};
        postClone[e.target.name] = e.target.value;
        setBook(postClone);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id === "new"){
            await axios.post('https://sahabatpeduliyatim.com/public/api/create', book);
            return navigate("/");
        }else{
            await axios.put(`${'https://sahabatpeduliyatim.com/public/api/update'}/${id}`, book);
            return navigate("/");
        }
    };

    return(
        <div className="container">
            <button className="btn btn-danger" onClick={() => navigate("/")}>Back</button>
            <form className="form col-6">
                    <div className="mb-3">
                        <input type="text" placeholder="title..." name="title" value={book.title} onChange={handleChange} className="form-control" id="title" />
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="description..." name="description" value={book.description} onChange={handleChange} className="form-control" id="description" />
                    </div>
                <button onClick={handleSubmit} className="btn btn-primary">
                    {id === "new" ? "post" : "update"}
                </button>
            </form>
        </div>
    )
}

export default Book;