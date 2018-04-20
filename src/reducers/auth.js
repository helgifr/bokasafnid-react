import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_LOGOUT,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_ERROR,
} from '../actions/auth';


const user = JSON.parse(localStorage.getItem('user') || 'null');

const initialState = {
  isFetching: false,
  isAuthenticated: user ? true : false,
  user,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        message: action.message,
      };

    case LOGIN_LOGOUT:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      };

    case USER_UPDATE_REQUEST:
      return {
        ...state,
        isFetchingUser: action.isFetching,
      };

    case USER_UPDATE_ERROR:
      return {
        ...state,
        isFetchingUser: action.isFetching,
      };

     case USER_UPDATE_SUCCESS:
      return {
        ...state,
        isFetchingUser: action.isFetching,
        user: action.user,
      };

    default:
      return state;
  }
};
