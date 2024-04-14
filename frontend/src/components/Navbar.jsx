import Scoreboard from "./Scoreboard";
import "./Navbar.css"

const Navbar = () => {
    const gameOneName = "Snake"
    const gameTwoName = "Other game name"

    function handleGame(id){
        //TODO APRIRE LA CLASSIFICA DEL GIOCO richiesto
        const gameName = id == 1 ? gameOneName : gameTwoName 
        return <Scoreboard gameName={gameName} gameId={id}></Scoreboard>
    }

    function logOut(){
        //TODO GESTIRE IL LOGOUT
        alert("logOut")
    }

  return (
    <div className="navbar">
      <div className="left-section">
        <div className="SectionPlayerName">
            <p className="playerName">Player 1</p>
        </div>
        <div className="scoreboard-buttons">
            <button className="scoreboard-button gameButton" onClick={handleGame(1)}>Scoreboard Snake</button>
            <button className="scoreboard-button gameButton" onClick={handleGame(2)}>Scoreboard Second</button>
        </div>
      </div>
      <div className="rightSection">
        <div className="logOutSection">
            <button className="buttonLogOut" onClick={logOut}>LogOut</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;