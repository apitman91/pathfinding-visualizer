import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Node from '../../classes/Node';
import PathfindingAlgorithm from '../../classes/PathfindingAlgorithm';
import PathfindingResult from '../../classes/PathfindingResult';
import Cell, { CellHandler } from './Cell';
import GridNode from './GridNode';
import NavigationBar from './NavigationBar';

interface PathfindingVisualizerProps {
  pathfindingAlgorithms: Map<string, PathfindingAlgorithm>;
}

interface PathfindingVisualizerState {
  graph: GridNode[][];
  startNodeRow: number;
  startNodeCol: number;
  endNodeRow: number;
  endNodeCol: number;
  selectedAlgorithm: PathfindingAlgorithm;
  selectedAlgorithmName: string | undefined;
}

export default class PathfindingVisualizer extends Component<
  PathfindingVisualizerProps,
  PathfindingVisualizerState
> {
  private isMouseDown: boolean;
  private navigationBar: React.RefObject<HTMLDivElement>;
  constructor(props: PathfindingVisualizerProps) {
    super(props);
    const selectedAlgorithm = props.pathfindingAlgorithms.values().next().value;
    this.state = {
      graph: [],
      startNodeRow: 0,
      startNodeCol: 0,
      endNodeRow: 0,
      endNodeCol: 0,
      selectedAlgorithm: selectedAlgorithm,
      selectedAlgorithmName: undefined,
    };
    this.isMouseDown = false;
    this.navigationBar = React.createRef();
    this.calculateDimensions = this.calculateDimensions.bind(this);
  }

  componentDidMount() {
    this.calculateDimensions();
    window.addEventListener('resize', this.calculateDimensions);
  }

  calculateDimensions() {
    // Calculate number of rows and columns
    const { innerHeight: windowHeight, innerWidth: windowWidth } = window;
    const height = windowHeight - this.navigationBar.current!.clientHeight;
    const width = windowWidth;
    const numRows = Math.floor(height / 27);
    const numCols = Math.floor(width / 27);

    // Calculate start and end nodes
    const startNodeRow = Math.floor(numRows / 2);
    const startNodeCol = Math.floor(numCols / 4);
    const endNodeRow = Math.floor(numRows / 2);
    const endNodeCol = Math.floor((3 * numCols) / 4);

    // Generate the graph
    const graph = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = [];
      for (let col = 0; col < numCols; col++) {
        const node = new GridNode(row, col, React.createRef<CellHandler>());
        if (row === startNodeRow && col === startNodeCol) {
          node.isStart = true;
        } else if (row === endNodeRow && col === endNodeCol) {
          node.isEnd = true;
        }
        currentRow.push(node);
      }
      graph.push(currentRow);
    }
    this.setState({
      graph: graph,
      startNodeRow: startNodeRow,
      startNodeCol: startNodeCol,
      endNodeRow: endNodeRow,
      endNodeCol: endNodeCol,
    });
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
      graph,
      startNodeRow,
      startNodeCol,
      endNodeRow,
      endNodeCol,
      selectedAlgorithm,
    } = this.state;
    const startNode = graph[startNodeRow][startNodeCol];
    const endNode = graph[endNodeRow][endNodeCol];
    const result: PathfindingResult = selectedAlgorithm.findShortestPath(
      graph,
      startNode,
      endNode,
    )!;
    const { visitedNodes, shortestPath } = result;
    this.animatePathfinding(visitedNodes, shortestPath);
  };

  animatePathfinding(visitedNodes: Node[], shortestPath: Node[]) {
    const { graph } = this.state;
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPath);
        }, 10 * i);
        return;
      }
      const { row, col } = visitedNodes[i];
      setTimeout(() => {
        graph[row][col].setVisited(true);
      }, 10 * i);
    }
  }

  animateShortestPath(shortestPath: Node[]) {
    const { graph } = this.state;
    for (let i = 0; i < shortestPath.length; i++) {
      const { row, col } = shortestPath[i];
      setTimeout(() => {
        console.log(row, col);
        graph[row][col].setShortestPath(true);
      }, 50 * i);
    }
  }

  handleClearClicked = () => {
    const { graph } = this.state;
    for (let row of graph) {
      for (let node of row) {
        node.reset();
      }
    }
  };

  handleMouseDown = (row: number, col: number) => {
    this.isMouseDown = true;
    if (isNaN(row) || isNaN(col)) {
      return;
    }
    const { graph } = this.state;
    const node = graph[row][col];
    if (node.isStart || node.isEnd) {
      return;
    }
    node.setWall(true);
  };

  handleMouseOver = (row: number, col: number) => {
    if (!this.isMouseDown) {
      return;
    }
    const { graph } = this.state;
    const node = graph[row][col];
    if (node.isStart || node.isEnd) {
      return;
    }
    node.setWall(true);
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
    const { graph, selectedAlgorithmName } = this.state;
    return (
      <div className="pathfinding-visualizer">
        <NavigationBar
          ref={this.navigationBar}
          algorithms={algorithmOptions}
          selectedAlgorithm={selectedAlgorithmName}
          onAlgorithmSelected={this.handleAlgorithmNameSelected}
          onVisualize={this.handleVisualizeClicked}
          onClear={this.handleClearClicked}
        ></NavigationBar>
        <div
          onMouseDown={() => this.handleMouseDown(NaN, NaN)}
          onMouseUp={this.handleMouseUp}
        >
          <Container fluid className="grid">
            <div className="grid">
              {graph.map((row: GridNode[], rowIndex: number) => {
                return (
                  <Row key={rowIndex} className="grid-row">
                    {row.map((node: GridNode, nodeIndex: number) => {
                      return (
                        <Cell
                          key={nodeIndex}
                          {...node}
                          onMouseDown={() =>
                            this.handleMouseDown(rowIndex, nodeIndex)
                          }
                          onMouseOver={() =>
                            this.handleMouseOver(rowIndex, nodeIndex)
                          }
                          onMouseUp={() => this.handleMouseUp()}
                        ></Cell>
                      );
                    })}
                  </Row>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    );
  }
}
