/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import{ useState, useEffect, useRef } from 'react';
import './SnakeGame.css';
import { Link } from 'react-router-dom';

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState('right');
  const [apple, setApple] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gridSize = 20;
  const canvasRef = useRef(null);

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

  const checkCollision = (head) => {
    if (head.x < 0 || head.y < 0 || head.x >= canvasRef.current.height / gridSize || head.y >= canvasRef.current.width / gridSize) {
      setGameOver(true);
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGameOver(true);
      }
    }
  };

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
  }, [snake, direction, gameOver, apple, score, draw, move]); // Added score and gameOver to the dependency array

  // eslint-disable-next-line no-unused-vars
  const handleGameOver = () => {
    setGameOver(true);
  };

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
      <div style={{ position: 'relative', width: '500px', height: '500px' }}>
        <canvas ref={canvasRef} id="snake-canvas"></canvas>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <h2>Score: {score}</h2>
          {gameOver && (
            <div>
              <h3>Game Over! Your Score: {score}</h3>
              <button onClick={handlePlayAgain}>Play Again</button>
              <Link to="/Home"><button>Home</button></Link>
              
            </div>
          )}
        </div>
      </div>
     
    </div>

  );
};

export default SnakeGame;
