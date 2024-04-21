/* eslint-disable react/prop-types */

import { Link , useNavigate} from "react-router-dom";
import "./Login.css"

const Login = ({ username, password, setUsername, setPassword}) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const currUser = event.target.username.value;
    const currPassword = event.target.password.value;
    setUsername(currUser);
    setPassword(currPassword);
    localStorage.setItem("username", currUser);
    localStorage.setItem("password", currPassword);
    navigate("/Home/");
  }

  return (
    <div className="loginDiv">
      <h2>SIGN IN TO PLAY</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type = 'text' placeholder="username..." name="username" required></input>
        <label htmlFor="password">Password: </label>
        <input type='password' placeholder="password..." name="password" required></input>
        <div className="logButton">
          <button className="button" type='submit'> LOGIN </button>
        </div>
      </form>
    </div>
  )
}

export default Login