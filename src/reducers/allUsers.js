import { ALL_USERS_REQUEST, ALL_USERS_ERROR, ALL_USERS_SUCCESS } from '../actions/allUsers';

const initialState = {
  isFetching: false,
  isAdding: false,
  users: {},
  error: null,
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case ALL_USERS_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        users: action.users,
        error: action.error,
      };

    case ALL_USERS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        users: action.users,
        error: action.error,
      };

    default:
      return state;
  }
};