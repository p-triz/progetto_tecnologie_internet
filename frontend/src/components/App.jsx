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
  //definition of the possible routes of the application
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='/Signin' element={<Login/>} ></Route>
        <Route path="/Home" element={<SecondPage/>}></Route>
        <Route path="/Snake" element={<SnakeGame/>}></Route>
        <Route path="/FlappyBird" element={<FlappyBird/>}></Route>
        <Route path="/scoreboard/:variable" element={<Scoreboard/>}></Route>
        <Route path='/*/*' element={<Error></Error>}></Route>
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App;