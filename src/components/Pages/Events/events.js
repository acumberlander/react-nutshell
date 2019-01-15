import React from 'react';
import './Events.scss';
import smashRequests from '../../../Helpers/Data/Requests/smashRequests';
import SingleEvent from '../SingleEvent/SingleEvent';
import authRequests from '../../../Helpers/Data/authRequests';
import Form from '../../Form/Form';
import eventRequests from '../../../Helpers/Data/Requests/eventRequests';

class Events extends React.Component {
  state = {
    events: [],
  }

  componentDidMount() {
    const currentUid = authRequests.getCurrentUid();
    smashRequests.getEventsFromMeAndFriends(currentUid)
      .then((events) => {
        this.setState({ events });
      })
      .catch((error) => {
        console.error('error on getEventsFromMeAndFriends', error);
      });
  }

  formSubmitEvent = (newEvent) => {
    eventRequests.postRequest(newEvent)
      .then(() => {
        const currentUid = authRequests.getCurrentUid();
        smashRequests.getEventsFromMeAndFriends(currentUid)
          .then((events) => {
            this.setState({ events });
          });
      })
      .catch(err => console.error('error with events post', err));
  };

  render() {
    const { events } = this.state;
    const singleEventComponents = events.map(event => (
      <SingleEvent
        event={event}
        key={event.id}
      />
    ));
    return (
      <div className="events col">
        <h2>Events Component</h2>
        <div className="eventsContainer">
          <div className="eventCards">
            {singleEventComponents}
          </div>
        </div>
        <div className="addNewEvent">
          <Form
            onSubmit={this.formSubmitEvent}
          />
        </div>
      </div>
    );
  }
}

export default Events;
