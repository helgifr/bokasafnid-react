import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user';

const initialState = {
  isFetching: false,
  isAdding: false,
  books: {},
  error: null,
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case USER_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        error: action.error,
      };

    case USER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        error: action.error,
      };

    default:
      return state;
  }
};