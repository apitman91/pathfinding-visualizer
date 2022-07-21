import './App.scss';
import AStar from './classes/AStar';
import Dijkstra from './classes/Dijkstra';
import PathfindingAlgorithm from './classes/PathfindingAlgorithm';
import PathfindingVisualizer from './components/new/PathfindingVisualizer';

const PATHFINDING_ALGORITHMS: Map<string, PathfindingAlgorithm> = new Map([
  ["Dijkstra's", new Dijkstra()],
  ['A*', new AStar()],
]);

const NUM_ROWS = 20;
const NUM_COLS = 20;
const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 15;

function App() {
  return (
    <div className="App">
      {/* <Visualizer pathfindingAlgorithms={PATHFINDING_ALGORITHMS}></Visualizer> */}
      <PathfindingVisualizer
        pathfindingAlgorithms={PATHFINDING_ALGORITHMS}
      ></PathfindingVisualizer>
    </div>
  );
}

export default App;
