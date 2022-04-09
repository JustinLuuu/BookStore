import React, { useContext, useEffect } from 'react'
import { fetchAllBooks } from '../../api/books'
import { Book } from './Book';
import { context } from '../context/Context';

export const BookView = () => {
    const { loadBooks, booksState } = useContext(context);
    const { books: bookList, selectedBook } = booksState;

    const loadAllBooks = async () => {
        const booksFetched = await fetchAllBooks();
        loadBooks(booksFetched);
    }

    useEffect(() => {
        bookList.length === 0 && loadAllBooks();
    }, []);

    return (
        <>
            <h2 className='text-white mb-3'>
                {
                    bookList.length !== 0 ? 
                    (!selectedBook ? 'Book List' : `Whole info of ${selectedBook.title}`) 
                    : 'No books yet..'
                }
            </h2>

            {!selectedBook ?
            <ul className='list-group d-flex flex-column align-items-center'>
                {
                    bookList.map((book, idx) => (
                        <li className='list-item list-unstyled m-4 w-100'>
                            <Book infoBook={book} key={book.id + idx} />
                        </li>
                    ))
                }
            </ul>
            :
            <Book infoBook={selectedBook} />
            }
        </>
    )
}

export default BookView;