import { useState } from 'react';
import Login from './Login';
import SecondPage from './SecondPage';

const App = () => {
  //check if the user is logged in
  const [isLogged, setLog] = useState(false);

  function eventHandler() {
    setLog(true);
  }

  return (
    <div>
      {!isLogged && <Login onSubmit={eventHandler} />}
      {isLogged && <SecondPage></SecondPage>}
    </div>
  )
}

export default App;