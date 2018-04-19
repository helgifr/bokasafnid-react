import api from '../api';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_ERROR = 'USER_ERROR';
export const USER_SUCCESS = 'USER_SUCCESS';

function requestReadBooks() {
  return {
    type: USER_REQUEST,
    isFetching: true,
    error: null,
  }
}

function readBooksError(error) {
  return {
    type: USER_ERROR,
    isFetching: true,
    books: [],
    error: error,
  }
}

function receiveReadBooks(books) {
  return {
    type: USER_SUCCESS,
    isFetching: false,
    books,
    error: null,
  }
}

export const fetchRead = (endpoint) => {
    return async (dispatch) => {
      dispatch(requestReadBooks());
  
      let books;
      try {
        books = await api.get(`/users/me/read${endpoint}`);
      } catch (e) {
        return dispatch(readBooksError(e))
      }
      dispatch(receiveReadBooks(books.result));
    }
  }
