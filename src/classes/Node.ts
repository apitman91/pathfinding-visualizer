export default class Node {
  row: number;
  col: number;
  distance: number;
  previous: Node | undefined;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  isShortestPath: boolean;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.distance = Infinity;
    this.previous = undefined;
    this.isWall = false;
    this.isVisited = false;
    this.isStart = false;
    this.isEnd = false;
    this.isShortestPath = false;
  }

  setIsStart(isStart: boolean) {
    this.isStart = isStart;
    this.toggleClass('node-start', isStart);
  }

  setIsEnd(isEnd: boolean) {
    this.isEnd = isEnd;
    this.toggleClass('node-end', isEnd);
  }

  setIsWall(isWall: boolean) {
    this.isWall = isWall;
    this.toggleClass('node-wall', isWall);
  }

  setIsVisited(isVisited: boolean) {
    this.isVisited = isVisited;
    this.toggleClass('node-visited', isVisited);
  }

  setIsShortestPath(isShortestPath: boolean) {
    this.isShortestPath = isShortestPath;
    this.toggleClass('node-shortest-path', isShortestPath);
  }

  reset() {
    this.distance = Infinity;
    this.previous = undefined;
    this.setIsVisited(false);
    this.setIsShortestPath(false);
  }

  clear() {
    this.reset();
    this.setIsWall(false);
  }

  toggleClass(className: string, toggle: boolean) {
    if (
      (this.isStart && className !== 'node-start') ||
      (this.isEnd && className !== 'node-end')
    ) {
      return;
    }

    let element = document.getElementById(`node-${this.row}-${this.col}`);
    if (element && toggle) {
      element.classList.add(className);
    } else if (element) {
      element.classList.remove(className);
    }
  }
}
