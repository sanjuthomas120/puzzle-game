"use client";
import React, { useState, useEffect } from "react";

const PuzzleGame: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [emptyTileIndex, setEmptyTileIndex] = useState<number | null>(null);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    let initialTiles = [...Array(15).keys()].map((n) => n + 1).concat(null);
    initialTiles = shuffleTiles(initialTiles);
    setTiles(initialTiles);
    setEmptyTileIndex(initialTiles.indexOf(null));
  };

  const shuffleTiles = (array: (number | null)[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const canMoveTile = (index: number) => {
    if (emptyTileIndex === null) return false;
    const rowDiff = Math.abs(
      Math.floor(index / 4) - Math.floor(emptyTileIndex / 4)
    );
    const colDiff = Math.abs((index % 4) - (emptyTileIndex % 4));
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  };

  const moveTile = (index: number) => {
    if (canMoveTile(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyTileIndex!]] = [
        newTiles[emptyTileIndex!],
        newTiles[index],
      ];
      setTiles(newTiles);
      setEmptyTileIndex(index);
    }
  };

  const checkPuzzleSolved = () => {
    const correctTiles = [...Array(15).keys()].map((n) => n + 1).concat(null);
    return JSON.stringify(tiles) === JSON.stringify(correctTiles);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Puzzle Game</h1>
      <div className="grid grid-cols-4 grid-rows-4 gap-2">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`flex justify-center items-center w-24 h-24 text-xl font-bold rounded-lg 
              ${
                tile === null
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-black text-white cursor-pointer"
              }`}
            onClick={() => moveTile(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      {checkPuzzleSolved() && (
        <p className="text-green-600 text-lg font-semibold mt-4">
          Puzzle Solved!
        </p>
      )}
      <button
        onClick={initGame}
        className="mt-6 px-4 py-2 bg-white text-black font-semibold rounded hover:bg-black hover:text-white"
      >
        Reset
      </button>
    </div>
  );
};

export default PuzzleGame;
