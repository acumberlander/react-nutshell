import PropTypes from 'prop-types';

const eventShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
});


export default eventShape;
