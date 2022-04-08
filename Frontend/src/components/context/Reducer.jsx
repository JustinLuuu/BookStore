export default function reducer(state, action) {
  switch (action.type) {

    case 'LOAD_ALL':
      return {
        ...state,
        books: action.payload
      }

    case 'ADD_BOOK':
      return {
        ...state,
        books: [action.payload, ...state.books],
      };

    case 'UPDATE_BOOK': {
      const updatedBook = action.payload;

      const updatedBooks = state.books.map((book) => {
        if (book.id === updatedBook.id) {
          return updatedBook;
        }
        return book;
      });

      return {
        ...state,
        books: updatedBooks,
      };
    }

    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };

    case 'SELECT_BOOK':
      return {
        ...state,
        selectedBook: action.payload,
      };

    default:
      return state;
  }
}