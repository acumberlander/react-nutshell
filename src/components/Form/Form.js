import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';
import authRequests from '../../Helpers/Data/authRequests';
import eventRequests from '../../Helpers/Data/Requests/eventRequests';

const defaultEvent = {
  uid: '',
  event: '',
  startdate: '',
  location: '',
};

class Form extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.func,
    editId: PropTypes.func,
  }

  state = {
    newEvent: defaultEvent,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempEvent = { ...this.state.newEvent };
    tempEvent[name] = e.target.value;
    this.setState({ newEvent: tempEvent });
  }

  eventChange = e => this.formFieldStringState('event', e);

  dateChange = e => this.formFieldStringState('startdate', e);

  locationChange = e => this.formFieldStringState('location', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myEvent = { ...this.state.newEvent };
    myEvent.uid = authRequests.getCurrentUid();
    onSubmit(myEvent);
    this.setState({ newEvent: defaultEvent });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      eventRequests.getSingleEvent(editId)
        .then((event) => {
          this.setState({ newEvent: event.data });
        })
        .catch(err => console.error('error when getSingleEvent', err));
    }
  }

  render() {
    const { newEvent } = this.state;
    const title = () => <h2>Add New Event:</h2>;
    return (
      <div className="eventForm col">
      {title()}
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="event">Event</label>
            <input
              type="text"
              className="form-control"
              id="event"
              placeholder="Ayden's Baseball Game"
              value={newEvent.event}
              onChange={this.eventChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              placeholder="02/23/2019"
              value={newEvent.startdate}
              onChange={this.dateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="NSS"
              value={newEvent.location}
              onChange={this.locationChange}
            />
          </div>
          <button className="btn btn-danger">
            Save Event
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
