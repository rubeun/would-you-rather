import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/shared';

class Users extends Component {
  
  render() {
    const { authedUser, users, handleLogout } = this.props;

    if (authedUser !== null) {
      return (
        <div className='current-user'>
          <p className='current-username'>{authedUser} is logged in</p>
          <p className='log-out' onClick={handleLogout}>Log Out</p>
          <img className='avatar' src={users[authedUser].avatarURL} alt={authedUser} />
        </div>
      )
    } else {
      return (
        <div className='current-user'>
          <p className='user-logged-out blink'>Not Logged In</p>
        </div>
      )
    }
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users
  }
}

// handle user clicking logout button
function mapDispatchToProps(dispatch) {
  return {
    handleLogout: () => dispatch(logoutUser())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);