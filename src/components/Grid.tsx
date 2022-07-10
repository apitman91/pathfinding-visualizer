import { Component } from 'react';
import Node from '../classes/Node';
import NodeCell from './NodeCell';

interface GridProps {
  numRows: number;
  numCols: number;
}

interface GridState {
  grid: Node[][];
  isMouseDown: boolean;
}

export default class Grid extends Component<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);
    this.state = {
      grid: [],
      isMouseDown: false,
    };
  }

  componentDidMount() {
    this.initializeGrid();
    console.log(this.state.grid);
  }

  initializeGrid = () => {
    const grid: Node[][] = [];
    const { numRows, numCols } = this.props;
    for (let row = 0; row < numRows; row++) {
      const currentRow: Node[] = [];
      for (let col = 0; col < numCols; col++) {
        let node: Node = {
          row: row,
          col: col,
          isWall: false,
        };
        currentRow.push(node);
      }
      grid.push(currentRow);
    }
    this.setState({
      grid: grid,
    });
  };

  handleMouseDown = (row: number, col: number) => {
    this.setState({
      isMouseDown: true,
    });
    this.toggleWall(row, col);
  };

  handleMouseEnter = (row: number, col: number) => {
    const { isMouseDown } = this.state;
    console.log(isMouseDown);
    if (!isMouseDown) return;
    this.toggleWall(row, col);
  };

  handleMouseUp = (row: number, col: number) => {
    this.setState({
      isMouseDown: false,
    });
  };

  toggleWall = (row: number, col: number) => {
    const { grid } = this.state;
    const node = grid[row][col];
    node.isWall = !node.isWall;
    this.setState({
      grid: grid,
    });
  };

  render() {
    const { grid } = this.state;
    return (
      <div className="grid">
        {grid.map((row: Node[], rowIndex: number) => {
          return (
            <div key={rowIndex}>
              {row.map((node: Node, nodeIndex: number) => {
                return (
                  <NodeCell
                    key={nodeIndex}
                    node={node}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                    onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                  ></NodeCell>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
