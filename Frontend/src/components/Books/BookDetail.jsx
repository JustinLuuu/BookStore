import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { context } from '../context/Context';
import { BookItem } from './BookItem';

export const BookDetail = () => {

    const { booksState, ableShowmoreInfoBook, url } = useContext(context);
    const [book, setBook] = useState(null);
    const [message, setMessage] = useState('Finding book...');
    const history = useHistory();
    const params = useParams();
    
    const { books } = booksState;

    useEffect(() => {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            history.push('/');
            return;
        }

        if (books.length === 0) {
            fetch(url + `/${id}`)
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    alert(`the service response has a ${response.status} http status code!`);
                    return null;
            })
            .then((data) => {
                if (data) {
                    setBook(data);
                    setMessage('Detail of the selected book');
                }
                else {
                    setMessage('that book doesnt exist!');
                }
            })
            .catch((error) => {
                alert('there is an error, check on console');
                console.log(error);
                history.push("/");
            });
        }
        else {
            const foundBook = books.find(x => x.id === id);
            if (foundBook) {
                setBook(foundBook);
                setMessage('Detail of the selected book');
                ableShowmoreInfoBook(true);
            }
            else {
                setMessage('that book does not exist!');
            }
        }

        ableShowmoreInfoBook(true);
        return () => {
            ableShowmoreInfoBook(false);
        }
    }, [])

    return (
        <>
            <h2 className='text-white'>{message}</h2>

            {
                book && <BookItem info={book} />
            }
        </>
    )
}
