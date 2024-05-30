/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./Navbar.css"
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Navbar = ({username, setUsername}) => {

  const location = useLocation();
    //delete the variables saved in local storage by the login function
    function logOut(){
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }

    // Retrieve username from localStorage when component mounts
    useEffect(() => {
      const savedUsername = localStorage.getItem('username');
      if (savedUsername != "default") {
        setUsername(savedUsername);
      }
    }, [username]);

  return (
    <div className="navbar">
      <div className="left-section">
        <div className="sectionPlayerName">
            <p className="playerName">{username}</p>
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