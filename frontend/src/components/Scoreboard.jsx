import PropTypes from 'prop-types';
import './Scoreboard.css'

const Scoreboard = ({gameName, gameId}) => {
    //va convertito da string a number
    const gameIdNumber = Number(gameId);

    //TODO -> ovviamente questa variabile va cambiata con quella vera che avremo
    //era solo per testare che funzionasse
    //il problema sarà capire come associare ad ogni elemento della lista anche un id (fondamentale in react)

    //score per il primo gioco
    const scoresG1 = [
        { player: "firstPlayer", score: 10, id: 1 },
        { player: "secondPlayer", score: 20, id: 2 },
      ];
    //score per il secondo gioco
      const scoresG2 = [
        { player: "thirdPlayer", score: 30, id: 3 },
        { player: "fourthPlayer", score: 40, id: 4 },
      ];
    
      //sceglie quale usare per fare la lista 
      const scores = gameIdNumber === 1 ? scoresG1 : scoresG2;

      //ordina la lista in base al punteggio
      scores.sort((a, b) => b.score - a.score);
      
      //crea la lista da mandare a schermo
      const listScores = scores.map((score) => (
        <li key={score.id}>
          {score.player} - Score: {score.score}
        </li>
      ));


    
      return (
        <div className="scoreboard">
          <h2 className="scoreboardTitle">Scoreboard {gameName}</h2>
          <ul className="scoreboardList">{listScores}</ul>
        </div>
      );
}

Scoreboard.propTypes = {
    gameName: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired
  };


export default Scoreboard