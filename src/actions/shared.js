import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

// function to set authedUser to username
export function loginUser(username) {
  console.log("loginUser:", username);
  return (dispatch) => {
    return dispatch(setAuthedUser(username));
  }
}

// function to set authedUser to null
export function logoutUser() {
  return (dispatch) => {
    return dispatch(setAuthedUser(null));
  }
}

// ### ACTION CREATORS ###

// @ REDUX THUNK needed to allow returning of a function (middleware) @
// make API call to get initial data using promise to async dispatch users and questions when data is received
export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    // API call from api.js. When promise resolved, get users & questions & set authedUser
    return getInitialData()
      .then(({users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      })
  }
}