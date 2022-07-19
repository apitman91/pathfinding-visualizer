import { Component } from 'react';
import Node from '../classes/Node';
import PathfindingAlgorithm from '../classes/PathfindingAlgorithm';
import PathfindingResult from '../classes/PathfindingResult';
import Grid from './Grid';
import NavBar from './NavBar';

interface VisualizerProps {
  pathfindingAlgorithms: Map<string, PathfindingAlgorithm>;
}

interface VisualizerState {
  numRows: number;
  numCols: number;
  startNodeRow: number;
  startNodeCol: number;
  endNodeRow: number;
  endNodeCol: number;
  selectedAlgorithm: PathfindingAlgorithm;
  selectedAlgorithmName: string | undefined;
}

export default class Visualizer extends Component<
  VisualizerProps,
  VisualizerState
> {
  private graph: Node[][];
  private isMouseDown: boolean;

  constructor(props: VisualizerProps) {
    super(props);
    const selectedAlgorithm = props.pathfindingAlgorithms.values().next().value;
    this.state = {
      numRows: 0,
      numCols: 0,
      startNodeRow: 0,
      startNodeCol: 0,
      endNodeRow: 0,
      endNodeCol: 0,
      selectedAlgorithm: selectedAlgorithm,
      selectedAlgorithmName: undefined,
    };
    this.graph = [];
    this.isMouseDown = false;
    this.calculateDimensions = this.calculateDimensions.bind(this);
  }

  componentDidMount() {
    this.calculateDimensions();
    window.addEventListener('resize', this.calculateDimensions);
  }

  calculateDimensions() {
    const navBarHeight = document.getElementById('nav-bar')!.clientHeight;
    const height = document.getElementById('root')!.clientHeight - navBarHeight;
    const width = document.getElementById('root')!.clientWidth;
    const numRows = Math.floor(height / 27);
    const numCols = Math.floor(width / 27);
    const startNodeRow = Math.floor(numRows / 2);
    const startNodeCol = Math.floor(numCols / 4);
    const endNodeRow = Math.floor(numRows / 2);
    const endNodeCol = Math.floor((3 * numCols) / 4);
    this.setState(
      {
        numRows: numRows,
        numCols: numCols,
        startNodeRow: startNodeRow,
        startNodeCol: startNodeCol,
        endNodeRow: endNodeRow,
        endNodeCol: endNodeCol,
      },
      () => this.generateGraph(),
    );
  }

  generateGraph() {
    const {
      numRows,
      numCols,
      startNodeRow,
      startNodeCol,
      endNodeRow,
      endNodeCol,
    } = this.state;
    this.graph = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = [];
      for (let col = 0; col < numCols; col++) {
        const node = {
          row: row,
          col: col,
          distance: Infinity,
          previous: undefined,
          isVisited: false,
          isWall: false,
          isStart: row === startNodeRow && col === startNodeCol,
          isEnd: row === endNodeRow && col === endNodeCol,
          isShortestPath: false,
        };

        if (node.isStart) {
          this.addClass(row, col, 'node-start');
        }
        if (node.isEnd) {
          this.addClass(row, col, 'node-end');
        }

        currentRow.push(node);
      }
      this.graph.push(currentRow);
    }
  }

  addClass(row: number, col: number, className: string) {
    if (
      this.isStartOrEndNode(row, col) &&
      className !== 'node-start' &&
      className !== 'node-end'
    ) {
      return;
    }
    document
      .getElementById('node-' + row + '-' + col)!
      .classList.add(className);
  }

  handleAlgorithmNameSelected = (algorithmName: string) => {
    const { pathfindingAlgorithms } = this.props;
    const selectedAlgorithm = pathfindingAlgorithms.get(algorithmName)!;
    this.setState({
      selectedAlgorithm: selectedAlgorithm,
      selectedAlgorithmName: algorithmName,
    });
  };

  handleVisualizeClicked = () => {
    const {
      startNodeRow,
      startNodeCol,
      endNodeRow,
      endNodeCol,
      selectedAlgorithm,
    } = this.state;
    const startNode = this.graph[startNodeRow][startNodeCol];
    const endNode = this.graph[endNodeRow][endNodeCol];
    const result: PathfindingResult = selectedAlgorithm.findShortestPath(
      this.graph,
      startNode,
      endNode,
    )!;
    const { visitedNodes, shortestPath } = result;
    this.animatePathfinding(visitedNodes, shortestPath);
  };

  animatePathfinding(visitedNodes: Node[], shortestPath: Node[]) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        const { row, col } = node;
        this.addClass(row, col, 'node-visited');
      }, 10 * i);
    }
  }

  animateShortestPath(shortestPath: Node[]) {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        const { row, col } = node;
        this.addClass(row, col, 'node-shortest-path');
      }, 50 * i);
    }
  }

  handleClearClicked = () => {
    this.clearGrid();
  };

  clearGrid() {
    this.generateGraph();
    const { numRows, numCols } = this.state;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        document
          .getElementById('node-' + row + '-' + col)!
          .classList.remove('node-wall', 'node-visited', 'node-shortest-path');
      }
    }
  }

  handleMouseDown = (row: number, col: number) => {
    this.isMouseDown = true;
    if (isNaN(row) || isNaN(col) || this.isStartOrEndNode(row, col)) {
      return;
    }

    this.graph[row][col].isWall = true;
    document.getElementById('node-' + row + '-' + col)!.className =
      'node node-wall';
  };

  isStartOrEndNode(row: number, col: number): boolean {
    const { startNodeRow, startNodeCol, endNodeRow, endNodeCol } = this.state;
    return (
      (row === startNodeRow && col === startNodeCol) ||
      (row === endNodeRow && col === endNodeCol)
    );
  }

  handleMouseOver = (row: number, col: number) => {
    if (!this.isMouseDown || this.isStartOrEndNode(row, col)) {
      return;
    }
    this.graph[row][col].isWall = true;
    document.getElementById('node-' + row + '-' + col)!.className =
      'node node-wall';
  };

  handleMouseUp = () => {
    this.isMouseDown = false;
  };

  render() {
    const { pathfindingAlgorithms } = this.props;
    const algorithmOptions = [];
    for (let algorithm of Array.from(pathfindingAlgorithms.keys())) {
      algorithmOptions.push(algorithm);
    }
    const { numRows, numCols, selectedAlgorithmName } = this.state;
    return (
      <div className="PathfindingVisualizer">
        <NavBar
          algorithms={algorithmOptions}
          selectedAlgorithm={selectedAlgorithmName}
          onAlgorithmSelected={this.handleAlgorithmNameSelected}
          onVisualize={this.handleVisualizeClicked}
          onClear={this.handleClearClicked}
        ></NavBar>
        <div
          onMouseDown={() => this.handleMouseDown(NaN, NaN)}
          onMouseUp={this.handleMouseUp}
        >
          <Grid
            numRows={numRows}
            numCols={numCols}
            onMouseDown={this.handleMouseDown}
            onMouseOver={this.handleMouseOver}
            onMouseUp={this.handleMouseUp}
          ></Grid>
        </div>
      </div>
    );
  }
}
