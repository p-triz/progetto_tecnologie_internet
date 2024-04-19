/* eslint-disable react/prop-types */
import "./Navbar.css"
import { Link, useLocation } from "react-router-dom";

const Navbar = ({username}) => {

  const location = useLocation();
  
    function logOut(){
        //TODO GESTIRE IL LOGOUT
        alert("logOut");
    }

  return (
    <div className="navbar">
      <div className="left-section">
        <div className="sectionPlayerName">
            <p className="playerName">{username}</p>
        </div>
        <div className="scoreboard-buttons">
          <Link to="/scoreboard1"><button className="scoreboard-button gameButton">Scoreboard Snake</button></Link>
          <Link to="/scoreboard2"><button className="scoreboard-button gameButton">Scoreboard Game2</button></Link>
          {location.pathname.startsWith("/scoreboard") && <Link to="/home"><button className="scoreboard-button gameButton">Home Page</button></Link>}

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