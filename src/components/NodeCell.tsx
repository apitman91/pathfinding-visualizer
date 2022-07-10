import { Component } from 'react';
import Node from '../classes/Node';

interface NodeProps {
  node: Node;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: (row: number, col: number) => void;
}

export default class NodeCell extends Component<NodeProps> {
  render() {
    const { node, onMouseDown, onMouseEnter, onMouseUp } = this.props;
    const { row, col } = node;
    const className = node.isWall ? 'node-wall' : '';
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
