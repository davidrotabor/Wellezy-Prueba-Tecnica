interface SelectDropdownProps {
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="select-dropdown">
      <option value="">Selecciona una opción</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;