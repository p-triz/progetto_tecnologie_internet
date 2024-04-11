import  { useState } from 'react';
import Card from './Card';
import Scoreboard from './Scoreboard';
import SnakeGame from './SnakeGame';
import './SecondPage.css';

const SecondPage = () => {
  const imageSrc = '../assets/react.svg';
  const description = 'First Game';
  const description2 = 'Second Game';
  const gameOneName = 'GAME1';
  const gameTwoName = 'GAME2';

  const [showSnakeGame, setShowSnakeGame] = useState(false); // State variable to control the display of SnakeGame

  const handleCardClick = () => {
    if (!showSnakeGame) {
      setShowSnakeGame(true); // Set showSnakeGame to true when the first Card is clicked
    }
  };

  return (
    <div className="container">
      {showSnakeGame? (
        <SnakeGame />
      ) : (
        <>
          <Scoreboard gameName={gameOneName} gameId="1"></Scoreboard>
          <Card imageSrc={imageSrc} description={description} onClick={handleCardClick} />
          <Card imageSrc={imageSrc} description={description2} />
          <Scoreboard gameName={gameTwoName} gameId="2"></Scoreboard>
        </>
      )}
    </div>
  );
};

export default SecondPage;