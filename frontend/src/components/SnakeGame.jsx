/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SnakeGame.css';
import { Link } from 'react-router-dom';

async function sendScore(playerName,score){
  const gameId = '1';
  try {
    axios.post('http://127.0.0.1:5000/api/game', { playername: playerName, score: score, gameId: gameId })
  } catch (error) {
    console.error(error);
  }
}

const SnakeGame = () => {
  //game variables and state
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState('right');
  const [apple, setApple] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const username = localStorage.getItem('username');

  const gridSize = 20;
  const canvasRef = useRef(null);

  //this function draws the canvas and fills the right cells where the snake is located and those where the apples are.
  const draw = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'white';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'green';
    snake.forEach((segment) => {
      context.fillRect(segment.y * gridSize, segment.x * gridSize, gridSize, gridSize);
      context.strokeRect(segment.y * gridSize, segment.x * gridSize, gridSize, gridSize);
    });

    context.fillStyle = 'red';
    context.fillRect(apple.y * gridSize, apple.x * gridSize, gridSize, gridSize);
    context.strokeRect(apple.y * gridSize, apple.x * gridSize, gridSize, gridSize);
  };

  //moving the snake each frame and grow it when it eats apples
  const move = () => {
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
      case 'up':
        head.x -= 1;
        break;
      case 'down':
        head.x += 1;
        break;
      case 'left':
        head.y -= 1;
        break;
      case 'right':
        head.y += 1;
        break;
      default:
        break;
    }

    const newSnake = [head, ...snake];
    setSnake(newSnake);

    if (head.x === apple.x && head.y === apple.y) {
      let newApple = { x: Math.floor(Math.random() * (canvasRef.current.height / gridSize)), y: Math.floor(Math.random() * (canvasRef.current.width / gridSize)) };
      while (newSnake.some(segment => segment.x === newApple.x && segment.y === newApple.y)) {
        newApple = { x: Math.floor(Math.random() * (canvasRef.current.height / gridSize)), y: Math.floor(Math.random() * (canvasRef.current.width / gridSize)) };
      }
      setApple(newApple);
      setScore(score + 1);
    } else {
      newSnake.pop();
      setSnake(newSnake);
    }

    checkCollision(head);
  };

  //self explanatory, it checks for collisions with the borders of the canvas or with the snake itself
  const checkCollision = (head) => {
    if (head.x < 0 || head.y < 0 || head.x >= canvasRef.current.height / gridSize || head.y >= canvasRef.current.width / gridSize) {
      setGameOver(true);
      sendScore(username,score)
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGameOver(true);
      }
    }
  };

  //listening for the player input
  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 38:
        setDirection('up');
        break;
      case 40:
        setDirection('down');
       break;
      case 37:
        setDirection('left');
        break;
      case 39:
        setDirection('right');
        break;
      default:
        break;
    }
  };

  //the game setup, it is run each time the component is mounted
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasWidth = 400;
    const canvasHeight = 400;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  //this interval sets the "framerate" the game is run at
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        move();
      }
      draw();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [snake, direction, gameOver, apple, score, draw, move, axios]);

  

  //restart the game
  const handlePlayAgain = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('right');
    setApple({ x: 5, y: 5 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <div>   
      <h1 className='titleSnake'>Snake Game</h1>
      <div className='gameContainer'>
        <div style={{ position: 'relative', width: '500px', height: '500px' }}>
          <canvas ref={canvasRef} id="snake-canvas"></canvas>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <h2>Score: {score}</h2>
            {gameOver && (
              <div className='menu'>
                <h3 className='score'>Game Over! Your Score: {score}</h3>
                <div className='buttons'>
                  <button onClick={handlePlayAgain}>Play Again</button>
                  <Link to="/Home"><button>Home</button></Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;