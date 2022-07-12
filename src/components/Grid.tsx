import { Component } from 'react';
import Dijkstra from '../classes/Dijkstra';
import Node from '../classes/Node';
import PathfindingAlgorithm from '../classes/PathfindingAlgorithm';
import PathfindingResult from '../classes/PathfindingResult';
import './Grid.css';
import NodeCell from './NodeCell';

interface GridProps {
  numRows: number;
  numCols: number;
  pathfindingAlgorithm: PathfindingAlgorithm;
}

interface GridState {
  grid: Node[][];
  isMouseDown: boolean;
}

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 15;

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
          distance: Infinity,
          previous: undefined,
          isVisited: false,
          isWall: false,
          isStart: row === START_NODE_ROW && col === START_NODE_COL,
          isEnd: row === END_NODE_ROW && col === END_NODE_COL,
          isShortestPath: false,
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
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    this.setState({
      grid: newGrid,
    });
  };

  toggleVisited = (row: number, col: number) => {
    //console.log('toggling ', row, col);
    const { grid } = this.state;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isVisited: true,
    };
    newGrid[row][col] = newNode;
    this.setState({
      grid: newGrid,
    });
  };

  toggleShortestPath = (row: number, col: number) => {
    const { grid } = this.state;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isShortestPath: true,
    };
    newGrid[row][col] = newNode;
    this.setState({
      grid: newGrid,
    });
  };

  handleClick = () => {
    const { grid } = this.state;
    const newGrid: Node[][] = [];

    for (const row of grid) {
      const newRow: Node[] = [];
      for (const node of row) {
        const newNode: Node = {
          ...node,
        };
        newRow.push(newNode);
      }
      newGrid.push(newRow);
    }

    //console.log(newGrid);

    const startNode: Node = newGrid[START_NODE_ROW][START_NODE_COL];
    const endNode: Node = newGrid[END_NODE_ROW][END_NODE_COL];
    const algo: Dijkstra = new Dijkstra();
    const result: PathfindingResult = algo.findShortestPath(
      newGrid,
      startNode,
      endNode,
    )!;

    const { visitedNodes, shortestPath } = result;
    // for (let i = 0; i < visitedNodes.length; i++) {
    //   setTimeout(() => {
    //     const node = visitedNodes[i];
    //     const { row, col } = node;
    //     this.toggleVisited(row, col);
    //   }, 20 * i);
    // }
    this.animatePathfinding(visitedNodes, shortestPath);
  };

  animatePathfinding(visitedNodes: Node[], shortestPath: Node[]) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      //console.log(i, visitedNodes.length);
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPath);
        }, 20 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        const { row, col } = node;
        this.toggleVisited(row, col);
      }, 20 * i);
    }
  }

  animateShortestPath(shortestPath: Node[]) {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        const { row, col } = node;
        this.toggleShortestPath(row, col);
      }, 50 * i);
    }
  }

  render() {
    const { grid } = this.state;
    return (
      <>
        <button onClick={this.handleClick}>Go</button>
        <div className="grid">
          {grid.map((row: Node[], rowIndex: number) => {
            return (
              <div key={rowIndex}>
                {row.map((node: Node, nodeIndex: number) => {
                  return (
                    <NodeCell
                      key={nodeIndex}
                      {...node}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={(row, col) => this.handleMouseUp(row, col)}
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
