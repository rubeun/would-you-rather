import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_ANSWER } from '../actions/questions';

// ### QUESTIONS REDUCERS ###
// perform action on state and return a new updated state or orginal state if no action
export default function questions(state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state, // include original state
        ...action.questions // add questions to state
      }
    case ADD_QUESTION :
      //const { question } = action;
      return {
        ...state,
        [action.question.id]: action.question // adding new question to state
      }
    case SAVE_ANSWER :
      const { authedUser, qid, answer } = action;
      return {
        ...state,
          [qid]: {
            ...state[qid],
            [answer] : {
              ...state[qid][answer],
              votes: state[qid][answer].votes.concat(authedUser)                  
            }
          }  
      }
    default :
      return state;
  }
}