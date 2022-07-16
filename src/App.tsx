import './App.scss';
import AStar from './classes/AStar';
import Dijkstra from './classes/Dijkstra';
import PathfindingAlgorithm from './classes/PathfindingAlgorithm';
import PathfindingVisualizer from './components/PathFindingVisualizer';

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
      <PathfindingVisualizer
        pathfindingAlgorithms={PATHFINDING_ALGORITHMS}
        numRows={NUM_ROWS}
        numCols={NUM_COLS}
        startNodeRow={START_NODE_ROW}
        startNodeCol={START_NODE_COL}
        endNodeRow={END_NODE_ROW}
        endNodeCol={END_NODE_COL}
      ></PathfindingVisualizer>
    </div>
  );
}

export default App;
