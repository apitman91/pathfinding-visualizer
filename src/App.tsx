import './App.css';
import AStar from './classes/AStar';
import Dijkstra from './classes/Dijkstra';
import PathfindingAlgorithm from './classes/PathfindingAlgorithm';
import PathfindingVisualizer from './components/PathFindingVisualizer';

const pathfindingAlgorithms: Map<string, PathfindingAlgorithm> = new Map([
  ["Dijkstra's", new Dijkstra()],
  ['A*', new AStar()],
]);

function App() {
  return (
    <div className="App">
      <PathfindingVisualizer
        pathfindingAlgorithms={pathfindingAlgorithms}
      ></PathfindingVisualizer>
    </div>
  );
}

export default App;
