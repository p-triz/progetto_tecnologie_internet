import Login from './Login';
import SecondPage from './SecondPage';
import { useState } from 'react';


const App = () => {
    //check if the user is logged in
    const [isLogged, setCount] = useState(false);

    function eventHandler() {
      setCount(true);
    }
  return (
    <div>
        {!isLogged && <Login isLogged = {isLogged} onClick={eventHandler} />}
        {isLogged && <SecondPage />}
    </div>
  )
}


export default App;