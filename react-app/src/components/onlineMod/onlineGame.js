import React, { useEffect, useState } from "react";
import "./online.css";
import Cell from "../grid/Cell";
import GameOver from "../menus/GameOver";

const OnlineGame = ({ bufer, controller, isWait }) => {
  const gridColumns = "auto ".repeat(Math.sqrt(bufer.data.length));
  const gridStyle = { gridTemplateColumns: gridColumns };

  const handleDirectionChange = (event) => {
    switch (event.key) {
      case "a":
        controller.wsChangeDirection("left");
        break;
      case "d":
        controller.wsChangeDirection("right");
        break;
      case "w":
        controller.wsChangeDirection("top");
        break;
      case "s":
        controller.wsChangeDirection("bottom");
        break;
      default:
        break;
    }
  };

  if (bufer.action === "TIMER") {
    return (
      <p className="timer">
        {bufer.action === "TIMER" || isWait
          ? bufer.data
          : "Waiting for another player"}
      </p>
    );
  } else {
    return (
      <>
        {isWait ? <div className="game-message">{bufer.data}</div> : <GameOver message={"online connection ended"}/>}

        <input
          className="grid-area-online"
          type="text"
          onKeyDown={handleDirectionChange}
          autoFocus
        />
  
        <div className="grid" style={gridStyle}>
          {bufer.action === "GRID" &&
            bufer.data.map((value, index) => {
              return (
                <div
                  className={
                    value === "*"
                      ? "cell wall"
                      : value === 9
                      ? "cell trail1"
                      : value === 8
                      ? "cell trail2"
                      : value === 1
                      ? "cell head1"
                      : value === 2
                      ? "cell head2"
                      : "cell"
                  }
                  key={index}
                >
                  <Cell />
                </div>
              );
            })}
        </div>
      </>
    );
  }
};

export default OnlineGame;
