import './Dropdown.css';

interface DropdownProps {
  options: string[];
  onSelection?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown(props: DropdownProps) {
  const { options, onSelection } = props;
  return (
    <div className="dropdown-wrapper">
      <select onChange={onSelection}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
