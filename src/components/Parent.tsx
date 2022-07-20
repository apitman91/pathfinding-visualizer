import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Node from '../classes/Node';
import Cell from './Cell';

const numRows = 47;
const numCols = 120;

export default class Parent extends Component<{}> {
  private graph: Node[][];
  private references: React.RefObject<HTMLDivElement>[][];

  constructor(props: {}) {
    super(props);
    this.graph = [];
    this.references = [];
    this.generateGraph();
  }

  generateGraph() {
    this.graph = [];
    this.references = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = [];
      const currentRowReferences = [];
      for (let col = 0; col < numCols; col++) {
        const node = {
          row: row,
          col: col,
          distance: Infinity,
          previous: undefined,
          isVisited: false,
          isWall: false,
          isStart: false,
          isEnd: false,
          isShortestPath: false,
        };
        currentRow.push(node);
        currentRowReferences.push(React.createRef<HTMLDivElement>());
      }
      this.graph.push(currentRow);
      this.references.push(currentRowReferences);
    }
  }

  private isMouseDown: boolean = false;
  handleMouseDown = (row: number, col: number) => {
    this.isMouseDown = true;
    if (isNaN(row) || isNaN(col)) {
      return;
    }

    this.graph[row][col].isWall = true;
    this.references[row][col].current?.classList.add('node-wall');
  };

  handleMouseOver = (row: number, col: number) => {
    if (!this.isMouseDown) {
      return;
    }
    this.graph[row][col].isWall = true;
    this.references[row][col].current?.classList.add('node-wall');
  };

  handleMouseUp = () => {
    this.isMouseDown = false;
  };

  render() {
    return (
      <Container fluid className="grid">
        <div className="grid">
          {this.graph.map((row: Node[], rowIndex: number) => {
            return (
              <Row key={rowIndex} className="grid-row">
                {row.map((node: Node, nodeIndex: number) => {
                  return (
                    <Cell
                      key={nodeIndex}
                      ref={this.references[rowIndex][nodeIndex]}
                      {...node}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseOver={(row, col) => this.handleMouseOver(row, col)}
                      onMouseUp={this.handleMouseUp}
                    ></Cell>
                  );
                })}
              </Row>
            );
          })}
        </div>
      </Container>
    );
  }
}
