import { useContext, useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { context } from "../context/Context";

const initialStateForm = { id: 0, title: '', description: '', pageCount: 1, excerpt: '', publishDate: '' }

export const BookForm = () => {

    const [formValues, setFormValues] = useState(initialStateForm);
    const { addBook, updateBook, booksState, url } = useContext(context);
    const history = useHistory();
    const params = useParams();

    const { books } = booksState;

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: !params.id ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        };

        if (!params.id) {
            fetch(url, options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        alert(`the service response has a ${response.status} http status code!`);
                        return null;
                    }
                })
                .then((newBook) => {
                    if (newBook) {
                        addBook(JSON.parse(newBook.result));
                        alert('added succesfully');
                    }
                })
        }
        else {
            fetch(url + `/${formValues.id}`, options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        alert(`the service response has a ${response.status} http status code!`);
                        return null;
                    }
                })
                .then((updatedBook) => {
                    if (updatedBook) {
                        updateBook(JSON.parse(updatedBook.result));
                        alert(`book ${formValues.title} updated succesfully`)
                    }
                })
        }
        history.push("/");
    }

    useEffect(() => {
        const id = params.id;

        if (id) {
            if (isNaN(parseInt(id))) {
                history.push('/');
                return;
            }

            if (books.length === 0) {
                fetch(url + `/${params.id}`)
                    .then((response) => {
                        if (response.ok)
                            return response.json();
                        else
                            alert(`the service response has a ${response.status} http status code!`);
                        return null;
                    })
                    .then((data) => {
                        if (data) {
                            setFormValues(data);
                        }
                        else {
                            alert('that book doesnt exist!')
                            history.push('/');
                        }
                    })
                    .catch((error) => {
                        alert('there is an error', error);
                        history.push("/");
                    });
            }
            else {
                const foundBook = books.find(x => x.id === parseInt(id));
                if (foundBook) {
                    setFormValues(foundBook);
                }
                else {
                    alert('that book doesnt exist!');
                    history.push("/");
                }
            }
        }
    }, []);

    useEffect(() => {
        if (!params.id) {
            setFormValues(initialStateForm);
        }
    }, [params.id])

    return (
        <div className='d-flex flex-column align-items-center pt-4 text-white w-100'>
            <h2 className='text-white'>{!params.id ? 'Add new book' : 'Update this book'}</h2>

            <form onSubmit={handleSubmit} className="w-25 pt-3">
                <div className="">
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
                        value={!params.id ? formValues.publishDate : formValues.publishDate.substring(0, 10)}
                        onChange={handleChange}
                        className="form-control mt-3"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success mt-4">
                    {!params.id ? 'Add this Book' : 'Update this Book'}
                </button>

                {
                    params.id &&
                    <Link
                        to='/'
                        className={'btn btn-danger text-white fw-bold d-block mb-4 w-50 mt-2'}
                    >
                        Cancelar
                    </Link>
                }
            </form>
        </div>
    )
}

export default BookForm;