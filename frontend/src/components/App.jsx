import Login from './Login';
import SecondPage from './SecondPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SnakeGame from './SnakeGame';
import Scoreboard from './Scoreboard';
import FlappyBird from './Flappy';
import Error from './Error';
import axios from 'axios';

const App = () => {
  const [gamesName, setGamesName] = useState([]);
  const [gamesDesc, setGamesDesc] = useState([]);

//this method is executed as soon as the component is mounted 
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/info');
        const gamesData = response.data;
        const gamesName = [];
        const gamesDesc = [];
        //add the values into the arrays
        for (const game of gamesData) {
          gamesName.push(game.game_name);
          gamesDesc.push(game.game_description);
        }
        //update names and descriptions values
        setGamesName(gamesName);
        setGamesDesc(gamesDesc);
      } catch (error) {
        console.error(error);
      }
    }

    fetchGames();
  }, []);


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signin" element={<Login />} />
          <Route path="/Home" element={
            <SecondPage
              gameNames={gamesName}
              descriptions={gamesDesc}
            />
          } />
          <Route path="/Snake" element={<SnakeGame />} />
          <Route path="/FlappyBird" element={<FlappyBird />} />
          <Route path="/scoreboard/:variable" element={
            <Scoreboard gameNames={gamesName}/>
          } />
          <Route path="/*/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;