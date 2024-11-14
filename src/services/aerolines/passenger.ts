import { backUrl } from "./urls";

export const setPassengers = async (passengers: any[], itineraryId: string) => {
    for (const passenger of passengers) {
      // Extraemos los datos necesarios de cada pasajero
      const name = passenger.name;
      const idNumber = passenger.idNumber;
      const phoneNumber = passenger.phoneNumber;
  
      // Creamos el objeto de datos que se enviará
      const data = {
        name,
        idNumber,
        phoneNumber,
        itinerary_id: itineraryId,
      };
  
      try {
        // Realizamos la solicitud POST para enviar los datos del pasajero
        const response = await fetch(backUrl.passengers.create, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        // Comprobamos si la respuesta fue exitosa
        if (!response.ok) {
          console.error('Error al subir el pasajero:', response.statusText);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    }
  };
  