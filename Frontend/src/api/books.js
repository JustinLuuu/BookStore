const url = 'https://localhost:44366/api/books';
let responseApi = null;

export const fetchAllBooks = () => {
    responseApi= fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch(err => alert(err));

    return responseApi;
}

export const fetchAddNewBook = async(book) => {
    responseApi = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    })
    .then((response) => response.json())
    .then((data) => data)
    .catch(err => alert(err));

    return responseApi;
}

export const fetchUpdateBook = async(book, id) => {
    responseApi = await fetch(url + `/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    })
    .then((response) => response.json())
    .then((data) => data)
    .catch(err => alert(err));

    return responseApi;
}

export const fetchDeleteBook = async(id) => {
    responseApi = await fetch(url + `/${id}`, {
        method: 'DELETE',
    })
    .then((response) => response.ok)
    .then((ok) => ok)
    .catch(err => alert(err));

    return responseApi;
}
