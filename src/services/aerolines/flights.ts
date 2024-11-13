import { airlinesUrl } from "./urls";

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