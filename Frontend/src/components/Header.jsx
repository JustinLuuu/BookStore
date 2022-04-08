import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { context } from './context/Context';

export const Header = () => {

    const { selectBook } = useContext(context);

    return (
        <header>
            <nav className='w-100 text-white d-flex justify-content-between'>
                <Link
                    to='/'
                    className='text-white'
                    onClick={() => { selectBook(null) }}
                >
                    <h1>BookStore</h1>
                </Link>

                <Link
                    to='/add'
                    className='btn btn-success h-100 fw-bold'
                >
                    Add +
                </Link>
            </nav>
        </header>
    )
}
