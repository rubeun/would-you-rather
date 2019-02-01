import { RECEIVE_USERS } from '../actions/users';
import { SAVE_ANSWER, ADD_QUESTION } from '../actions/questions';

// ### USERS REDUCERS ###
// perform action on state and return a new updated state or orginal state if no action
export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case ADD_QUESTION :
      const { author, id } = action.question;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      }
    case SAVE_ANSWER :
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer    
          }
        }  
      }
    default :
      return state;
  }
}