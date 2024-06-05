/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./Navbar.css"
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {

  const location = useLocation();
    //delete the variables saved in local storage by the login function
    function logOut(){
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }


  return (
    <div className="navbar">
      <div className="left-section">
        <div className="sectionPlayerName">
            <p className="playerName">{localStorage.getItem("username")}</p>
        </div>
        <div className="scoreboard-buttons">
          <Link to="/scoreboard/1"><button className="scoreboard-button gameButton">Scoreboard Snake</button></Link>
          <Link to="/scoreboard/2"><button className="scoreboard-button gameButton">Scoreboard Flappy Bird</button></Link>
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