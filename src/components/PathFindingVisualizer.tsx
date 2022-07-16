import React, { Component } from 'react';
import Node from '../classes/Node';
import PathfindingAlgorithm from '../classes/PathfindingAlgorithm';
import PathfindingResult from '../classes/PathfindingResult';
import NavBar from './NavBar';
import NodeGrid from './NodeGrid';

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
  selectedAlgorithm: PathfindingAlgorithm;
  selectedAlgorithmName: string | undefined;
  graph: Node[][];
  isMouseDown: boolean;
}

export default class PathfindingVisualizer extends Component<
  PathfindingVisualizerProps,
  PathfindingVisualizerState
> {
  constructor(props: PathfindingVisualizerProps) {
    super(props);
    const selectedAlgorithm = props.pathfindingAlgorithms.values().next().value;
    console.log(Array.from(props.pathfindingAlgorithms)[0]);
    const graph: Node[][] = this.generateGraph();
    this.state = {
      selectedAlgorithm: selectedAlgorithm,
      selectedAlgorithmName: undefined,
      graph: graph,
      isMouseDown: false,
    };
  }

  generateGraph(): Node[][] {
    const {
      numRows,
      numCols,
      startNodeRow,
      startNodeCol,
      endNodeRow,
      endNodeCol,
    } = this.props;
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
    const graph: Node[][] = this.generateGraph();
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
    const { graph } = this.state;
    const newGrid = graph.slice();
    const node = newGrid[row][col];
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
        <NodeGrid
          graph={graph}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseUp={this.handleMouseUp}
        ></NodeGrid>
      </div>
    );
  }
}
