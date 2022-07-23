import { Container, Row } from 'react-bootstrap';

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
        {rows.map((row: number[], rowIndex: number) => {
          return (
            <Row key={rowIndex} className="grid-row">
              {row.map((col: number, colIndex: number) => {
                return (
                  <div
                    key={colIndex}
                    id={`node-${rowIndex}-${colIndex}`}
                    className="node"
                    onMouseDown={() => onMouseDown(rowIndex, colIndex)}
                    onMouseOver={() => onMouseOver(rowIndex, colIndex)}
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
