
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */

import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  }
}

function loginError(message) {
  return {
    type: LOGIN_ERROR,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  }
}

function logout() {
  return {
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(requestLogin());

    let login;
    const data = { username, password };
    try {
      login = await api.post('/login', data);
    } catch (e) {
      return dispatch(loginError(e));
    }

    if (login.status === 401) {
      dispatch(loginError(login.result));
    } else {
      const { user, token } = login.result;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(receiveLogin(user));
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    dispatch(logout());
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
      result = await api.get(window.location);
    } catch (e) {
      return dispatch(booksError(e));
    }

    dispatch(receiveBooks(result.result));
  }
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

function requestSignup() {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    message: null,
  }
}

function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    isFetching: false,
    result: error,
    errors: error.result.errors,
  }
}

function receiveResult(result) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    result,
    message: 'success',
  }
}

export const signup = (name, username, password) => {
  return async (dispatch) => {
    dispatch(requestSignup());
    let result;
    const data = { name, username, password };
    try {
      result = await api.post('/register', data);
    } catch (e) {
      return dispatch(signupError(e));
    }

    if (result.status === 400) {
      dispatch(signupError(result));
    } else {
      dispatch(receiveResult(result));
    }
  }
}
