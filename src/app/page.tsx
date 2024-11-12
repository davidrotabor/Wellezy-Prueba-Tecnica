'use client'
import Image from "next/image";
import styles from "./page.module.sass";
import SearchForm from "app/components/organisms/SearchForm";
import FlightTable from "app/components/organisms/FlightTable/FlightTable";
import { useEffect, useState } from "react";
import { getFlights } from "app/services/aerolines/flights";

export default function Home() {
  const [flightOptions, setFlightOptions] = useState<any[]>([]);

  const handleSearch = async (searchParams: { departureCity: string; arrivalCity: string; date: string }) => {
    const response = await getFlights(searchParams.departureCity, searchParams.arrivalCity, searchParams.date)
    console.log(response.data.Seg1)
    setFlightOptions(response.data.Seg1.map((option: any) => ({ segments: option.segments })));
  };



  useEffect(() => {
    // Solicitud de datos a la API
    const fetchData = async () => {
      const response = await fetch('/api/endpoint'); // URL de la API
      const data = await response.json();
      setFlightOptions(data.Seg1.map((option: any) => ({ segments: option.segments })));
    };
    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <SearchForm onSearch={handleSearch} />
      <h1>Información de Opciones de Viaje</h1>
      <FlightTable flightOptions={flightOptions} />
      </main> 
    </div>
  );
}
