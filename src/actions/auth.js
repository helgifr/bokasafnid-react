
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    isFetching: false,
    result: null,
    error: error,
  }
}

function receiveToken(result) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    result,
    message: 'success',
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(requestLogin());

    let token;
    const data = { username, password };
    try {
      token = await api.post('/login', data);
    } catch (e) {
      return dispatch(loginError(e));
    }

    dispatch(receiveToken(token));
  }
}

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
/* todo fleiri action */

/* todo async "thunk" fyrir tengingu við vefþjónustu */
