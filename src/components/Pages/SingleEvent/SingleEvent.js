import React from 'react';
import PropTypes from 'prop-types';
import eventShape from '../../../Helpers/Data/props/eventShape';
import './SingleEvent.scss';
import authRequests from '../../../Helpers/Data/authRequests';

class SingleEvent extends React.Component {
  static propTypes = {
    event: eventShape.eventShape,
    passEventToEdit: PropTypes.func,
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passEventToEdit, event } = this.props;
    passEventToEdit(event.id);
  }

  render() {
    const { event } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (event.uid === uid) {
        return (
        <div>
          <span className="col">
            <button className="btn btn-default" onClick={this.editEvent}>
              <i className="fas fa-pencil-alt"></i>
            </button>
          </span>
        </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <div className="eventContainer card">
        <div className="singleEvent text-center mx-auto">
          <h3>{event.event}</h3>
          <h5>{event.startDate}</h5>
          <h5>{event.location}</h5>
          {makeButtons()}
        </div>
      </div>
    );
  }
}

export default SingleEvent;
