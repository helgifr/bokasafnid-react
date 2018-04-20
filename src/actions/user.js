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

export const fetchReadUser = (id, endpoint) => {
  return async (dispatch) => {
    dispatch(requestReadBooks());

    let books;
    try {
      books = await api.get(`/users/${id}/read${endpoint}`);
    } catch (e) {
      return dispatch(readBooksError(e))
    }
    dispatch(receiveReadBooks(books.result));
  }
}


export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_ERROR = 'DELETE_ERROR';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';

function requestDeleteBooks() {
  return {
    type: DELETE_REQUEST,
    isDeleting: true,
    error: null,
  }
}

function readDeleteError(error) {
  return {
    type: DELETE_ERROR,
    isDeleting: true,
    error: error,
  }
}

function successDeleteRead(books) {
  return {
    type: DELETE_SUCCESS,
    isDeleting: false,
    error: null,
  }
}

export const deleteRead = (id) => {
  return async (dispatch) => {
    dispatch(requestDeleteBooks());
    
    
    let del;
    try {
      del = await api.deleteBook(`/users/me/read/${id}`);
    } catch (e) {
      return dispatch(readDeleteError(e))
    }
    dispatch(successDeleteRead(del));
    
  }
}