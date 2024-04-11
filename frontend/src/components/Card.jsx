import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ imageSrc, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
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
  onClick: PropTypes.func.isRequired,
};

export default Card;