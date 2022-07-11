export default interface Node {
  row: number;
  col: number;
  distance: number;
  isVisited: boolean;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
}
