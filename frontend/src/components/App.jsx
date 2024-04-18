//import { useState } from 'react';
import Login from './Login';
import SecondPage from './SecondPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SnakeGame from './SnakeGame';
import Scoreboard from './Scoreboard';
import Error from './Error';
import { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState(' ');
  const [password, setPassword] = useState(' ');
  const gameName1 = "Snake"
  const gameId1 = "1"
  const gameName2 = "Game2"
  const gameId2 = "2"
 
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} />}></Route>
        <Route path="/Home/" element={<SecondPage username={username}/>}></Route>
        <Route path="/Snake" element={<SnakeGame/>}></Route>
        <Route path="/scoreboard1" element={<div className='scoreboardPage'><Scoreboard gameName={gameName1} gameId={gameId1} username={username} /></div>}></Route>
        <Route path="/scoreboard2" element={<div className='scoreboardPage'><Scoreboard gameName={gameName2} gameId={gameId2} username={username} /></div>}></Route>
        <Route path='/*' element={<Error></Error>}></Route>
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App;