import React from 'react';

interface ChildProps {
  onClick: () => void;
}

const Child = React.forwardRef<HTMLDivElement, ChildProps>((props, ref) => (
  <div className="node" ref={ref} onClick={props.onClick}></div>
));

export default Child;
