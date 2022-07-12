import { Component } from 'react';
import Node from '../classes/Node';
import './Grid.css';
import NodeCell from './NodeCell';

interface NodeGridProps {
  graph: Node[][];
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: (row: number, col: number) => void;
}

export default class NodeGrid extends Component<NodeGridProps> {
  render() {
    const { graph, onMouseDown, onMouseEnter, onMouseUp } = this.props;
    return (
      <>
        <div className="grid">
          {graph.map((row: Node[], rowIndex: number) => {
            return (
              <div key={rowIndex}>
                {row.map((node: Node, nodeIndex: number) => {
                  return (
                    <NodeCell
                      key={nodeIndex}
                      {...node}
                      onMouseDown={(row, col) => onMouseDown(row, col)}
                      onMouseEnter={(row, col) => onMouseEnter(row, col)}
                      onMouseUp={(row, col) => onMouseUp(row, col)}
                    ></NodeCell>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
