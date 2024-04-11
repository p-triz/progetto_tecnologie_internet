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
    <div className="parentDiv">
    <div className="container">
      <Card imageSrc={imageSrc} description={description}  />
      <Scoreboard gameName={gameOneName} gameId="1"></Scoreboard>
    </div>
    <div className="container">
      <Card imageSrc={imageSrc} description={description2} />
      <Scoreboard gameName={gameTwoName} gameId="2"></Scoreboard>
    </div>
    </div>
  );
};

export default App;