/*
El apartado dónde se hace la busqueda de los vuelos
*/
'use client'
import styles from './SearchForm.module.sass'

import { useState } from 'react';
import DatePicker from '../../molecules/DataPicker/DataPicker';
import Button from '../../atoms/Button/Button';
import Input from 'app/components/atoms/Input/Input';

interface SearchFormProps {
  onSearch: (params: { qtyPassengers: string, adult: string, departureCity: string; arrivalCity: string; date: string }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [qtyPassengers, setQtyPassengers] = useState('');
  const [adult, setAdult] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = () => {
    // Validar que las ciudades, cantidad de pasajeros/adultos, y la fecha no estén vacías
    if (!qtyPassengers || !adult || !departureCity || !arrivalCity || !date) {
      setErrorMessage('Por favor, complete todos los campos.');
      return;
    }

    // Validar que cantidad de pasajeros y adultos sean números
    const numberRegex = /^\d+$/;
    if (!qtyPassengers.match(numberRegex) || !adult.match(numberRegex)) {
      setErrorMessage('La cantidad de pasajeros y de adultos deben ser valores numéricos.');
      return;
    }

    // Validar formato de fecha (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(dateRegex)) {
      setErrorMessage('Por favor, ingrese una fecha válida (YYYY-MM-DD).');
      return;
    }

    setErrorMessage(''); // Limpiar el mensaje de error
    onSearch({ qtyPassengers, adult, departureCity, arrivalCity, date });
  };

  return (
    <div className={styles.searchForm}>
      <Input
        placeholder="Cantidad de pasajeros"
        value={qtyPassengers}
        onChange={(e) => setQtyPassengers(e.target.value)}
      />
      <Input
        placeholder="Cantidad de adultos"
        value={adult}
        onChange={(e) => setAdult(e.target.value)}
      />
      <Input
        placeholder="Ciudad de Partida"
        value={departureCity}
        onChange={(e) => setDepartureCity(e.target.value)}
      />
      <Input
        placeholder="Ciudad de Llegada"
        value={arrivalCity}
        onChange={(e) => setArrivalCity(e.target.value)}
      />
      <DatePicker value={date} onChange={(e) => setDate(e.target.value)} />
      <Button onClick={handleSearch}>Buscar</Button>
      
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default SearchForm;
