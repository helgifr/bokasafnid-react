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
    isReviewing: false,
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
  let reviewResult; 
  return async (dispatch) => {
      dispatch(addingReview());
      try {
        reviewResult = await api.post('/users/me/read', { bookId, rating, review});          
      } catch (e) {
        return dispatch(addingreviewError([{ message: e }]))
      }
      if (review.status >= 400) {
        return dispatch(addingreviewError(review.result.errors))
      }
      //console.log(reviewResult);
      dispatch(receiveReview(review.result))
    }
  }

  export const getReview = () => {
    let reviewResult; 

    return async (dispatch) => {
        dispatch(addingReview());
        try {
          reviewResult = await api.get(`/users/me/read`);          
        } catch (e) {
          return dispatch(addingreviewError([{ message: e }]))
        }
        if (reviewResult.status >= 400) {
          return dispatch(addingreviewError(reviewResult.errors))
        }
        dispatch(receiveReview(reviewResult.result))
      }
    }