/* eslint-disable react/prop-types */
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


export default Card;