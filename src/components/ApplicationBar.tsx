import React from 'react';
import './ApplicationBar.css';
import Dropdown from './Dropdown';

interface ApplicationBarProps {
  algorithms: string[];
  onAlgorithmSelected: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onVisualize: () => void;
}

export default function ApplicationBar(props: ApplicationBarProps) {
  const { algorithms, onAlgorithmSelected, onVisualize } = props;
  return (
    <div className="app-bar">
      <h1>Pathfinding Visualizer</h1>
      <Dropdown
        options={algorithms}
        onSelection={onAlgorithmSelected}
      ></Dropdown>
      <button onClick={onVisualize}>Visualize</button>
    </div>
  );
}
