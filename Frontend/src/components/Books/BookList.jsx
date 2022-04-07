import React, { useContext, useEffect } from 'react'
import {fetchAllBooks} from '../../api/books'
import { Book } from './Book';
import { context } from '../context/Context';

export const BookList = () => {
    const { loadBooks, booksState } = useContext(context);
    const {books} = booksState;

    const loadAllBooks = async ()=> {
        const booksFetched = await fetchAllBooks();
        loadBooks(booksFetched);  
    }

    useEffect(()=> {
        books.length === 0 && loadAllBooks();
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
                                    <Book info={book} key={book.id + idx} />
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