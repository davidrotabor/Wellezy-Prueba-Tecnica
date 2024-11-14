import { setFlights } from "./flights";
import { setPassengers } from "./passenger";
import { backUrl } from "./urls";

export const setItinerary = async (segments: any, personData: any) => {

    const itineraryDetails = extractItineraryDetails(segments)

    try {
        const response = await fetch(backUrl.itineraries.create, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(itineraryDetails)
          })
        const respuesta = await response.json()
        setFlights(segments, respuesta.id);
        setPassengers(personData, respuesta.id);
    }
    catch(error) {
        console.log(error)
    }
}

function extractItineraryDetails(flights: any) {
  
  const departureFlight = flights[0];
  const arrivalFlight = flights[flights.length - 1];
  
  const departureCity = departureFlight.location[0].locationName;
  const arrivalCity = arrivalFlight.location[arrivalFlight.location.length - 1].locationName;

  const dateDeparture = departureFlight.productDateTime.dateFormatDeparture;
  const timeDeparture = departureFlight.productDateTime.timeOfDeparture;

  return {
    departureCity,
    arrivalCity,
    dateDeparture,
    timeDeparture
  };
}