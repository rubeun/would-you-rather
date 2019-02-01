import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_ANSWER = 'SAVE_ANSWER';

// ### ACTION CREATORS ###
//
function addQuestion(question) {
  console.log("addQuestion:", question);
  return {
    type: ADD_QUESTION,
    question
  }
}

function saveAnswer(idAnswer) {
  return {
    type: SAVE_ANSWER,
    authedUser: idAnswer.authedUser,
    qid: idAnswer.qid,
    answer: idAnswer.answer
  }
}

// Async API call to addQuestion using thunk middleware
export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

// Async API call to saveAnswer using thunk middleware
export function handleSaveAnswer(questionID, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestionAnswer({
      authedUser,
      qid: questionID,
      answer
    })
      .then((idAnswer) => dispatch(saveAnswer(idAnswer)))
      .then(() => dispatch(hideLoading()))
  }
}

// Async API call to receiveQuestions
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

