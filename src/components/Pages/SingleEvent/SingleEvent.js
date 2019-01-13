import React from 'react';
import eventShape from '../../../Helpers/Data/props/eventShape';
import './SingleEvent.scss';

class SingleEvent extends React.Component {
  static propTypes = {
    event: eventShape.eventShape,
  }

  render() {
    const { event } = this.props;
    console.log(event);
    return (
      <div className="eventContainer card">
        <div className="singleEvent text-center mx-auto">
          <h3>{event.event}</h3>
          <h5>{event.startDate}</h5>
          <h5>{event.location}</h5>
        </div>
      </div>
    );
  }
}

export default SingleEvent;
