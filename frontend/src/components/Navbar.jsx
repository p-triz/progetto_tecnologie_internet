/* eslint-disable react/prop-types */
import "./Navbar.css"
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ gameNames }) => {
  const location = useLocation();

  // Check if gameNames is not undefined and has a length greater than 0
  if (!gameNames || gameNames.length === 0) {
    return null;
  }

  // Delete the variables saved in local storage by the login function
  function logOut() {
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
          <Link to="/scoreboard/1">
            <button className="scoreboard-button gameButton">
              Scoreboard {gameNames[0]}
            </button>
          </Link>
          <Link to="/scoreboard/2">
            <button className="scoreboard-button gameButton">
              Scoreboard {gameNames[1]}
            </button>
          </Link>
          {location.pathname.startsWith("/scoreboard") && (
            <Link to="/home">
              <button className="scoreboard-button gameButton">
                Home Page
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="rightSection">
        <div className="logOutSection">
          <Link to="/">
            <button className="buttonLogOut" onClick={logOut}>
              LogOut
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;