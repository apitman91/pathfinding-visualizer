import PathfindingResult from './PathfindingResult';
import Node from './Node';

export default function animatePathfinding(
  graph: Node[][],
  pathfindingResult: PathfindingResult,
) {
  const { visitedNodes, shortestPath } = pathfindingResult;
  for (let i = 0; i <= visitedNodes.length; i++) {
    if (i === visitedNodes.length) {
      setTimeout(() => {
        animateShortestPath(graph, shortestPath);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodes[i];
      const { row, col } = node;
      graph[row][col].setIsVisited(true);
    }, 10 * i);
  }
}

function animateShortestPath(graph: Node[][], shortestPath: Node[]) {
  for (let i = 0; i < shortestPath.length; i++) {
    setTimeout(() => {
      const node = shortestPath[i];
      const { row, col } = node;
      graph[row][col].setIsShortestPath(true);
    }, 50 * i);
  }
}
