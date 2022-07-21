import React from 'react';
import Node from '../../classes/Node';
import { CellHandler } from './Cell';

export default class GridNode implements Node {
  row: number;
  col: number;
  distance: number;
  previous: Node | undefined;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isShortestPath: boolean;
  ref: React.RefObject<CellHandler>;

  constructor(row: number, col: number, ref: React.RefObject<CellHandler>) {
    this.row = row;
    this.col = col;
    this.distance = Infinity;
    this.previous = undefined;
    this.isVisited = false;
    this.isStart = false;
    this.isEnd = false;
    this.isWall = false;
    this.isShortestPath = false;
    this.ref = ref;
  }

  setWall(isWall: boolean) {
    this.isWall = isWall;
    if (this.ref.current) {
      this.ref.current.setWall(isWall);
    }
  }

  setVisited(isVisited: boolean) {
    this.isVisited = isVisited;
    if (this.ref.current) {
      this.ref.current.setVisited(isVisited);
    }
  }

  setShortestPath(isShortestPath: boolean) {
    this.isShortestPath = isShortestPath;
    if (this.ref.current) {
      this.ref.current.setShortestPath(isShortestPath);
    }
  }

  reset() {
    this.distance = Infinity;
    this.previous = undefined;
    this.setWall(false);
    this.setVisited(false);
    this.setShortestPath(false);
  }
}
