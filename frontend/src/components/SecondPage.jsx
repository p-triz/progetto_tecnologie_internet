/* eslint-disable react/prop-types */
import Card from './Card';
import './SecondPage.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const SecondPage = () => {
  const imageSrc1 = '/images/snake.png';
  const imageSrc = '/images/flappy_bird.png'
  const description = 'Move your snake and let him eat apples';
  const description2 = 'Make your bird fly avoiding obstacles';
  const gameOneName = 'Snake';
  const gameTwoName = 'Flappy Bird';
 //this component contains just the structure of the main page of the site.
  return (
    <div className="parentDiv">
      <div className="container">
       <div className='displayDiv'>
        <Navbar></Navbar>
        <div className='cardsDiv'>
          <h1 className='title'>GAMES</h1>
          <div className='items'>
            <Link to="/Snake" className='Link'><Card imageSrc={imageSrc1} gameName={gameOneName} description={description} /></Link>
            <Link to="/FlappyBird" className='Link'><Card imageSrc={imageSrc} gameName={gameTwoName} description={description2}/></Link>
          </div>
        </div>
       </div>
      </div>
    </div>    
  );
};

export default SecondPage;

