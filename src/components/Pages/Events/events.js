import React from 'react';
import './Events.scss';
import smashRequests from '../../../Helpers/Data/Requests/smashRequests';
import SingleEvent from '../SingleEvent/SingleEvent';
import authRequests from '../../../Helpers/Data/authRequests';

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
          <div>{singleEventComponents}</div>
        </div>
      </div>
    );
  }
}

export default Events;
