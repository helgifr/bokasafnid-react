import { combineReducers } from 'redux';
import auth from './auth';
import register from './register'
import books from './books';
import user from './user';
import allUsers from './allUsers';
import review from './review';

export default combineReducers({
  auth,
  register,
  books,
  user,
  allUsers,
  review,
})
