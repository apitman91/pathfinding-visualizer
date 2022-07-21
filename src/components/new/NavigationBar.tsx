import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

interface NavigationBarProps {
  algorithms: string[];
  selectedAlgorithm?: string;
  onAlgorithmSelected: (algorithm: string) => void;
  onVisualize: () => void;
  onClear: () => void;
}

const NavigationBar = React.forwardRef<HTMLDivElement, NavigationBarProps>(
  (props, ref) => {
    const {
      algorithms,
      selectedAlgorithm,
      onAlgorithmSelected,
      onVisualize,
      onClear,
    } = props;
    return (
      <Container ref={ref} fluid id="nav-bar">
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Pathfinding Visualizer</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <NavDropdown
                  title={selectedAlgorithm ? selectedAlgorithm : 'Algorithms'}
                  id="collasible-nav-dropdown"
                >
                  {algorithms.map((algorithm, i) => (
                    <NavDropdown.Item
                      key={i}
                      onClick={() => onAlgorithmSelected(algorithm)}
                    >
                      {algorithm}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <Nav.Link onClick={onVisualize}>Visualize</Nav.Link>
                <Nav.Link onClick={onClear}>Clear Grid</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    );
  },
);

export default NavigationBar;
