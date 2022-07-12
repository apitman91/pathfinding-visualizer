import React, { Component } from 'react';
import Dijkstra from '../classes/Dijkstra';
import PathfindingAlgorithm from '../classes/PathfindingAlgorithm';
import ApplicationBar from './ApplicationBar';
import Grid from './Grid';

interface PathfindingVisualizerProps {
  algorithms?: PathfindingAlgorithm[];
  pathfindingAlgorithms: Map<string, PathfindingAlgorithm>;
}

interface PathfindingVisualizerState {
  selectedAlgorithm: PathfindingAlgorithm;
}

export default class PathfindingVisualizer extends Component<
  PathfindingVisualizerProps,
  PathfindingVisualizerState
> {
  constructor(props: PathfindingVisualizerProps) {
    super(props);
    const a = props.pathfindingAlgorithms.entries().next().value;
    console.log(a);
    this.state = {
      selectedAlgorithm: new Dijkstra(),
    };
  }

  handleAlgorithmSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const algorithmName = event.target.value;
    const { pathfindingAlgorithms } = this.props;
    const selectedAlgorithm = pathfindingAlgorithms.get(algorithmName)!;
    this.setState({
      selectedAlgorithm: selectedAlgorithm,
    });
  };

  handleVisualizeClicked = () => {
    const { selectedAlgorithm } = this.state;
    console.log(selectedAlgorithm);
  };

  render() {
    const { pathfindingAlgorithms } = this.props;
    const algorithmOptions = [];
    for (let algorithm of Array.from(pathfindingAlgorithms.keys())) {
      algorithmOptions.push(algorithm);
    }
    return (
      <div className="PathfindingVisualizer">
        <ApplicationBar
          algorithms={algorithmOptions}
          onAlgorithmSelected={this.handleAlgorithmSelected}
          onVisualize={this.handleVisualizeClicked}
        ></ApplicationBar>
        <Grid numRows={20} numCols={20}></Grid>
      </div>
    );
  }
}
