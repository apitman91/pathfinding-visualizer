import { Component } from 'react';

interface NodeProps {
  row: number;
  col: number;
  isVisited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isShortestPath: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: (row: number, col: number) => void;
}

export default class NodeCell extends Component<NodeProps> {
  shouldComponentUpdate(nextProps: NodeProps) {
    return (
      nextProps.isWall !== this.props.isWall ||
      nextProps.isVisited !== this.props.isVisited ||
      nextProps.isShortestPath !== this.props.isShortestPath
    );
  }

  render() {
    const {
      row,
      col,
      isStart,
      isEnd,
      isWall,
      isVisited,
      isShortestPath,
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
      : isShortestPath
      ? 'node-shortest-path'
      : isVisited
      ? 'node-visited'
      : '';
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${className}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseOver={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp(row, col)}
      ></div>
    );
  }
}
