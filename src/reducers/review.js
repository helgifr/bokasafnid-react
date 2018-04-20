import {
    REVIEW_REQUEST,
    REVIEW_ERROR,
    REVIEW_SUCCESS,
    /* todo fleiri actions */
  } from '../actions/review';

  const initialState = {
    isReviewing: false,
    error: null,
    errors: [],
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case REVIEW_REQUEST:
        return {
          ...state,
          isReviewing: action.isReviewing,
        };
  
      case REVIEW_ERROR:
        return {
          ...state,
          isReviewing: action.isReviewing,
          result: action.result,
          errors: action.errors,
        };
  
      case REVIEW_SUCCESS:
        return {
          ...state,
          isReviewing: action.isReviewing,
          result: action.result,
          error: action.error,
        };
  
      default:
        return state;
    }
  };