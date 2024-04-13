/* eslint-disable react/prop-types */

import "./Login.css"

const Login = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className="loginDiv">
      <h2>SIGN IN TO PLAY</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
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