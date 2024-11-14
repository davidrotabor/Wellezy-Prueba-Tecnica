'use client'
import Image from "next/image";
import styles from "./page.module.sass";
import SearchForm from "app/components/organisms/SearchForm/SearchForm";
import FlightTable from "app/components/organisms/FlightTable/FlightTable";
import { useState } from "react";
import { getFlights } from "app/services/aerolines/flights";
import { setItinerary } from "app/services/aerolines/itineraries";
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
  name: string
  idNumber: string
  phoneNumber: string
}

export default function Home() {
  // Los vuelos tal cual como viene el API
  const [flightOptions, setFlightOptions] = useState<any[]>([]);
  // Los vuelos después de añadirle los filtros
  const [filteredFlights, setFilteredFlights] = useState<any[]>([]);
  // Aqui se guardarán las aerolineas después de filtrar, para los vuelos
  const [airlineOptions, setAirlineOptions] = useState<string[]>([]);
  // La cantidad de pasajeros para tener persistencia en el formulario
  const [qtyPassengers, setQtyPassengers] = useState<number>(0);
  // Para indicar la carga
  const [loading, setLoading] = useState<boolean>(false);
  // Abrir o cerrar el modal de los pasajeros
  const [isModalOpen, setIsModalOpen] = useState(false)
  // La información de los pasajeros ingresada en el modal
  const [personsData, setPersonsData] = useState<Person[]>([])
  // Información de los segmentos del itinerario seleccionado
  const [segments, setSegments] = useState<any[]>([]);

  // Lectura al API que nos da el itinerario
  const handleSearch = async (searchParams: {
    qtyPassengers: string;
    adult: string;
    departureCity: string;
    arrivalCity: string;
    date: string;
  }) => {
    setLoading(true)
    setQtyPassengers(parseInt(searchParams.qtyPassengers));
    const response = await getFlights(
      searchParams.qtyPassengers,
      searchParams.adult,
      searchParams.departureCity,
      searchParams.arrivalCity,
      searchParams.date
    );
    
    const flights = response.data.Seg1.map((option: any) => ({
      segments: option.segments,
    }));

    // Se filtran las aerolineas que existan en los vuelos de respuesta
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
      const lastSegment = option.segments[option.segments.length - 1];

      const matchesAirline =
        filters.airline === "" ||
        option.segments.some(
          (segment: any) => segment.companyId.marketingCarrier === filters.airline
        );

      const matchesArrivalDate =
        filters.arrivalDate === "" ||
        lastSegment.productDateTime.dateOfArrival === filters.arrivalDate;
      return matchesAirline && matchesArrivalDate;
    });

    setFilteredFlights(filtered);
  };

  

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  
  // Encargado de la persistencia de los vuelos en el itinerario que desee reservar
  const handleSegments = (segments: SegmentRowProps["segment"][]) => {
    setSegments(segments)
  };

  // Encargado de enviar los datos para hacer el POST
  const handlePersonsChange = (updatedPersons: Person[]) => {
    setPersonsData(updatedPersons)
  }

  // Encargado de enviar los datos para hacer el POST
  const booking = () => {
    setItinerary(segments, personsData)
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
            initialCount={qtyPassengers}
            onClose={closeModal}
            onPersonsChange={handlePersonsChange}
            onBooking={booking}
          />
        )}
      </main>
    </div>
  );
}