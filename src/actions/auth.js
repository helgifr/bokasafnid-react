
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */

import api from '../api';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_ERROR = 'BOOKS_ERROR';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';

function requestBooks() {
  return {
    type: BOOKS_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

function booksError(error) {
  return {
    type: BOOKS_ERROR,
    isFetching: false,
    books: [],
    error: error,
  }
}

function receiveBooks(books) {
  return {
    type: BOOKS_SUCCESS,
    isFetching: false,
    books,
    message: 'success',
  }
}

export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch(requestBooks());

    let result;
    try {
      console.log(window.location);
      
      result = await api.get(window.location);
    } catch (e) {
      return dispatch(booksError(e));
    }

    dispatch(receiveBooks(result.result));
  }
}

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

function requestAuth() {
  return {
    type: AUTH_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

function authError(error) {
  return {
    type: AUTH_ERROR,
    isFetching: false,
    result: null,
    error: error,
  }
}

function receiveAuth(result) {
  return {
    type: AUTH_SUCCESS,
    isFetching: false,
    result,
    message: 'success',
  }
}

export const checkAuth = () => {
  return async (dispatch) => {
    dispatch(requestAuth());

    let result;
    try {
      result = await api.get('/users');
    } catch (e) {
      return dispatch(authError(e));
    }

    dispatch(receiveAuth(result));
  }
}
/* todo fleiri action */

/* todo async "thunk" fyrir tengingu við vefþjónustu */
