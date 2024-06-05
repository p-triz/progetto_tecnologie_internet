/* eslint-disable react/prop-types */
import './Card.css';

const Card = ({ imageSrc,gameName, description }) => {
  return (
    <div className="card">
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


export default Card;