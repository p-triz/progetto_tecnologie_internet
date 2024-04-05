import Card from "./Card";
import './SecondPage.css'

const App = () => {
  const imageSrc = '../assets/react.svg';
  const description = 'First Game';
  const description2 = 'Second Game'

  return (
    <div className="container">
      <Card imageSrc={imageSrc} description={description}  />
      <Card imageSrc={imageSrc} description={description2} />
    </div>
  );
};

export default App;