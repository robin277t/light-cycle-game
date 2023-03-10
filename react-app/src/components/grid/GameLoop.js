import React, { useEffect, useState } from "react";
import GridMaker from "./GridMaker.js";
import GridMakerVerGame from "./GridMakerVerGame.js";
import GameOver from "../menus/GameOver.js";
// import computerPlayer from "./ComputerPlayer";
import "./GameLoop.css";

const GameLoop = ({ gridSide, trailLength, gameSpeed, player1, player2 }) => {
  //player1 and player2 have values 'your_name' if a human player,  and 'computer' if either player is to be a bot

  const generateWall = (gridSide) => {
    let wallArray = [];
    for (let i = 0; i <= gridSide ** 2; i++) {
      if (
        i < gridSide ||
        (i + 1) % gridSide === 0 ||
        i % gridSide === 0 ||
        i > gridSide ** 2 - gridSide
      ) {
        wallArray.push(i);
      }
    }
    return wallArray;
  };

  const generateRandomStartPosition = () => {
    let randNum = Math.ceil(Math.random() * gridSide) * gridSide;
    if (randNum < gridSide || randNum > gridSide ** 2 - gridSide) {
      return gridSide * 2;
    }
    return randNum;
  };

  const wall = generateWall(gridSide);
  const [cycle1, setCycle1] = useState(generateRandomStartPosition() + 1);
  const [cycle2, setCycle2] = useState(generateRandomStartPosition() - 2);
  const [direction1, setDirection1] = useState("right");
  const [direction2, setDirection2] = useState("left");
  const [trail1, setTrail1] = useState(Array(trailLength).fill(0));
  const [trail2, setTrail2] = useState(Array(trailLength).fill(0));
  const [cycle1LookAhead, setCycle1LookAhead] = useState(cycle1 + 1);
  const [cycle2LookAhead, setCycle2LookAhead] = useState(cycle2 - 1);
  const [gameStatus, setGameStatus] = useState("Ongoing");
  let collisionArray = [];

  const handleDirectionChange = (event) => {
    switch (event.key) {
      case "a":
        if (direction1 !== "right" && player1 !== "computer") {
          setDirection1("left");
        }
        break;
      case "d":
        if (direction1 !== "left" && player1 !== "computer") {
          setDirection1("right");
        }
        break;
      case "w":
        if (direction1 !== "bottom" && player1 !== "computer") {
          setDirection1("top");
        }
        break;
      case "s":
        if (direction1 !== "top" && player1 !== "computer") {
          setDirection1("bottom");
        }
        break;
      case "j":
        if (direction2 !== "right" && player2 !== "computer") {
          setDirection2("left");
        }
        break;
      case "l":
        if (direction2 !== "left" && player2 !== "computer") {
          setDirection2("right");
        }
        break;
      case "i":
        if (direction2 !== "bottom" && player2 !== "computer") {
          setDirection2("top");
        }
        break;
      case "k":
        if (direction2 !== "top" && player2 !== "computer") {
          setDirection2("bottom");
        }
        break;
      default:
    }
  };

  const moveCycle = (playerNum, direction, position) => {
    let tempPos = position;
    switch (direction) {
      case "right":
        tempPos += 1;
        if (playerNum === 1) {
          setCycle1(tempPos);
          setCycle1LookAhead((tempPos += 1));
        } else if (playerNum === 2) {
          setCycle2(tempPos);
          setCycle2LookAhead((tempPos += 1));
        }
        break;
      case "left":
        tempPos -= 1;
        if (playerNum === 1) {
          setCycle1(tempPos);
          setCycle1LookAhead((tempPos -= 1));
        } else if (playerNum === 2) {
          setCycle2(tempPos);
          setCycle2LookAhead((tempPos -= 1));
        }
        break;
      case "top":
        tempPos -= gridSide;
        if (playerNum === 1) {
          setCycle1(tempPos);
          setCycle1LookAhead((tempPos -= gridSide));
        } else if (playerNum === 2) {
          setCycle2(tempPos);
          setCycle2LookAhead((tempPos -= gridSide));
        }
        break;
      case "bottom":
        tempPos += gridSide;
        if (playerNum === 1) {
          setCycle1(tempPos);
          setCycle1LookAhead((tempPos += gridSide));
        } else if (playerNum === 2) {
          setCycle2(tempPos);
          setCycle2LookAhead((tempPos += gridSide));
        }
        break;
      default:
    }
  };

  const checkCollision = () => {
    collisionArray = wall.concat(trail1, trail2);
    if (
      collisionArray.includes(cycle1LookAhead) &&
      collisionArray.includes(cycle2LookAhead)
    ) {
      setGameStatus("Both Players Died");
      return;
    }
    if (collisionArray.includes(cycle1LookAhead)) {
      setGameStatus(`${player2} won`);
      return;
    }
    if (collisionArray.includes(cycle2LookAhead)) {
      setGameStatus(`${player1} won`);
      return;
    }
  };

  const createCycleTrail = (playerNum, position, array) => {
    let newTrail = array;
    newTrail.shift();
    newTrail.push(position);
    if (playerNum === 1) {
      setTrail1(newTrail);
    } else if (playerNum === 2) {
      setTrail2(newTrail);
    }
  };

  useEffect(() => {
    if (gameStatus === "Ongoing") {
      const gameTick = setInterval(() => {
        moveCycle(1, direction1, cycle1);
        moveCycle(2, direction2, cycle2);
        checkCollision();
        createCycleTrail(1, cycle1, trail1);
        createCycleTrail(2, cycle2, trail2);
        // if (player1 === "computer") {
        //   computerPlayer(direction1, cycle1LookAhead, collisionArray, gridSide);
        // }
        // if (player2 === "computer") {
        //   computerPlayer(direction2, cycle2LookAhead, collisionArray, gridSide);
        // }
      }, gameSpeed);
      return () => clearInterval(gameTick);
    }
  }, [cycle1, cycle2, direction1, direction2]);

  if (gameStatus !== "Ongoing") {
    return <GameOver message={gameStatus} player2={player2} />;
  } else {
    return (
      <>
        <input
          className="grid-area"
          type="text"
          onKeyDown={handleDirectionChange}
          autoFocus
        />
        <GridMaker
          key="someKey"
          cycle1={cycle1}
          cycle2={cycle2}
          gridSide={gridSide}
          trail1={trail1}
          trail2={trail2}
          wall={wall}
        />
      </>
    );
  }
};
export default GameLoop;
