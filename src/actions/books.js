import api from '../api';
import { logoutUser } from './auth';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_ERROR = 'BOOKS_ERROR';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';

export const BOOKS_LOGOUT = 'BOOKS_LOGOUT';

function logout() {
  return {
    type: BOOKS_LOGOUT,
  }
}

function requestBooks() {
  return {
    type: BOOKS_REQUEST,
    isFetching: true,
    error: null,
  }
}

function booksError(error) {
  return {
    type: BOOKS_ERROR,
    isFetching: true,
    books: [],
    error: error,
  }
}

function receiveBooks(books) {
  return {
    type: BOOKS_SUCCESS,
    isFetching: false,
    books,
    error: null,
  }
}


export const BOOKS_ADD_REQUEST = 'BOOKS_ADD_REQUEST';
export const BOOKS_ADD_ERROR = 'BOOKS_ADD_ERROR';
export const BOOKS_ADD_SUCCESS = 'BOOKS_ADD_SUCCESS';

function addingBook() {
  return {
    type: BOOKS_ADD_REQUEST,
    isAdding: true,
    errors: null,
  }
}

function addBooksError(errors) {
  
  return {
    type: BOOKS_ADD_ERROR,
    isAdding: true,
    book: [],
    errors,
  }
}

function receiveAddBook(book) {
  return {
    type: BOOKS_ADD_SUCCESS,
    isAdding: false,
    book,
    errors: null,
  }
}

export const CATEGORY_REQUEST = 'CATEGORY_REQUEST';
export const CATEGORY_ERROR = 'CATEGORY_ERROR';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';

function requestCategory() {
  return {
    type: CATEGORY_REQUEST,
    isFetching: true,
    error: null,
  }
}

function categoryError(error) {
  return {
    type: CATEGORY_ERROR,
    isFetching: true,
    books: [],
    error: error,
  }
}

function receiveCategory(category) {
  return {
    type: CATEGORY_SUCCESS,
    isFetching: false,
    category,
    error: null,
  }
}

export const fetchCategory = () => {
  return async (dispatch) => {
    dispatch(requestCategory());

    let category;
    try {
      category = await api.get(`/categories?limit=100`) ;
    } catch (e) {
      return dispatch(categoryError(e))
    }
    if (category.status === 401) {
      dispatch(logout());
    }
    dispatch(receiveCategory(category.result));
  }
}

export const fetchBooks = (endpoint) => {
  return async (dispatch) => {
    dispatch(requestBooks());

    let books;
    try {
      books = await api.get(`/books${endpoint}`);
    } catch (e) {
      return dispatch(booksError(e))
    }
    if (books.status === 401) {
      dispatch(logout());
    }
    dispatch(receiveBooks(books.result));
  }
}

export const addBook = (title, isbn13, author, description, category, isbn10, published, pageCount, language) => {
  return async (dispatch) => {
    dispatch(addingBook());

    let book;
    try {
      book = await api.post('/books', { title, isbn13, author, description, category, isbn10, published, pageCount, language });
    } catch (e) {
      return dispatch(addBooksError([{ message: e }]))
    }

    if (book.status === 401) {
      dispatch(logout());
    }

    if (book.status >= 400) {
      return dispatch(addBooksError(book.result.errors))
    }
    
    dispatch(receiveAddBook(book.result))
  }
}

export const patchBook = (id, title, isbn13, author, description, category, isbn10, published, pageCount, language) => {
  return async (dispatch) => {
    dispatch(addingBook());

    let book;
    try {
      book = await api.patch(`/books/${id}`, { title, isbn13, author, description, category, isbn10, published, pageCount, language });
    } catch (e) {
      return dispatch(addBooksError([{ message: e }]));
    }

    if (book.status === 401) {
      dispatch(logout());
    }

    if (book.status >= 400) {
      return dispatch(addBooksError(book.result.errors));
    }

    dispatch(receiveAddBook(book.result));
  }
}