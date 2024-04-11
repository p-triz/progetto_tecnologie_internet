import { useState } from 'react';
import Card from './Card';
import Scoreboard from './Scoreboard';
import SnakeGame from './SnakeGame';
import './SecondPage.css';

const SecondPage = () => {
  const imageSrc1 = '/images/snake.png';
  const imageSrc = ''
  const description = 'Move your snake and let him eat apples';
  const description2 = 'Second Game';
  const gameOneName = 'Snake';
  const gameTwoName = 'GAME2';

  const [showSnakeGame, setShowSnakeGame] = useState(false); // State variable to control the display of SnakeGame

  const handleCardClick = () => {
    if (!showSnakeGame) {
      setShowSnakeGame(true); // Set showSnakeGame to true when the first Card is clicked
    }
  };

  return (
    <div className="parentDiv">
      <div className="container">
        {showSnakeGame? (
          <SnakeGame setShowSnakeGame={setShowSnakeGame} />
        ) : (
          <div className='displayDiv'>
            <div className='itemsDiv'>
              <Card imageSrc={imageSrc1} description={description} onClick={handleCardClick} />
              <Scoreboard gameName={gameOneName} gameId="1"></Scoreboard>
            </div>
            <div className='itemsDiv'>
              <Card imageSrc={imageSrc} description={description2} />
              <Scoreboard gameName={gameTwoName} gameId="2"></Scoreboard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondPage;