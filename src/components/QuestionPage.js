import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';
import { calculatePercentage } from '../utils/helpers';
import { handleSaveAnswer } from '../actions/questions';
import { formatDate } from '../utils/helpers';
import Error from './Error';

class QuestionPage extends Component {
  // local state
  state={
    answer: ''
  }

  // checks if user has already voted on this question
  hasVoted = () => {
    const { question, authedUser } = this.props;
    if (question.optionOne.votes.includes(authedUser)) {
      return 'optionOne';
    } else if (question.optionTwo.votes.includes(authedUser)) {
      return 'optionTwo';
    } else {
      return false;
    }
  }

  // checks which answer was selected and calls saveQuestionAnswer
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, id } = this.props;

    const answer = e.target.elements.question.value;

    dispatch(handleSaveAnswer(id, answer));

    this.setState(() => ({
      answer: ''
    }))
  }

  render() {
    const { question, users } = this.props;
    // if question does not exist, show 404 Error page
    if (!question) {
      return <Error />
    }
    const timeDate = formatDate(question.timestamp);
    const { optionOne, optionTwo } = question;

    const optionOneVotes = optionOne.votes.length;
    const optionTwoVotes = optionTwo.votes.length;
    const optionOnePercentage = calculatePercentage(optionOneVotes, optionOneVotes + optionTwoVotes);
    const optionTwoPercentage = calculatePercentage(optionTwoVotes, optionOneVotes + optionTwoVotes);
    
    if (this.hasVoted() !== false) {
      // Already answered. Show selection you made
      return (
        <div>
          <h3 className='center'>Would You Rather</h3>
          <div className='answered-question'>          
            <p>{optionOne.text} {this.hasVoted() === 'optionOne' ? <TiTick size='1.5em' color='green' /> : '' } {optionOneVotes} votes ({optionOnePercentage}%)</p>
            <p>or</p>
            <p>{optionTwo.text} {this.hasVoted() === 'optionTwo' ? <TiTick size='1.5em' color='green' /> : '' } {optionTwoVotes} votes ({optionTwoPercentage}%)</p>
            <p><img className='avatar' src={users[question.author].avatarURL} alt={question.author} /></p>
            <p className='author-time-date'>Created by {question.author} on {timeDate}</p>
            <br />
            <em>*You have already answered this question*</em>
            <p>Return <Link to='/' className='text-link'>Home</Link></p>
          </div>
        </div>
      )
    } else {
      // Not answered. Show form to select answer. Calls handleSubmit when done.
      return (
        <div>
          <h3 className='center'>Would You Rather</h3>

          <form className='unanswered-question' onSubmit={this.handleSubmit}>
            <label>
              {optionOne.text}
              <input type="radio" name="question" value="optionOne" required />
            </label>
            <p>or</p>
            <label>
              {optionTwo.text} 
              <input type='radio' name='question' value='optionTwo' required />
            </label>
            <br />
            <button
              className='btn'
              type='submit'
            >
              Answer
            </button>
            <p><img className='avatar' src={users[question.author].avatarURL} alt={question.author} /></p>
            <p className='author-time-date'>Created by {question.author} on {timeDate}</p>
          </form>
        </div>
      )
    }
  }
}

// QuestionPage needs authedUser, questions, users. Also accepts props with info on Question being replied to
function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  console.log("Question:", question);

  return {
    id,
    authedUser,
    question,
    users
  }

}

export default connect(mapStateToProps)(QuestionPage);