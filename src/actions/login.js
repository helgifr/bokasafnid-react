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

    let result;
    const data = { username, password };
    try {
      result = await api.post('/login', data);
    } catch (e) {
      return dispatch(loginError(e));
    }
    dispatch(receiveToken(result));
  }
}