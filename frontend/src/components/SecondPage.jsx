import Card from "./Card";
import Scoreboard from "./Scoreboard";
import './SecondPage.css'

const App = () => {
  const imageSrc = '../assets/react.svg'
  const description = 'First Game'
  const description2 = 'Second Game'
  const gameOneName = 'GAME1'
  const gameTwoName = "GAME2"


  return (
    <div className="container">
      <Scoreboard gameName={gameOneName} gameId="1"></Scoreboard>
      <Card imageSrc={imageSrc} description={description}  />
      <Card imageSrc={imageSrc} description={description2} />
      <Scoreboard gameName={gameTwoName} gameId="2"></Scoreboard>
    </div>
  );
};

export default App;