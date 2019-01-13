import PropTypes from 'prop-types';

const eventShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
  startdate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
});


export default eventShape;
