import React from 'react'
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header>
            <nav className='w-100 text-white d-flex justify-content-between'>
                <Link 
                  to='/'
                   className='text-white'
                  >
                    <h1>BookStore</h1>
                </Link>
                
                <Link 
                    to='/add'
                    className='btn btn-success h-100'
                >
                    Add a new book
                </Link>
            </nav>
        </header>
    )
}
