import styles from './FiltersPanel.module.sass'
import SelectDropdown from "../../atoms/SelectDropdown/SelectDropdown";
import DatePicker from "../../molecules/DataPicker/DataPicker";
import Button from "../../atoms/Button/Button";
import { useState } from "react";

interface FiltersPanelProps {
  airlineOptions: string[];
  onApplyFilters: (filters: { airline: string; arrivalDate: string }) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  airlineOptions,
  onApplyFilters,
}) => {
  const [selectedAirline, setSelectedAirline] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  const handleApplyFilters = () => {
    onApplyFilters({ airline: selectedAirline, arrivalDate });
  };

  return (
    <div className={styles.filtersPanel}>
      <SelectDropdown
        options={airlineOptions}
        value={selectedAirline}
        onChange={(e) => setSelectedAirline(e.target.value)}
      />
      <DatePicker
        value={arrivalDate}
        onChange={(e) => setArrivalDate(e.target.value)}
      />
      <Button onClick={handleApplyFilters}>Aplicar Filtros</Button>
    </div>
  );
};

export default FiltersPanel;
