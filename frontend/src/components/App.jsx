import Login from './Login';
import SecondPage from './SecondPage';
import { useState } from 'react';


const App = () => {
    //check if the user is logged in
    const [isLogged, setLog] = useState(false);

    function eventHandler() {
      setLog(true);
    }
  return (
    <div>
        {!isLogged && <Login isLogged = {isLogged} onSubmit={eventHandler} />}
        {isLogged && <SecondPage />}
    </div>
  )
}


export default App;