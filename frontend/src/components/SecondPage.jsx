import Card from './Card';
import Scoreboard from './Scoreboard';
import './SecondPage.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const SecondPage = () => {
  const imageSrc1 = '/images/snake.png';
  const imageSrc = ''
  const description = 'Move your snake and let him eat apples';
  const description2 = 'Second Game';
  const gameOneName = 'Snake';
  const gameTwoName = 'GAME2';

  return (
    <div className="parentDiv">
      <div className="container">
          <div className='displayDiv'>
            <Navbar></Navbar>
            <div className='itemsDiv'>
            <Link to="/Snake"><Card imageSrc={imageSrc1} gameName={gameOneName} description={description}  /></Link> 
              <Scoreboard gameName={gameOneName} gameId="1"></Scoreboard>
            </div>
            <div className='itemsDiv'>
              <Card imageSrc={imageSrc} gameName={gameTwoName} description={description2} />
              <Scoreboard gameName={gameTwoName} gameId="2"></Scoreboard>
            </div>
          </div>
      </div>
    </div>
  );
};

export default SecondPage;

