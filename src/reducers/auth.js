import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  /* todo fleiri actions */
} from '../actions/auth';

const initialState = {
  isFetching: false,
  result: null,
  error: null,
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case AUTH_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        result: action.result,
        error: action.error,
      };

    case AUTH_SUCCESS:
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
