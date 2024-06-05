/* eslint-disable react/prop-types */
import Card from './Card';
import './SecondPage.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const SecondPage = ({gameNames, descriptions}) => {
  const imageSrc1 = '/images/snake.png';
  const imageSrc = '/images/flappy_bird.png'
 //this component contains just the structure of the main page of the site.
  return (
    <div className="parentDiv">
      <div className="container">
       <div className='displayDiv'>
        <Navbar gameNames={gameNames}></Navbar>
        <div className='cardsDiv'>
          <h1 className='title'>GAMES</h1>
          <div className='items'>
            <Link to="/Snake" className='Link'><Card imageSrc={imageSrc1} gameName={gameNames[0]} description={descriptions[0]} /></Link>
            <Link to="/FlappyBird" className='Link'><Card imageSrc={imageSrc} gameName={gameNames[1]} description={descriptions[1]}/></Link>
          </div>
        </div>
       </div>
      </div>
    </div>    
  );
};

export default SecondPage;

