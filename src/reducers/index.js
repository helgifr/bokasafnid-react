import { combineReducers } from 'redux';
import auth from './auth';
import register from './register'
import books from './books';
import user from './user';

export default combineReducers({
  auth,
  register,
  books,
  user,
})
