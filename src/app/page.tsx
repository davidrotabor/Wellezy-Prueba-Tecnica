'use client'
import Image from "next/image";
import styles from "./page.module.sass";
import SearchForm from "app/components/organisms/SearchForm/SearchForm";
import FlightTable from "app/components/organisms/FlightTable/FlightTable";
import { useEffect, useState } from "react";
import { getFlights } from "app/services/aerolines/flights";
import FiltersPanel from "app/components/organisms/FiltersPanel/FiltersPanel";
import ModalForm from "app/components/organisms/ModalForm/ModalForm";

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
interface Person {
  id: number
  nombre: string
  identificacion: string
  celular: string
}

export default function Home() {
  const [flightOptions, setFlightOptions] = useState<any[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<any[]>([]);
  const [airlineOptions, setAirlineOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [personsData, setPersonsData] = useState<Person[]>([])

  const handleSearch = async (searchParams: {
    qtyPassengers: string;
    adult: string;
    departureCity: string;
    arrivalCity: string;
    date: string;
  }) => {
    setLoading(true)
    const response = await getFlights(
      searchParams.qtyPassengers,
      searchParams.adult,
      searchParams.departureCity,
      searchParams.arrivalCity,
      searchParams.date
    );

    // Obtener las opciones de vuelo
    const flights = response.data.Seg1.map((option: any) => ({
      segments: option.segments,
    }));

    // Extraer aerolíneas únicas
    const airlines = new Set(
      flights.flatMap((option: any) =>
        option.segments.map((segment: any) => segment.companyId.marketingCarrier)
      )
    );

    setFlightOptions(flights);
    setFilteredFlights(flights);
    setAirlineOptions([...airlines] as string[]);
    setLoading(false)
  };

  const handleApplyFilters = (filters: { airline: string; arrivalDate: string }) => {
    const filtered = flightOptions.filter((option) => {
      const lastSegment = option.segments[option.segments.length - 1]; // Último segmento

      const matchesAirline =
        filters.airline === "" ||
        option.segments.some(
          (segment: any) => segment.companyId.marketingCarrier === filters.airline
        );

      const matchesArrivalDate =
        filters.arrivalDate === "" ||
        lastSegment.productDateTime.dateOfArrival === filters.arrivalDate;
      console.log(lastSegment.productDateTime.dateOfArrival)
      console.log(filters.arrivalDate)
      return matchesAirline && matchesArrivalDate;
    });

    setFilteredFlights(filtered);
  };

  const handleSegments = (segments: SegmentRowProps["segment"][]) => {
    console.log("Segments received from FlightTable:", segments);
  };

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handlePersonsChange = (updatedPersons: Person[]) => {
    setPersonsData(updatedPersons)
    console.log(updatedPersons)
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          {filteredFlights.length > 0 ?
            <div>
              <h1>Información de Opciones de Viaje</h1>
              <FlightTable flightOptions={filteredFlights} onClickReserve={openModal} onSegmentsSelect={handleSegments} />
            </div> : loading ? <h1>Cargando</h1> : <h1>Haz una busqueda</h1>}
        </div>
        <div>
          <SearchForm onSearch={handleSearch} />
          <FiltersPanel
            airlineOptions={airlineOptions}
            onApplyFilters={handleApplyFilters}
          />
        </div>
        {isModalOpen && (
          <ModalForm
            initialCount={1}
            onClose={closeModal}
            onPersonsChange={handlePersonsChange}
          />
        )}
      </main>
    </div>
  );
}