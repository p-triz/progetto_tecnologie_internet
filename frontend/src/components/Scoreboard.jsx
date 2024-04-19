/* eslint-disable react/prop-types */
import React from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Scoreboard = ({ gameId, gameName }) => {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://127.0.0.1:5000/api/score`);
      setScores(response.data);
    }
    fetchData();
  }, []);

  const filteredScores = scores.filter((score) => score.id.toString() === gameId);
  const sortedScores = filteredScores.sort((a, b) => b.score - a.score);

  return (
    <div className="scoreboard">
      <Navbar />
      <div className="scoreboardContainer">
        <h2 className="scoreboardTitle">Scoreboard {gameName}</h2>
        <ul className="scoreboardList">
          {sortedScores.length > 0 &&
            sortedScores.map((score, index) => (
              <li key={index}>
                {score.player} - Score: {score.score}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Scoreboard;