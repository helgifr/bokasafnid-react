import api from '../api';

export const REVIEW_REQUEST = 'REVIEW_REQUEST';
export const REVIEW_ERROR = 'REVIEW_ERROR';
export const REVIEW_SUCCESS = 'REVIEW_SUCCESS';

function addingReview() {
  return {
    type: REVIEW_REQUEST,
    isReviewing: true,
    error: null,
  }
}

function addingreviewError(error) {
  return {
    type: REVIEW_ERROR,
    isReviewing: true,
    review: [],
    error: error,
  }
}

function receiveReview(review) {
  return {
    type: REVIEW_SUCCESS,
    isReviewing: false,
    review,
    error: null,
  }
}

export const addReview = (bookId, rating, review) => {
    return async (dispatch) => {
      dispatch(addingReview());
      let reviewResult;
      try {
        reviewResult = await api.post('/users/me/read', { bookId, rating, review});        
      } catch (e) {
        return dispatch(addingreviewError([{ message: e }]))
      }
  
      if (review.status >= 400) {
        return dispatch(addingreviewError(review.result.errors))
      }
      
      dispatch(receiveReview(review.result))
    }
  }