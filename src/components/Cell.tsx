import React from 'react';

interface CellProps {
  row: number;
  col: number;
  isVisited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isShortestPath: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseOver: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const Cell = React.forwardRef<HTMLDivElement, CellProps>((props, ref) => {
  const { row, col, onMouseDown, onMouseOver, onMouseUp } = props;
  return (
    <div
      ref={ref}
      className="node"
      onMouseDown={() => onMouseDown(row, col)}
      onMouseOver={() => onMouseOver(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
});

export default Cell;
