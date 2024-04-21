/* eslint-disable react/prop-types */
import "./Navbar.css"
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Navbar = ({username, setUsername}) => {

  const location = useLocation();
  
    function logOut(){
        //TODO GESTIRE IL LOGOUT
        alert("logOut");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }

    useEffect(() => {
      // Retrieve username from localStorage when component mounts
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