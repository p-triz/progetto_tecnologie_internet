import Login from './Login';
import SecondPage from './SecondPage';

const App = () => {
    //check if the user is logged in
    const isLogged = true;
    
  return (
    <div>
        {isLogged && <Login/>}
        {!isLogged && <SecondPage />}
    </div>
  )
}


export default App;