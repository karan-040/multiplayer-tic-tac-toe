import { useContext, useState } from "react";
import CpuContext from "../contexts/CpuContext";

const UseTurn = () => {
  const { gameState, setgameState, Move, setMove, Winner, setWinner } =
    useContext(CpuContext);
  const [wait, setWait] = useState(false);
  const setTurn = (index) => {
    if (gameState[index].valid && Move) {
      //mark the box chosen by the user
      let temp = [...gameState];
      temp[index].value = "O";
      temp[index].valid = false;
      setgameState(temp);
      setMove((prevMove) => !prevMove);

      //check if the user won the game
      let winnerInfo = isWinner();
      if (winnerInfo) {
        const updval = { ...Winner };
        updval.winner = winnerInfo.winner;
        updval.indices = winnerInfo.indices;
        setWinner(updval);
        return;
      }
      //make a move for cpu as well
      //check whether a box is empty or not
      let flag = false;
      for (let i = 0; i < 9; i++) {
        if (gameState[i].valid) flag = true;
      }
      const randomtime = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
      setTimeout(() => {
        while (flag) {
          //choose an index
          let cpuindex = Math.floor(Math.random() * 9);
          if (gameState[cpuindex].valid) {
            //a box is selected
            let temp = [...gameState];
            temp[cpuindex].value = "X";
            temp[cpuindex].valid = false;
            setgameState(temp);
            setMove((prevMove) => !prevMove);
            winnerInfo = isWinner();
            if (winnerInfo) {
              const updval = { ...Winner };
              updval.winner = winnerInfo.winner;
              updval.indices = winnerInfo.indices;
              setWinner(updval);
              return;
            }
            break;
          }
        }
      }, randomtime);
      //check if the cpu won the game
      // Call isWinner once and store the result

      // If there is a winner, update the winner state
    }
  };

  const isWinner = () => {
    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    let draw = true; // Flag to check for a draw

    // Check each winning combination
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameState[a].value &&
        gameState[a].value === gameState[b].value &&
        gameState[a].value === gameState[c].value
      ) {
        // Return the winning value and indices
        return {
          winner: gameState[a].value,
          indices: [a, b, c],
        };
      }
    }

    // Check for draw
    for (const cell of gameState) {
      if (!cell.value) {
        draw = false;
        break;
      }
    }

    // If all cells are filled and no winner found, it's a draw
    if (draw) {
      return { winner: "draw", indices: [] };
    }
  };

  return [setTurn, isWinner];
};

export default UseTurn;
