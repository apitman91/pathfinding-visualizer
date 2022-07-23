import './App.scss';
import AStar from './classes/AStar';
import Dijkstra from './classes/Dijkstra';
import PathfindingAlgorithm from './classes/PathfindingAlgorithm';
import Visualizer from './components/Visualizer';

const PATHFINDING_ALGORITHMS: Map<string, PathfindingAlgorithm> = new Map([
  ["Dijkstra's", new Dijkstra()],
  ['A*', new AStar()],
]);

function App() {
  return (
    <div className="App">
      <Visualizer pathfindingAlgorithms={PATHFINDING_ALGORITHMS}></Visualizer>
    </div>
  );
}

export default App;
