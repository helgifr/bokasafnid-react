import { BOOKS_REQUEST, BOOKS_ERROR, BOOKS_SUCCESS, BOOKS_ADD_REQUEST, BOOKS_ADD_ERROR, BOOKS_ADD_SUCCESS, CATEGORY_ERROR, CATEGORY_REQUEST,CATEGORY_SUCCESS } from '../actions/books';

const initialState = {
  isFetching: false,
  isAdding: true,
  books: {},
  category: [],
  error: null,
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKS_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case BOOKS_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        error: action.error,
      };

    case BOOKS_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        error: action.error,
      };

    case BOOKS_ADD_REQUEST:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: [],
      };
    case BOOKS_ADD_ERROR:
      return {
        ...state,
        isAdding: action.isAdding,
        errors: action.errors,
      };
    case BOOKS_ADD_SUCCESS:
      return {
        ...state,
        isAdding: action.isAdding,
        book: [...state.books, action.books],
        error: action.error,
      };
      
      case CATEGORY_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAdding: true,
        errors: [],
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        isAdding: true,
        errors: action.errors,
      };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAdding: true,
        category: [...state.category, action.category],
        error: action.error,
      };

    default:
      return state;
  }
};