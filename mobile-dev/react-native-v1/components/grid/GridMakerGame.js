import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Component, useEffect, useRef, useState } from "react";
import { GameEngine } from "react-native-game-engine";
import Cycle1 from "./Cycle1";
​
export default function GridMakerGame({
  gridSide,
  cycle1,
  cycle2,
  trail1,
  trail2,
  wall,
}) {
  const MAX_WIDTH = Dimensions.get("screen").width;
  const MAX_HEIGHT = Dimensions.get("screen").height; //These could be important for full width screen rendering
  const gridPixelWidth = 320;
  const gridPixelOffset = 100; //hardcode these values at the moment to work on pretty much all devices
  const cellSize = gridPixelWidth / gridSide;
​
  const backingGrid = useRef(null);
  const gridSize = gridSide * cellSize;
​
  // const convertCellIdToPixelVal = (array) {
  //   array.map((val) => { return { val } })
  // }
​
  let cycle1X = cycle1 % gridSide;
  let cycle1Y = (gridSide - cycle1X) / gridSide;
​
  let cycle2X = cycle2 % gridSide;
  let cycle2Y = (gridSide - cycle2X) / gridSide;
​
  return (
    <View style={styles.canvas}>
      <GameEngine
        ref={backingGrid}
        style={{
          width: gridSize,
          height: gridSize,
          flex: null,
          backgroundColor: "grey",
          position: "relative",
          top: -50,
        }}
        key={"backingGrid"}
      >
        {wall.map((value) => {
          if (value < 2) {
            return (
              <View
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: "pink",
                  position: "absolute",
                  left: gridPixelWidth - cellSize,
                  top: 0,
                }}
                key={value}
              ></View>
            );
          }
        })}
        <View
          style={{
            width: cellSize,
            height: cellSize,
            backgroundColor: "red",
            position: "relative",
            left: 0,
            top: 0,
          }}
          key={"red"}
        ></View>
      </GameEngine>
    </View>
  );
}
​
const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    backgroundColor: "#282c34",
    height: 5,
    width: 5,
  },
  head1: {
    backgroundColor: "#8a2be2",
    height: 5,
    width: 5,
  },
  head2: {
    backgroundColor: "#04722e",
    height: 5,
    width: 5,
  },
  wall: {
    backgroundColor: "#00ffff",
    height: 5,
    width: 5,
  },
  trail1: {
    backgroundColor: "#ff0000",
    height: 5,
    width: 5,
  },
  trail2: {
    backgroundColor: "#c8ee2e",
    height: 5,
    width: 5,
  },
});