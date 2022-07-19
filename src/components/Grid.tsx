import { Container, Row } from 'react-bootstrap';
import Node from '../classes/Node';

interface GridProps {
  numRows: number;
  numCols: number;
  onMouseDown: (row: number, col: number) => void;
  onMouseOver: (row: number, col: number) => void;
  onMouseUp: () => void;
}

export default function Grid(props: GridProps) {
  const { numRows, numCols, onMouseDown, onMouseOver, onMouseUp } = props;
  const rows = Array(numRows).fill(Array(numCols).fill(0));
  return (
    <Container fluid className="grid">
      <div className="grid">
        {rows.map((row: Node[], rowIndex: number) => {
          return (
            <Row key={rowIndex} className="grid-row">
              {row.map((node: Node, nodeIndex: number) => {
                return (
                  <div
                    key={nodeIndex}
                    id={`node-${rowIndex}-${nodeIndex}`}
                    className="node"
                    onMouseDown={() => onMouseDown(rowIndex, nodeIndex)}
                    onMouseOver={() => onMouseOver(rowIndex, nodeIndex)}
                    onMouseUp={() => onMouseUp()}
                  ></div>
                );
              })}
            </Row>
          );
        })}
      </div>
    </Container>
  );
}
