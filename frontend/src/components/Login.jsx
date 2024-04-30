/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link , useNavigate} from "react-router-dom";
import "./Login.css"
import axios from 'axios';


const Login = ({ username, password, setUsername, setPassword}) => {
  const navigate = useNavigate();

  async function sendDataLogin(userName, userPassword){
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', { username: userName, password: userPassword });
      response.data.message ==="Incorrect" &&  navigate("/")
    } catch (error) {
      console.error(error);
    }
  }
  
  async function sendDataSignin(userName, userPassword){
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/signin', { username: userName, password: userPassword });
      response.data.message ==="Done" ?  navigate("/Home") : alert("error")
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = (event) => {
    event.preventDefault(); 
    const currUser = event.target.username.value;
    const currPassword = event.target.password.value;
    setUsername(currUser);
    setPassword(currPassword);
    location.pathname.endsWith("/") ? sendDataLogin(currUser, currPassword) : sendDataSignin(currUser, currPassword)
    localStorage.setItem("username", currUser);
    localStorage.setItem("password", currPassword);
    navigate("/Home");
  }

  const welcomeMessage = location.pathname.endsWith("/") ? "LOGIN TO PLAY" : "SIGN IN TO PLAY"
  const buttonText = location.pathname.endsWith("/") ? "LOGIN" : "SIGN IN"

  return (
    <div className="loginDiv">
      <h2 >{welcomeMessage}</h2>
      <form className="loginForm" onSubmit={ handleLogin }>
        <label htmlFor="username">Username: </label>
        <input type = 'text' placeholder="username..." name="username" required></input>
        <label htmlFor="password">Password: </label>
        <input type='password' placeholder="password..." name="password" required></input>
        <div className="logButton">
          <button className="button" type='submit'> {buttonText} </button>
        </div>
      </form>
      <div className="SignInLink" >
        {location.pathname.endsWith("/") &&  <Link to="/Signin">Sign in</Link> }
      </div>
    </div>
  )
}

export default Login