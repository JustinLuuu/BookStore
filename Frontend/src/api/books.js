const url = 'https://localhost:44366/api/Books';

export const fetchAllBooks = () => {
    const bookList = fetch(url) .then((response) => response.json())
    .then((data) => data)
    .catch(err=> alert('error', err));

    return bookList;
}

