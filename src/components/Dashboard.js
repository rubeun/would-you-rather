import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Question from './Question';
import "react-tabs/style/react-tabs.css";

class Dashboard extends Component {

  // checks if authedUser has answered question with id
  hasAnsweredQuestion = (id) => {
    const { authedUser, questions } = this.props;
    if (questions[id].optionOne.votes.includes(authedUser) ||
    questions[id].optionTwo.votes.includes(authedUser)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { questionsId } = this.props;
    return (
      <div>
        <h3 className='center'>Your Would You Rather Questions</h3>

        <Tabs>
          <TabList>
            <Tab>Unanswered Questions</Tab>
            <Tab>Answered Questions</Tab>
          </TabList>

          <TabPanel>
            <ul className='dashboard-list'>
              {questionsId.map((id) => (
                !this.hasAnsweredQuestion(id) &&
                  (<li key={id} className='unanswered-question'>
                    <Question id={id} />
                  </li>)            
                  )  
              )}
            </ul>
          </TabPanel>
          <TabPanel>
            <ul className='dashboard-list'>
              {questionsId.map((id) => (
                this.hasAnsweredQuestion(id) &&
                (<li key={id} className='answered-question'>
                    <Question id={id} />
                  </li>)            
                  )  
              )}
            </ul>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

// Dashboard only cares about questionsId portion of store, sorted by timestamp
function mapStateToProps({authedUser, questions}) {
  return {
    authedUser,
    questions,
    questionsId: Object.keys(questions)
      .sort( (a,b) => questions[b].timestamp - questions[a].timestamp )
  }
}

// connect Dashboard to store via mapStateToProps which provides only questionsId accessible by this.props
export default connect(mapStateToProps)(Dashboard);