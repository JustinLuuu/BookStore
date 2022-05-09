import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { fetchDeleteBook } from '../../api/books';
import { context } from '../context/Context';

export const Book = ({ infoBook }) => {

    const { deleteBook, selectBook, booksState } = useContext(context);
    const history = useHistory();
    const { selectedBook } = booksState;

    const handleDelete = async () => {
        const idBook = infoBook.id;
        if (window.confirm(`¿sure you want to delete ${infoBook.title.toUpperCase()} book?`)) {
            await fetchDeleteBook(idBook);
            deleteBook(idBook);
            alert('Book deleted successfully'); 
            
            if(selectedBook) {
                selectBook(null);
                history.push('/');
            }
        }
    }

    const handleSelectBook = () => {
        if (!selectedBook) {
            selectBook(infoBook);
            history.push(`/bookDetail/${infoBook.id}`);
        }
    }

    return (
        <div className='d-flex w-50 text-white m-auto' >
            <div
                className='bg-primary px-4 pt-4 w-100'
                style={{ cursor: !selectedBook ? 'pointer' : 'default' }}
                onClick={handleSelectBook}
            >
                <h3 className='bg-danger rounded text-center w-100 mb-3'>
                    {infoBook.title}
                </h3>

                <div className='d-flex flex-column align-items-center'>
                    <h5 className='p-1 bg-dark'>Description</h5>
                    <p>{infoBook.description.substring(0, 325) + '.'}</p>

                    {
                        !selectedBook ?
                        (
                            <small>Click me for whole info</small>
                        )
                        :
                        (
                            <>
                                <h5 className='p-1 bg-dark'>Excerpt</h5>
                                <p>{infoBook.excerpt.substring(0, 325) + '.'}</p>
                            </>
                        )
                    }
                </div>

                {selectedBook &&
                    <div>
                        <hr />
                        <p>
                            <strong className='bg-success p-1 rounded'>Published in :</strong> &nbsp;
                            <span className='badge bg-dark'>{new Date(infoBook.publishDate).toLocaleDateString()}</span>
                        </p>

                        <p>
                            <strong className='bg-success p-1 rounded'>Page number :</strong> &nbsp;
                            <span className='badge bg-dark'>{infoBook.pageCount}</span>
                        </p>
                    </div>
                }
            </div>

            <div className='ps-5 mt-5'>
                <Link
                    to={`/update/${infoBook.id}`}
                    className={'btn btn-warning text-white fw-bold d-block mb-4'}
                >
                    Edit
                </Link>

                <button className='btn btn-danger fw-bold' onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    )
}
