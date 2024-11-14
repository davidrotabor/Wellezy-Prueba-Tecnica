
import InputField from "../../atoms/Input/Input";
import SelectDropdown from "../../atoms/SelectDropdown/SelectDropdown";

interface FilterGroupProps {
  departureCity: string;
  arrivalCity: string;
  airline: string;
  onFilterChange: (filters: {
    departureCity: string;
    arrivalCity: string;
    airline: string;
  }) => void;
  airlineOptions: string[];
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  departureCity,
  arrivalCity,
  airline,
  onFilterChange,
  airlineOptions,
}) => {
  return (
    <div className="filter-group">
      <InputField
        placeholder="Ciudad de Partida"
        value={departureCity}
        onChange={(e) =>
          onFilterChange({
            departureCity: e.target.value,
            arrivalCity,
            airline,
          })
        }
      />
      <InputField
        placeholder="Ciudad de Llegada"
        value={arrivalCity}
        onChange={(e) =>
          onFilterChange({
            departureCity,
            arrivalCity: e.target.value,
            airline,
          })
        }
      />
      <SelectDropdown
        options={airlineOptions}
        value={airline}
        onChange={(e) =>
          onFilterChange({
            departureCity,
            arrivalCity,
            airline: e.target.value,
          })
        }
      />
    </div>
  );
};

export default FilterGroup;
