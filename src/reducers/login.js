import {
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  /* todo fleiri actions */
} from '../actions/login';

const initialState = {
  isFetching: false,
  result: null,
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
        result: action.result,
        error: action.error,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        result: action.result,
        error: action.error,
      };

    default:
      return state;
  }
};
