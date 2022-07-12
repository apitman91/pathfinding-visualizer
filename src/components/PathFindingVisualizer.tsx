import React, { Component } from 'react';
import Dijkstra from '../classes/Dijkstra';
import Node from '../classes/Node';
import PathfindingAlgorithm from '../classes/PathfindingAlgorithm';
import PathfindingResult from '../classes/PathfindingResult';
import ApplicationBar from './ApplicationBar';
import NodeGrid from './NodeGrid';

interface PathfindingVisualizerProps {
  algorithms?: PathfindingAlgorithm[];
  pathfindingAlgorithms: Map<string, PathfindingAlgorithm>;
}

interface PathfindingVisualizerState {
  selectedAlgorithm: PathfindingAlgorithm;
  graph: Node[][];
  isMouseDown: boolean;
}

const NUM_ROWS = 20;
const NUM_COLS = 20;
const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 15;

export default class PathfindingVisualizer extends Component<
  PathfindingVisualizerProps,
  PathfindingVisualizerState
> {
  constructor(props: PathfindingVisualizerProps) {
    super(props);
    const a = props.pathfindingAlgorithms.entries().next().value;
    const graph: Node[][] = this.generateGraph();
    this.state = {
      selectedAlgorithm: new Dijkstra(),
      graph: graph,
      isMouseDown: false,
    };
  }

  generateGraph(): Node[][] {
    const graph: Node[][] = [];
    for (let row = 0; row < NUM_ROWS; row++) {
      const currentRow: Node[] = [];
      for (let col = 0; col < NUM_COLS; col++) {
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

    //console.log(newGrid);

    const startNode: Node = newGrid[START_NODE_ROW][START_NODE_COL];
    const endNode: Node = newGrid[END_NODE_ROW][END_NODE_COL];
    const { selectedAlgorithm } = this.state;
    const result: PathfindingResult = selectedAlgorithm.findShortestPath(
      newGrid,
      startNode,
      endNode,
    )!;
    const { visitedNodes, shortestPath } = result;
    this.animatePathfinding(visitedNodes, shortestPath);
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
      console.log(i, visitedNodes.length);
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
    //console.log('toggling ', row, col);
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

  render() {
    const { pathfindingAlgorithms } = this.props;
    const algorithmOptions = [];
    for (let algorithm of Array.from(pathfindingAlgorithms.keys())) {
      algorithmOptions.push(algorithm);
    }
    const { graph } = this.state;
    return (
      <div className="PathfindingVisualizer">
        <ApplicationBar
          algorithms={algorithmOptions}
          onAlgorithmSelected={this.handleAlgorithmSelected}
          onVisualize={this.handleVisualizeClicked}
        ></ApplicationBar>
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
