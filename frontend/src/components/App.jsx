//import { useState } from 'react';
import Login from './Login';
import SecondPage from './SecondPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SnakeGame from './SnakeGame';
import Scoreboard from './Scoreboard';
import FlappyBird from './Flappy';
import Error from './Error';
import { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('default');
  const [password, setPassword] = useState('default');

 
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} />}></Route>
        <Route path='/Signin' element={<Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} />} ></Route>
        <Route path="/Home" element={<SecondPage username={username} setUsername={setUsername}/>}></Route>
        <Route path="/Snake" element={<SnakeGame/>}></Route>
        <Route path="/FlappyBird" element={<FlappyBird/>}></Route>
        <Route path="/scoreboard/:variable" element={<Scoreboard username={username} setUsername={setUsername}/>}></Route>
        <Route path='/*/*' element={<Error></Error>}></Route>
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App;