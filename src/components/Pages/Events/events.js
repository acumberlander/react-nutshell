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
    isEditing: false,
    editId: '-1',
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
    const { isEditing, editId } = this.state;
    if (isEditing) {
      eventRequests.updateEvent(editId, newEvent)
        .then(() => {
          const currentUid = authRequests.getCurrentUid();
          smashRequests.getEventsFromMeAndFriends(currentUid)
            .then((events) => {
              this.setState({ events, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with listings post', err));
    } else {
      eventRequests.postRequest(newEvent)
        .then(() => {
          const currentUid = authRequests.getCurrentUid();
          smashRequests.getEventsFromMeAndFriends(currentUid)
            .then((events) => {
              this.setState({ events });
            });
        })
        .catch(err => console.error('error with events post', err));
    }
  };

  passEventToEdit = eventId => this.setState({ isEditing: true, editId: eventId });

  deleteSingleEvent = (eventId) => {
    eventRequests.deleteEvent(eventId)
      .then(() => {
        const currentUid = authRequests.getCurrentUid();
        smashRequests.getEventsFromMeAndFriends(currentUid)
          .then((events) => {
            this.setState({ events });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  render() {
    const passEventToEdit = (eventId) => {
      this.setState({ isEditing: true, editId: eventId });
    };

    const {
      events,
      isEditing,
      editId,
    } = this.state;
    const singleEventComponents = events.map(event => (
      <SingleEvent
        event={event}
        key={event.id}
        passEventToEdit={passEventToEdit}
        deleteSingleEvent={this.deleteSingleEvent}
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
            isEditing={isEditing}
            editId={editId}
          />
        </div>
      </div>
    );
  }
}

export default Events;
