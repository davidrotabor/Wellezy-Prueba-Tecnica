/*
La tabla en su totalidad, con la paginación
*/
import styles from './FlightTable.module.sass'
import { useState } from 'react';
import TableHeader from '../../atoms/TableHeader/TableHeader';
import FlightOption from '../FlightOption/FlightOption';
import Pagination from '../../molecules/Pagination/Pagination';

interface SegmentRowProps {
  segment: {
    productDateTime: {
      dateFormatDeparture: string;
      timeOfDeparture: string;
      dateFormatArrival: string;
      timeOfArrival: string;
    };
    location: { locationName: string }[];
    companyId: { marketingCarrier: string };
    flightOrtrainNumber: string;
    equipment: string;
  };

}


interface FlightTableProps {
  flightOptions: { segments: SegmentRowProps["segment"][] }[];
  onClickReserve: () => void
  onSegmentsSelect: (segments: SegmentRowProps["segment"][]) => void;
}

const FlightTable: React.FC<FlightTableProps> = ({ flightOptions, onClickReserve, onSegmentsSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const optionsPerPage = 3;
  const totalPages = Math.ceil(flightOptions.length / optionsPerPage);

  const headers = [
    'Fecha de Salida', 'Hora de Salida', 'Fecha de Llegada', 'Hora de Llegada',
    'Ciudad de Partida', 'Ciudad de Llegada', 'Aerolínea', 'N° de Vuelo', 'Equipo'
  ];

  const paginatedOptions = flightOptions.slice(
    (currentPage - 1) * optionsPerPage,
    currentPage * optionsPerPage
  );

  return (
    <div className={styles.flightTable}>
      <table>
        <TableHeader headers={headers} />
        {paginatedOptions.map((option, index) => (
          <FlightOption key={index} option={{ segments: option.segments, num: String(index + 1) }} onClickReserve={() => {
            onClickReserve();
            onSegmentsSelect(option.segments);
          }} />
        ))}
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default FlightTable;
