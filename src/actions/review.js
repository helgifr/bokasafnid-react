import api from '../api';

export const REVIEW_REQUEST = 'REVIEW_REQUEST';
export const REVIEW_ERROR = 'REVIEW_ERROR';
export const REVIEW_SUCCESS = 'REVIEW_SUCCESS';

export const LOGOUT_REVIEW = 'LOGOUT_REVIEW';

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

function logout() {
  return {
    type: LOGOUT_REVIEW,
  }
}

export const addReview = (bookId, rating, review) => {
  let reviewResult; 
  return async (dispatch) => {
      dispatch(addingReview());
      try {
        reviewResult = await api.post('/users/me/read', { bookId, rating, review});
        console.log('helgi');
      } catch (e) {
        return dispatch(addingreviewError([{ message: e }]))
      }
      console.log('helgi');

      if (reviewResult.status === 401) {
        dispatch(logout());
      }
      if (review.status >= 400) {
        return dispatch((review.result.errors))
      }
      //console.log(reviewResult);
      dispatch(receiveReview(review.result))
    }
  }

  export const getReview = () => {
    let reviewResult; 

    return async (dispatch) => {
        dispatch(addingReview());
        console.log('ds');
        
        try {
          reviewResult = await api.get(`/users/me/read`);          
          console.log(reviewResult);
        } catch (e) {
          console.log(reviewResult);
          return dispatch(addingreviewError([{ message: e }]))
        }
        if (reviewResult.status === 401) {
          dispatch(logout());
          
        }
        
        if (reviewResult.status >= 400) {
          return dispatch(addingreviewError(reviewResult.errors))
        }
        dispatch(receiveReview(reviewResult.result))
      }
    }