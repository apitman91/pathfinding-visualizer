import Node from './Node';
import PathfindingAlgorithm from './PathfindingAlgorithm';
import PathfindingResult from './PathfindingResult';

export default class Dijkstra implements PathfindingAlgorithm {
  findShortestPath(
    grid: Node[][],
    startNode: Node,
    endNode: Node,
  ): PathfindingResult | undefined {
    const visitedNodes: Node[] = [];
    startNode.distance = 0;
    const unvisitedNodes = this.getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      unvisitedNodes.sort((a, b) => a.distance - b.distance);
      const closestNode = unvisitedNodes.shift()!;
      // If we encounter a wall, skip it
      if (closestNode.isWall) {
        continue;
      }
      // If the closest node has a distance of infinity, there is no path available
      if (closestNode?.distance === Infinity) {
        return {
          visitedNodes: visitedNodes,
          shortestPath: [],
        };
      }
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
      if (closestNode === endNode) {
        return {
          visitedNodes: visitedNodes,
          shortestPath: [],
        };
      }
      this.visitNeighbors(grid, closestNode);
    }
  }

  getAllNodes(grid: Node[][]): Node[] {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  visitNeighbors(grid: Node[][], node: Node) {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(grid, node);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
    }
  }

  getUnvisitedNeighbors(grid: Node[][], node: Node): Node[] {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
  }
}
