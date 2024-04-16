//import { useState } from 'react';
import Login from './Login';
import SecondPage from './SecondPage';
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import SnakeGame from './SnakeGame';
import Scoreboard from './Scoreboard';
import Error from './Error';


const App = () => {
 
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Home/" element={<SecondPage/>}></Route>
        <Route path="/Snake" element={<SnakeGame/>}></Route>
        <Route path="/scoreboard1" element={<Scoreboard gameId="1"/>}></Route>
        <Route path="/scoreboard2" element={<Scoreboard gameId="2"/>}></Route>
        <Route path='/*' element={<Error></Error>}></Route>
      </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App;