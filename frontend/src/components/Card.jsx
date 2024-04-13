import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ imageSrc,gameName, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={imageSrc} className="card-img-top" />
      <div className="card-body">
        <div>
          <h2 className='gameTitle'>{gameName}</h2>
        </div>
        <div>
          <p className="card-text">{description}</p>
        </div>
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