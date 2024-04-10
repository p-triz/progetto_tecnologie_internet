import "./Login.css"

const Login = ({isLogged, onClick}) => {

  return (
    <div className="loginDiv">
      <form className="loginForm">
        <label>Username: </label>
        <input type = 'text' placeholder="username..."></input>
        <label>Password: </label>
        <input type='password' placeholder="password..."></input>
        <button onClick ={onClick}> Login </button>
      </form>
    </div>
  )
}

export default Login