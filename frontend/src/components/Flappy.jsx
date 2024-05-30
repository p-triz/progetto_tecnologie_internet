// FlappyBird.js
import React, { useState, useEffect } from 'react';
import './FlappyBird.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

//the function to comunicate the score to the server
async function sendScore(playerName,score){
    const gameId = '2';
    try {
      axios.post('http://127.0.0.1:5000/api/game', { playername: playerName, score: score, gameId: gameId })
    } catch (error) {
      console.error(error);
    }
  }

const FlappyBird = () => {
    //game variables and state
    const [birdPosition, setBirdPosition] = useState({ x: 50, y: 200 });
    const [pipes, setPipes] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const username = localStorage.getItem('username');
    const [dataSent, setDataSent] = useState(false);

    const sendData = () =>{
        if (!dataSent){
            sendScore(username, score);
            setDataSent(true);
        }
    };

    const restartGame = () =>{
        //starting values
            setBirdPosition({ x: 50, y: 200 });
            setPipes([]);
            setGameOver(false);
            setGameStarted(true);
            sendData();
            setDataSent(false);
            setScore(0);
    };
    const jump = () => {
        if (!gameOver && gameStarted) {
            setBirdPosition((prev) => ({ ...prev, y: prev.y - 60 }));
        } else if (!gameOver && !gameStarted) {
            // Start the game on the first jump
            setGameStarted(true);
        }
    };
 
    const checkCollision = () => {
        //the pixels are numbered starting from top-left of the screen
        const birdTop = birdPosition.y;
        const birdBottom = birdPosition.y + 50;
        const birdLeft = birdPosition.x;
        const birdRight = birdPosition.x + 50;
 
        pipes.forEach((pipe) => {
            const pipeLeft = pipe.x;
            const pipeRight = pipe.x + 100;
            const pipeGapTop = pipe.y;
            const pipeGapBottom = pipe.y + 180;
            //this maps the section of the screen occupied by the pipe
            const isColliding = (birdRight >= pipeLeft && birdLeft <= pipeRight);
            

            if (isColliding) {
                if (birdTop > pipeGapTop && birdBottom < pipeGapBottom) {
                    // Bird has passed through the pipe, increase score
                    
                    if(birdLeft > pipeRight - 3){
                        setScore( score + 1);
                    }
                    
                } else {
                    // Bird has hit the pipe, end the game
                    console.log("Final Score:", score);
                    setGameOver(true);
                    setGameStarted(false);
                }
            }
        });
 
        // Check if bird is out of the screen vertically
        if (birdBottom > 800 || birdTop < -170) {
            setGameOver(true);
            setGameStarted(false);
        }
    };
 
    //every useEffect is run each time the component is mounted
    useEffect(() => {
        checkCollision();
    }, [birdPosition, pipes, gameOver]);
 
    //in this case an interval is set and later clear every x milliseconds
    useEffect(() => {
        const gravity = setInterval(() => {
            setBirdPosition((prev) => ({ ...prev, y: prev.y + 3 }));
            checkCollision();
        }, 10);
 
        //generates a new pipe every 2 second
        const pipeGenerator = setInterval(() => {
            if (!gameOver && gameStarted) {
                setPipes((prev) => [
                    ...prev,
                    { x: 600, y: Math.floor( 10 + (Math.random() * 400) ) },
                ]);
                
            }

        }, 2000);
 
        //similar to gravity it moves the pipes
        const pipeMove = setInterval(() => {
            if (!gameOver && gameStarted) {
                //using map i can access every element of the pipe array
                setPipes((prev) =>
                    prev.map((pipe) => ({ ...pipe, x: pipe.x - 3 }))
                );
            }
        }, 10);
 
        return () => {
            clearInterval(gravity);
            clearInterval(pipeGenerator);
            clearInterval(pipeMove);
        };
    }, [gameOver, gameStarted]);
 
    return (
        <div className={`Flappy ${gameOver ? 'game-over' : ''}`} onClick={jump}>
            <div
                className="bird"
                style={{
                    left: birdPosition.x,
                    top: birdPosition.y,
                }}
                draggable={true}
            />
            {pipes.map((pipe, index) => (
                <div key={index} className="pipeContainer" style={{left: pipe.x}} draggable={true}>
                    <div className='pipeTop' style={{left:pipe.x, top: -10, bottom: 600-pipe.y}} draggable={true}></div>
                    <div className='pipeBottom' style={{left:pipe.x, top:pipe.y+170, bottom:-10}} draggable={true}></div>
                </div>
            ))}
            {gameOver && (
                <div className='messageContainer'>
                    <div className="gameOverMessage" >
                        <h2>GAME OVER</h2>
                        <h3>your score : {score}</h3>
                        <button className='restartButton' onClick={restartGame}>Click to Restart</button>
                        <Link to="/Home" onClick={sendData}><button>Home</button></Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlappyBird;
