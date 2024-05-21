/* eslint-disable react/prop-types */
import Card from './Card';
import './SecondPage.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const SecondPage = ({username, setUsername}) => {
  const imageSrc1 = '/images/snake.png';
  const imageSrc = '/images/flappy_bird.png'
  const description = 'Move your snake and let him eat apples';
  const description2 = 'Second Game';
  const gameOneName = 'Snake';
  const gameTwoName = 'GAME2';

  return (
    <div className="parentDiv">
      <div className="container">
       <div className='displayDiv'>
        <Navbar username={username} setUsername={setUsername}></Navbar>
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

