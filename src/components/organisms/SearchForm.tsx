'use client'

import { useState } from 'react';
import CityInput from '../molecules/CityInput';
import DatePicker from '../molecules/DataPicker';
import Button from '../atoms/Button';

interface SearchFormProps {
  onSearch: (params: { departureCity: string; arrivalCity: string; date: string }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    onSearch({ departureCity, arrivalCity, date });
  };

  return (
    <div className="search-form">
      <CityInput
        placeholder="Ciudad de Partida"
        value={departureCity}
        onChange={(e) => setDepartureCity(e.target.value)}
      />
      <CityInput
        placeholder="Ciudad de Llegada"
        value={arrivalCity}
        onChange={(e) => setArrivalCity(e.target.value)}
      />
      <DatePicker value={date} onChange={(e) => setDate(e.target.value)} />
      <Button onClick={handleSearch}>Buscar</Button>
    </div>
  );
};

export default SearchForm;
