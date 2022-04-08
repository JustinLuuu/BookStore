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
            {
                selectedBook ?
                (
                    <>
                        <h2 className='text-white mb-2'>
                            Whole info of {selectedBook.title}
                        </h2>
                        <Book infoBook={selectedBook} />
                    </>
                )
                :
                (
                    bookList.length !== 0 ?
                    (
                        <>
                            <h2 className='text-white'>Book List</h2>
                            <ul className='list-group d-flex flex-column align-items-center'>
                                {
                                    bookList.map((book, idx) => (
                                        <li className='list-item list-unstyled m-4 w-100'>
                                            <Book infoBook={book} key={book.id + idx} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                    )
                    :
                    (
                        <h3 className='text-white h1'>No books yet..</h3>
                    )
                )
            }
        </>
    )
}

export default BookView;