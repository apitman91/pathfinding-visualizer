import { Component } from 'react';
import PathfindingAlgorithm from '../classes/PathfindingAlgorithm';
import Grid from './Grid';

interface PathfindingVisualizerProps {
  algorithms?: PathfindingAlgorithm[];
}

export default class PathfindingVisualizer extends Component<PathfindingVisualizerProps> {
  constructor(props: PathfindingVisualizerProps) {
    super(props);
  }

  render() {
    return (
      <div className="PathfindingVisualizer">
        <Grid numRows={20} numCols={20}></Grid>
      </div>
    );
  }
}
