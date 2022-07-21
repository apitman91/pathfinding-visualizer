import React, { useImperativeHandle, useState } from 'react';

export interface CellHandler {
  setWall: (isWall: boolean) => void;
  setVisited: (isVisited: boolean) => void;
  setShortestPath: (isShortestPath: boolean) => void;
}

interface CellProps {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseOver: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const Cell = React.forwardRef<CellHandler, CellProps>((props, ref) => {
  const [isWall, setIsWall] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [isShortestPath, setIsShortestPath] = useState(false);

  useImperativeHandle(ref, () => ({
    setWall(isWall: boolean): void {
      setIsWall(isWall);
    },
    setVisited(isVisited: boolean): void {
      setIsVisited(isVisited);
    },
    setShortestPath(isShortestPath: boolean): void {
      setIsShortestPath(isShortestPath);
    },
  }));

  const { row, col, isStart, isEnd, onMouseDown, onMouseOver, onMouseUp } =
    props;
  const className = isStart
    ? 'node-start'
    : isEnd
    ? 'node-end'
    : isWall
    ? 'node-wall'
    : isShortestPath
    ? 'node-shortest-path'
    : isVisited
    ? 'node-visited'
    : '';
  return (
    <div
      className={`node ${className}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseOver={() => onMouseOver(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
});

export default Cell;
