import { Component } from 'react';
import './NodeCell.css';

interface NodeProps {
  row: number;
  col: number;
  isVisited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: (row: number, col: number) => void;
}

export default class NodeCell extends Component<NodeProps> {
  render() {
    const {
      row,
      col,
      isStart,
      isEnd,
      isWall,
      isVisited,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;
    const className = isStart
      ? 'node-start'
      : isEnd
      ? 'node-end'
      : isWall
      ? 'node-wall'
      : isVisited
      ? 'node-visited'
      : '';
    return (
      <div
        className={`node ${className}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp(row, col)}
      ></div>
    );
  }
}
