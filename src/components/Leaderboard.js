import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa'


class Leaderboard extends Component {
  
  questionsAsked = (user) => {
    return user.questions.length;
  }

  questionsAnswered = (user) => {
    return Object.keys(user.answers).length;
  }

  totalQuestions = (user) => {
    return this.questionsAnswered(user) + this.questionsAsked(user);
  }

  sortUsersByTotalQuestions = (users) => {
    let sorted = [];
    for (let user in users) {
      sorted.push([user, 
        this.totalQuestions(users[user]), 
        this.questionsAsked(users[user]), 
        this.questionsAnswered(users[user]),
        users[user].avatarURL
      ]);
    }
    sorted.sort(
      function(a, b) {
        return b[1] - a[1];
      }
    )
    return sorted;
  }

  render() {
    const { authedUser, users } = this.props;
    const orderedUsernameArray = this.sortUsersByTotalQuestions(users);
    console.log("Ordered Usernames", orderedUsernameArray);
    return (
      <div className='center'>
        <h3>Leaderboard</h3>
        <ol className='leaderboard-list'>
          {orderedUsernameArray.map((user) => (
            <li key={user[0]} className='center'>
              <img className='avatar' src={user[4]} alt={user[0]} />
              <h2>{authedUser === user[0] ? <FaAngleDoubleRight /> : ''} {user[0]} {authedUser === user[0] ? <FaAngleDoubleLeft /> : ''}</h2>
              <p>({user[2]} Asked : {user[3]} Answered)</p>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

// Leaderboard only cares about questionsId portion of store, sorted by timestamp
function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users
  }
}

// connect Leaderboard to store via mapStateToProps which provides only questions accessible by this.props
export default connect(mapStateToProps)(Leaderboard);