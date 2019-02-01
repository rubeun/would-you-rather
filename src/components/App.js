import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Login from './Login';
import Nav from './Nav';
import Users from './Users';
import Dashboard from './Dashboard';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';



class App extends Component {

  componentDidMount() {
    // load all data from _DATA.js
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.props.authedUser !== null ? <Nav /> : null}
            <Users />
            <h1 className='center clear'>Would You Rather?</h1>
            {this.props.loading === true
                ? null
                : this.props.authedUser !== null   
                  ?  <div>
                    <Route path='/questions/:id' component={QuestionPage} />
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={Leaderboard} />
                  </div>
                  : <Login path='/login' component={Login} />  
              }
          </div>
        </Fragment>
      </Router>
    )
  }
}

// App should only show Dashboard when handleInitialData is complete.
// So set loading to check if questions & users is set. When set, all data is available 
function mapStateToProps({authedUser, questions, users}) {
  return {
    authedUser,
    loading: questions === null || users === null
  }
}

// connect upgrades App component to an App container that can get state from store & dispatch action
export default connect(mapStateToProps)(App);