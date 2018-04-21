import api from '../api';

export const ALL_USERS_REQUEST = 'ALL_USERS_REQUEST';
export const ALL_USERS_ERROR = 'ALL_USERS_ERROR';
export const ALL_USERS_SUCCESS = 'ALL_USERS_SUCCESS';

export const ALL_USERS_LOGOUT = 'ALL_USERS_LOGOUT';

function requestUsers() {
  return {
    type: ALL_USERS_REQUEST,
    isFetching: true,
    error: null,
  }
}

function usersError(error) {
  return {
    type: ALL_USERS_ERROR,
    isFetching: true,
    users: [],
    error: error,
  }
}

function receiveUsers(users) {
  return {
    type: ALL_USERS_SUCCESS,
    isFetching: false,
    users,
    error: null,
  }
}

function logout() {
  return {
    type: ALL_USERS_LOGOUT,
  }
}

export const fetchUsers = (id) => {
    return async (dispatch) => {
      dispatch(requestUsers());
  
      let users;
      try {
        users = await api.get(`/users/${id}`);
      } catch (e) {
        return dispatch(usersError(e))
      }
      if (users.status === 401) {
        dispatch(logout());
      }
      dispatch(receiveUsers(users.result));
    }
  }

export const fetchUsersPage = (endpoint) => {
  return async (dispatch) => {
    dispatch(requestUsers());

    let users;
    try {
      users = await api.get(`/users${endpoint}`);
    } catch (e) {
      return dispatch(usersError(e))
    }
    if (users.status === 401) {
      dispatch(logout());
    }
    dispatch(receiveUsers(users.result));
  }
}

