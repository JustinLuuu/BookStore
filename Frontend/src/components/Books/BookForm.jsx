import { useContext, useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { fetchAddNewBook, fetchUpdateBook } from "../../api/books";
import { context } from "../context/Context";

const initialStateForm = { id: 0, title: '', description: '', pageCount: 1, excerpt: '', publishDate: '' };

export const BookForm = () => {
    
    const { addBook, updateBook, booksState } = useContext(context);
    const [formValues, setFormValues] = useState(initialStateForm);
    const history = useHistory();
    const params = useParams();
    const {books: bookList} = booksState;
    const idParams = params.id ? parseInt(params.id) : null;

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let bookReturned = null;
        if (!idParams) {
            bookReturned = await fetchAddNewBook(formValues);
            addBook(bookReturned);
        } else {
            bookReturned = await fetchUpdateBook(formValues, formValues.id);
            updateBook(bookReturned);
        }

        alert(`Book ${!idParams ? 'added' : 'updated'} successfully`);
        history.push("/");
    }

    useEffect(() => {
        if (isNaN(idParams)) {
            history.push('/');
        }
    }, [idParams]);

    useEffect(() => {
        if (!idParams) {
            setFormValues(initialStateForm);
        }
    }, [idParams])

    useEffect(() => {
        if (idParams) {
            const foundBook = bookList.find(x => x.id === idParams);
            if (foundBook) {
                setFormValues(foundBook);
            }
            else {
                alert('that book doesnt exist!');
                history.push("/");
            }
        }
    }, [idParams])



    return (
        <div className='d-flex flex-column align-items-center pt-4 text-white w-100'>
            <h2 className='text-white'>{!idParams ? 'Add new book' : 'Update this book'}</h2>

            <form onSubmit={handleSubmit} className="w-25 pt-3">
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        placeholder="Write a title"
                        className="form-control mt-3"
                        required
                    />
                </div>

                <div className="mt-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                        placeholder="Write a description"
                        className="form-control mt-3"
                        required
                    />
                </div>

                <div className="mt-3">
                    <label>Excerpt</label>
                    <textarea
                        name="excerpt"
                        value={formValues.excerpt}
                        onChange={handleChange}
                        placeholder="Write an excerpt"
                        className="form-control mt-3"
                        required
                    />
                </div>

                <div className="mt-3">
                    <label>Page Count</label>
                    <input
                        type="number"
                        name="pageCount"
                        value={formValues.pageCount}
                        onChange={handleChange}
                        placeholder="Type the page count"
                        className="form-control mt-3"
                        required
                    />
                </div>

                <div className="mt-3">
                    <label>Publish Date</label>
                    <input
                        type="date"
                        name="publishDate"
                        value={!idParams ? formValues.publishDate : formValues.publishDate.substring(0, 10)}
                        onChange={handleChange}
                        className="form-control mt-3"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success mt-4">
                    {!idParams ? 'Add this Book' : 'Update this Book'}
                </button>

                <Link
                    to='/'
                    className={'btn btn-danger text-white fw-bold d-block mb-4 w-50 mt-2'}
                >
                    Cancelar
                </Link>
            </form>
        </div>
    )
}

export default BookForm;