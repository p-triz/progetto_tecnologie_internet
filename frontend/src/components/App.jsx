//import { useState } from 'react';
import Login from './Login';
import SecondPage from './SecondPage';
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import SnakeGame from './SnakeGame';
import Scoreboard from './Scoreboard';

const App = () => {
 
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Home/" element={<SecondPage/>}></Route>
        <Route path="/Snake" element={<SnakeGame/>}></Route>
        <Route path="/scoreboard" element={<Scoreboard/>}></Route>
      </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App;