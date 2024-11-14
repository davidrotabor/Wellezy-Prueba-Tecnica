import { airlinesUrl, backUrl } from "./urls";

export const getFlights = async (qtyPassengers: string, adult: string, departureCity: string, arrivalCity: string, hour: string) => {
    try {
        const response = await fetch(airlinesUrl.flights.all, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                searchs: 20,
                qtyPassengers: parseInt(qtyPassengers),
                adult: parseInt(adult),
                itinerary: [{
                    departureCity: departureCity,
                    arrivalCity: arrivalCity,
                    hour: hour,
                }]

            })
        })
        const collections = await response.json()
        return collections
    }
    catch (error) {
        console.log(error)
    }
}

export const setFlights = async (segments: any, itineraryId: string) => {

  for (const flight of segments) {
    const departureCity = flight.location[0].locationName;
    const arrivalCity = flight.location[flight.location.length - 1].locationName;
    const dateDeparture = flight.productDateTime.dateFormatDeparture;
    const dateArrival = flight.productDateTime.dateFormatArrival;

    const data = {
      departureCity,
      arrivalCity,
      dateDeparture,
      dateArrival,
      itinerary_id: itineraryId,
    };

    try {
      const response = await fetch(backUrl.flights.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error('Error al subir el itinerario:', response.statusText);
      } else {
        console.log('Itinerario enviado con éxito:', data);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }
}