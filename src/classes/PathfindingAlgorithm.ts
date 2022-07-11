import Node from './Node';
import PathfindingResult from './PathfindingResult';

export default interface PathfindingAlgorithm {
  findShortestPath(
    grid: Node[][],
    startNode: Node,
    endNode: Node,
  ): PathfindingResult | undefined;
}
