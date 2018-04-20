import api from '../api';

export const ALL_USERS_REQUEST = 'ALL_USERS_REQUEST';
export const ALL_USERS_ERROR = 'ALL_USERS_ERROR';
export const ALL_USERS_SUCCESS = 'ALL_USERS_SUCCESS';

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

export const fetchUsers = (id) => {
    return async (dispatch) => {
      dispatch(requestUsers());
  
      let users;
      try {
        users = await api.get(`/users/${id}`);
      } catch (e) {
        return dispatch(usersError(e))
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
    dispatch(receiveUsers(users.result));
  }
}

