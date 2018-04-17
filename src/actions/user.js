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

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';

  function requestUpdate() {
    return {
      type: UPDATE_REQUEST,
      isFetching: true,
      isAuthenticated: false,
    }
  }
  
  function updateError(message) {
    return {
      type: UPDATE_ERROR,
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }
  
  function receiveUpdate(user) {
    return {
      type: UPDATE_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      user,
      message: null,
    }
  }

  export const updateName = (name) => {
    return async (dispatch) => {
      dispatch(requestUpdate());
  
      let update;
      const data = {name};
      try {
        update = await api.patch(`/users/me`, data);
      } catch (e) {
        return dispatch(updateError(e))
      }
      dispatch(receiveUpdate(update.result));
    }
  }
  
  export const updatePassword = (password) => {
    return async (dispatch) => {
      dispatch(requestUpdate());
  
      let update;
      const data = {password};
      try {
        update = await api.patch(`/users/me`, data);
      } catch (e) {
        return dispatch(updateError(e))
      }
      dispatch(receiveUpdate(update.result));
    }
  }