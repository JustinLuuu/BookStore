import React, { useContext, useEffect } from 'react'
import { BookItem } from './BookItem';
import { context } from '../context/Context';

export const BookList = () => {

    const { loadBooks, booksState, url } = useContext(context);
    const {books} = booksState;

    useEffect(() => {
        books.length === 0 && LoadData();
    }, [])

    const LoadData = async () => {
        fetch(url)
        .then((response) => {
        if (response.ok)
            return response.json()
        else
            alert(`the service response has a ${response.status} http status code!`);
            return [];
        })
        .then(data => loadBooks(data))
        .catch(err => alert('there is an error', err))
    }

    return (
        <>
            <h2 className='text-white'>Book List</h2>

            {
                books.length === 0 ?
                    (<h3 className='text-white h1'>Loading books</h3>)
                    :
                    (
                        <ul className='list-group d-flex flex-column align-items-center'>
                            {
                                books.map((book, idx) => (
                                    <li className='list-item list-unstyled m-4 w-100'>
                                        <BookItem info={book} key={book.id + idx} />
                                    </li>
                                ))
                            }
                        </ul>
                    )
            }
        </>
    )
}

export default BookList;