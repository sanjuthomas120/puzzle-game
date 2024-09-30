"use client";
import React, { useState, useEffect } from "react";

const PuzzleGame: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [emptyTileIndex, setEmptyTileIndex] = useState<number | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    let initialTiles = [...Array(15).keys()].map((n) => n + 1).concat(null);
    initialTiles = shuffleTiles(initialTiles);
    setTiles(initialTiles);
    setEmptyTileIndex(initialTiles.indexOf(null));
    setMoves(0);
    setIsModalOpen(false);
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
      setMoves((prev) => prev + 1);
    }
  };

  const checkPuzzleSolved = () => {
    const correctTiles = [...Array(15).keys()].map((n) => n + 1).concat(null);
    return JSON.stringify(tiles) === JSON.stringify(correctTiles);
  };

  useEffect(() => {
    if (checkPuzzleSolved()) {
      setIsModalOpen(true);
    }
  });

  return (
    <div className="relative flex flex-col h-screen items-center w-auto">
      <h1 className="text-2xl font-bold mb-16 mt-6 ">Puzzle Game</h1>
      <div className="grid grid-cols-4 grid-rows-4 gap-2 mt-16">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`flex justify-center items-center w-16 h-16 text-xl font-bold rounded-lg 
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
      <button
        onClick={initGame}
        className="mt-10 px-4 py-2 bg-white text-black font-semibold rounded hover:bg-black hover:text-white"
      >
        Reset
      </button>
         {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-lg mb-6">
              You completed the puzzle in {moves} moves!
            </p>
            <button
              onClick={initGame}
              className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
