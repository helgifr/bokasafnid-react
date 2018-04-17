import {
    SIGNUP_REQUEST,
    SIGNUP_ERROR,
    SIGNUP_SUCCESS,
    /* todo fleiri actions */
  } from '../actions/auth';

  const initialState = {
    isFetching: false,
    error: null,
    errors: [],
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        return {
          ...state,
          isFetching: action.isFetching,
        };
  
      case SIGNUP_ERROR:
        return {
          ...state,
          isFetching: action.isFetching,
          result: action.result,
          errors: action.errors,
        };
  
      case SIGNUP_SUCCESS:
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
  