import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/shared';

class Login extends Component {

  handleUser = (username) => {
    const selectedUser = username;

    this.props.dispatch(loginUser(selectedUser));
    
  }

  render() {
    const { usernames, users } = this.props;

    return (
      <div className='login-user'>
        <h3 className='center'>Choose User</h3>
        <ul className='user-list'>
          {usernames.map((username) => 
            (
              <li key={username} onClick={() => this.handleUser(username)}>
                <div className='user-avatar'>
                  <img className='avatar' src={users[username].avatarURL} alt={username} />
                </div>
                <div className='user-details'>
                  <p>{username}</p>
                </div>         
              </li>
            )
          )}

        </ul>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users,
    usernames: Object.keys(users)
  }
}

export default connect(mapStateToProps)(Login);