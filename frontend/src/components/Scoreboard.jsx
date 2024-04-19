/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import './Scoreboard.css'
import axios from 'axios'

const Scoreboard = ({ gameId, gameName, pageId}) => {

  const [scores, setScores] = useState([]);
  //connect to backend to get the data
  const fetchData = async () => {
    const response = await axios.get(`http://127.0.0.1:5000/api/score`);
    console.log(response.data);
    setScores(response.data)
  };

  useEffect(()=>{
    fetchData()
  },[])

  // filter scores based on gameId prop
  const filteredScores = scores.filter(score => score.id === parseInt(gameId));

  // sort filtered scores in descending order based on score property
  filteredScores.sort((a, b) => b.score - a.score);

  return (
    <div className="scoreboard" pageId={pageId}>
      <Navbar />
      <div className='scoreboardContainer'>
        <h2 className="scoreboardTitle">
          Scoreboard {gameName}
        </h2>
        <ul className="scoreboardList">
          {filteredScores.length > 0 && filteredScores.map((score, index) => (
            <li key={index}>
              {score.player} - Score: {score.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Scoreboard