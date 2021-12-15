import { createContext, useReducer } from "react";
import reducer from "./Reducer";

const initialState = {
  books: [],
  showMoreInfo: false
}

export const context = createContext(initialState);

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadBooks = (books) => {
    dispatch({
      type: "LOAD_ALL",
      payload: books
    });
  }

  const addBook = (book) => {
    dispatch({
      type: "ADD_BOOK",
      payload: { ...book, id: Math.floor(Math.random() * 1000000000)
      },
    });
  }

  const updateBook = (updatedBook) => {
    dispatch({
      type: "UPDATE_BOOK",
      payload: updatedBook,
    });
  }

  const deleteBook = (id) => {
    dispatch({
      type: "DELETE_BOOK",
      payload: id,
    });
  }

  const ableShowmoreInfoBook = (status) => {
    dispatch({
      type: "SHOW_MORE_INFO_BOOK",
      payload: status,
    });
  }

  return (
    <context.Provider
      value={{
        booksState: state,
        url: 'https://localhost:7200/api/Books',
        loadBooks,
        addBook,
        updateBook,
        deleteBook,
        ableShowmoreInfoBook
      }}
    >
      {children}
    </context.Provider>
  );
}
