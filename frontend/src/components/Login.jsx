/* eslint-disable react/prop-types */
import "./Login.css"

const Login = ({isLogged, onSubmit}) => {

  return (
    <div className="loginDiv">
      <h2>SIGN IN TO PLAY</h2>
      <form className="loginForm" onSubmit={onSubmit}>
        <label htmlFor="username">Username: </label>
        <input type = 'text' placeholder="username..." required></input>
        <label htmlFor="password">Password: </label>
        <input type='password' placeholder="password..." required></input>
        <button type='submit'> LOGIN </button>
      </form>
    </div>
  )
}

export default Login