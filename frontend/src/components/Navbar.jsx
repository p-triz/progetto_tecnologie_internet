//import Scoreboard from "./Scoreboard";
import "./Navbar.css"
import { Link } from "react-router-dom";

const Navbar = () => {
  
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
          <Link to="/scoreboard"><button className="scoreboard-button gameButton">Scoreboard Snake</button></Link>
          <Link to="/scoreboard"><button className="scoreboard-button gameButton">Scoreboard Game2</button></Link>
          <Link to="/home"><button className="scoreboard-button gameButton">Home Page</button></Link>

        </div>
      </div>
      <div className="rightSection">
        <div className="logOutSection">
          <Link to="/"><button className="buttonLogOut" onClick={logOut}>LogOut</button></Link>
            
        </div>
      </div>
    </div>
  );
};

export default Navbar;