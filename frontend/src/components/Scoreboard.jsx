/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import "./Scoreboard.css";
import axios from 'axios';

const Scoreboard = ({gameNames}) => {
  const [scores, setScores] = useState([]);
  const usernamePlayer = localStorage.getItem('username');
  const location = useLocation();
  const [gameName, setGameName] = useState('');

  //this is to load the correct scoreboard in each page
  useEffect(() => {
    if (location.pathname.endsWith("/1")) {
      setGameName(gameNames[0]);
    } else {
      setGameName(gameNames[1]);
    }
  }, [location.pathname, gameNames]);
  
  //this gets the data from the database when the component is mounted
  useEffect(() => {
    async function fetchData() {
        let response;
        if (location.pathname.endsWith("/1")) {
            response = await axios.get(`http://127.0.0.1:5000/api/score/1`);
        } else {
            response = await axios.get(`http://127.0.0.1:5000/api/score/2`);
        }
        setScores(response.data);
    }
    fetchData();
  }, [location.pathname]);

  const sortedScores = [...scores].sort((a, b) => b.score - a.score)

  return (
    <div className="scoreboard">
      <Navbar gameNames={gameNames}></Navbar>
      <div className="scoreboardContainer">
        <h2 className="scoreboardTitle">Scoreboard {gameName}</h2>
        <ul className="scoreboardList">
          {sortedScores.length > 0 &&
            sortedScores.map((score, index) => (
              <li key={index} className={score.player === usernamePlayer ? 'highlighted' : ''}>
                {score.player} - Score: {score.score}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Scoreboard;