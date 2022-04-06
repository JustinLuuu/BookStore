import React, { useContext, useEffect } from 'react'
import { BookItem } from './BookItem';
import { context } from '../context/Context';

export const BookList = () => {

    const { loadBooks, booksState, url } = useContext(context);
    const {books} = booksState;

    useEffect(() => {
        books.length === 0 && LoadData();
    }, []);

    return (
        <>
            <h2 className='text-white'>Book List</h2>

            {
                books.length !== 0 ?                    
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
                :
                (
                <h3 className='text-white h1'>Loading books</h3>
                )
            }
        </>
    )
}

export default BookList;