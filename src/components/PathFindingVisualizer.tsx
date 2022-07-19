import React, { Component } from 'react';
import Node from '../classes/Node';
import PathfindingAlgorithm from '../classes/PathfindingAlgorithm';
import PathfindingResult from '../classes/PathfindingResult';
import NavBar from './NavBar';

interface PathfindingVisualizerProps {
  numRows: number;
  numCols: number;
  startNodeRow: number;
  startNodeCol: number;
  endNodeRow: number;
  endNodeCol: number;
  pathfindingAlgorithms: Map<string, PathfindingAlgorithm>;
}

interface PathfindingVisualizerState {
  numRows: number;
  numCols: number;
  selectedAlgorithm: PathfindingAlgorithm;
  selectedAlgorithmName: string | undefined;
  graph: Node[][];
  isMouseDown: boolean;
}

export default class PathfindingVisualizer extends Component<
  PathfindingVisualizerProps,
  PathfindingVisualizerState
> {
  private mouseDown: boolean = false;
  constructor(props: PathfindingVisualizerProps) {
    super(props);
    const selectedAlgorithm = props.pathfindingAlgorithms.values().next().value;
    console.log(Array.from(props.pathfindingAlgorithms)[0]);
    this.state = {
      numRows: 0,
      numCols: 0,
      selectedAlgorithm: selectedAlgorithm,
      selectedAlgorithmName: undefined,
      graph: [],
      isMouseDown: false,
    };
    this.mouseDown = false;
    this.handleResize = this.handleResize.bind(this);
    console.log('hello');
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    const navBarHeight = document.getElementById('nav-bar')!.clientHeight;
    const height = document.getElementById('root')!.clientHeight - navBarHeight;
    const width = document.getElementById('root')!.clientWidth;
    const numRows = Math.floor(height / 27);
    const numCols = Math.floor(width / 27);
    const graph = this.generateGraph(numRows, numCols);
    this.setState({
      numRows: numRows,
      numCols: numCols,
      graph: graph,
    });
  }

  handleResize = () => {
    console.log('handle resize called');
  };

  generateGraph(numRows: number, numCols: number): Node[][] {
    const { startNodeRow, startNodeCol, endNodeRow, endNodeCol } = this.props;
    const graph: Node[][] = [];
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
          isStart: row === startNodeRow && col === startNodeCol,
          isEnd: row === endNodeRow && col === endNodeCol,
          isShortestPath: false,
        };
        currentRow.push(node);
      }
      graph.push(currentRow);
    }
    return graph;
  }

  handleAlgorithmSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const algorithmName = event.target.value;
    const { pathfindingAlgorithms } = this.props;
    const selectedAlgorithm = pathfindingAlgorithms.get(algorithmName)!;
    this.setState({
      selectedAlgorithm: selectedAlgorithm,
    });
  };

  handleVisualizeClicked = () => {
    const { graph } = this.state;
    const newGrid: Node[][] = [];

    for (const row of graph) {
      const newRow: Node[] = [];
      for (const node of row) {
        const newNode: Node = {
          ...node,
        };
        newRow.push(newNode);
      }
      newGrid.push(newRow);
    }
    const { startNodeRow, startNodeCol, endNodeRow, endNodeCol } = this.props;
    const startNode: Node = newGrid[startNodeRow][startNodeCol];
    const endNode: Node = newGrid[endNodeRow][endNodeCol];
    const { selectedAlgorithm } = this.state;
    const result: PathfindingResult = selectedAlgorithm.findShortestPath(
      newGrid,
      startNode,
      endNode,
    )!;
    const { visitedNodes, shortestPath } = result;
    this.animatePathfinding(visitedNodes, shortestPath);
  };

  handleClearClicked = () => {
    const { numRows, numCols } = this.state;
    const graph: Node[][] = this.generateGraph(numRows, numCols);
    this.setState({
      graph: graph,
    });
  };

  handleMouseDown = (row: number, col: number) => {
    this.setState({
      isMouseDown: true,
    });
    this.toggleWall(row, col);
  };

  handleMouseEnter = (row: number, col: number) => {
    console.log(row, col);
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
    console.log(row, col);
    const { graph } = this.state;
    const newGrid = graph.slice();
    const node = graph[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    this.setState({
      graph: newGrid,
    });
  };

  animatePathfinding(visitedNodes: Node[], shortestPath: Node[]) {
    for (let i = 0; i <= visitedNodes.length; i++) {
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

  toggleShortestPath = (row: number, col: number) => {
    const { graph } = this.state;
    const newGrid = graph.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isShortestPath: true,
    };
    newGrid[row][col] = newNode;
    this.setState({
      graph: newGrid,
    });
  };

  toggleVisited = (row: number, col: number) => {
    const { graph } = this.state;
    const newGrid = graph.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isVisited: true,
    };
    newGrid[row][col] = newNode;
    this.setState({
      graph: newGrid,
    });
  };

  handleAlgorithmNameSelected = (algorithmName: string) => {
    const { pathfindingAlgorithms } = this.props;
    const selectedAlgorithm = pathfindingAlgorithms.get(algorithmName)!;
    this.setState({
      selectedAlgorithm: selectedAlgorithm,
      selectedAlgorithmName: algorithmName,
    });
  };

  _handleMouseDown = (row: number, col: number) => {
    this.mouseDown = true;
    if (isNaN(row) || isNaN(col)) {
      return;
    }
    document.getElementById('node-' + row + '-' + col)!.className =
      'node node-wall';
  };

  _handleMouseOver = (row: number, col: number) => {
    if (!this.mouseDown) {
      return;
    }
    document.getElementById('node-' + row + '-' + col)!.className =
      'node node-wall';
  };

  _handleMouseUp = () => {
    this.mouseDown = false;
  };

  render() {
    const { pathfindingAlgorithms } = this.props;
    const algorithmOptions = [];
    for (let algorithm of Array.from(pathfindingAlgorithms.keys())) {
      algorithmOptions.push(algorithm);
    }
    const { graph, selectedAlgorithmName } = this.state;
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
          onMouseDown={() => this._handleMouseDown(NaN, NaN)}
          onMouseUp={this._handleMouseUp}
        >
          {/* <Grid
            graph={graph}
            onMouseDown={this._handleMouseDown}
            onMouseOver={this._handleMouseOver}
            onMouseUp={this._handleMouseUp}
          ></Grid> */}
        </div>
      </div>
    );
  }
}
