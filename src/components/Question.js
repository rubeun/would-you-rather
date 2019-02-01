import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';
import { formatDate } from '../utils/helpers';

class Question extends Component {

  render() {
    const { authedUser, question } = this.props;
    
    if (question === null) {
      return <p>This Question doesn't exist</p>
    }
    const {
      optionOne, optionTwo, id, timestamp, author
    } = question;

    const timeDate = formatDate(timestamp); 

    return (
      <Link to={`/questions/${id}`} className='question'>
        <div className='question-info'>
          <div>
            <p>{optionOne.text} {optionOne.votes.includes(authedUser) && <TiTick size='1.5em' color='green' />}</p>
            <p>or</p>
            <p>{optionTwo.text} {optionTwo.votes.includes(authedUser) && <TiTick size='1.5em' color='green' />}</p>
            <p className='author-time-date'>Created by {author} on {timeDate}</p>
          </div>
        </div>
      </Link>
    )
  }
}

// Question needs authedUser, users, questions from store. Question is also passed in id as prop (of Question to be displayed)
function mapStateToProps({authedUser, questions}, { id }) {
  const question = questions[id];

  return {
    authedUser,
    question: question 
      ? question
      : null
  }
}

// withRouter passes connected component all router props
export default withRouter(connect(mapStateToProps)(Question));