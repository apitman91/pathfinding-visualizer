import Node from './Node';

export default interface PathfindingResult {
  visitedNodes: Node[];
  shortestPath: Node[];
}
