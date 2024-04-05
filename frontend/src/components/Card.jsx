import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ imageSrc, description }) => {
  return (
    <div className="card">
      <img src={imageSrc} className="card-img-top" />
      <div className="card-body">
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;