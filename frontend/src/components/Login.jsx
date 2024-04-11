import "./Login.css"

const Login = ({isLogged, onClick}) => {

  return (
    <div className="loginDiv">
      <h2>SIGN IN TO PLAY</h2>
      <form className="loginForm">
        <label>Username: </label>
        <input type = 'text' placeholder="username..." required></input>
        <label>Password: </label>
        <input type='password' placeholder="password..." required></input>
        <button type='submit' onClick ={onClick}> LOGIN </button>
      </form>
    </div>
  )
}

export default Login