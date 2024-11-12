// components/molecules/CityInput.tsx
import Input from '../atoms/Input';

interface CityInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CityInput: React.FC<CityInputProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="city-input">
      <Input placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default CityInput;
