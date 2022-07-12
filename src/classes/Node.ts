export default interface Node {
  row: number;
  col: number;
  distance: number;
  previous: Node | undefined;
  isVisited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isShortestPath: boolean;
}
