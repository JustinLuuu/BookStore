import React, { useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { fetchDeleteBook } from '../../api/books';
import { context } from '../context/Context';

export const Book = ({ info }) => {
    
    const { deleteBook, booksState } = useContext(context);    
    const { showMoreInfo } = booksState;

    const handleDelete = async() => {
        const idBook = info.id;
        if (window.confirm(`¿sure you want to delete ${info.title.toUpperCase()} book?`)){
           await fetchDeleteBook(idBook);
           deleteBook(idBook);
           alert('Book deleted successfully');
        }
    }

    return (
        <div className='d-flex w-50 text-white m-auto'>
            <div className='bg-primary px-4 pt-4 w-100'>
                <h3 className='bg-danger rounded text-center w-100 mb-3'>
                    {info.title}
                </h3>

                <div className='d-flex flex-column align-items-center'>
                    <h5 className='p-1 bg-dark'>Description</h5>
                    <p>{info.description.substring(0, 325) + '.'}</p>

                    {
                        showMoreInfo &&
                        (
                            <>
                                <h5 className='p-1 bg-dark'>Excerpt</h5>
                                <p>{info.excerpt.substring(0, 325) + '.'}</p>
                            </>
                        )
                    }
                </div>

                {showMoreInfo &&
                    <div>
                        <hr />
                        <p>
                            <strong className='bg-success p-1 rounded'>Published in :</strong> &nbsp;
                            <span className='badge bg-dark'>{new Date(info.publishDate).toLocaleDateString()}</span>
                        </p>

                        <p>
                            <strong className='bg-success p-1 rounded'>Page number :</strong> &nbsp;
                            <span className='badge bg-dark'>{info.pageCount}</span>
                        </p>
                    </div>
                }
            </div>

            <div className='ps-5 mt-5'>
                {
                    !showMoreInfo &&
                    <Link
                        to={`/bookDetail/${info.id}`}
                        className={'btn btn-success text-white fw-bold d-block mb-4'}
                    >
                        View details
                    </Link>
                }

                <Link
                    to={`/update/${info.id}`}
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
