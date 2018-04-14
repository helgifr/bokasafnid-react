import {
  BOOKS_REQUEST,
  BOOKS_ERROR,
  BOOKS_SUCCESS,
  /* todo fleiri actions */
} from '../actions/auth';

const initialState = {
  isFetching: false,
  books: null,
  error: null,
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        error: action.error,
      };

    case LOGIN_SUCCESS:
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
