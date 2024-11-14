import { env } from "app/config/env"

export const airlinesUrl = {
    airports: {
        'all': `${env.AIRLINES_BASE_URL}/airports/v2`
    },
    flights: {
        'all': `${env.AIRLINES_BASE_URL}/flights/v2`
    }
}

export const backUrl = {
    itineraries: {
        'create': `${env.BACK_BASE_URL}/itinerary`
    },
    flights: {
        'create': `${env.BACK_BASE_URL}/flight`
    },
    passengers: {
        'create': `${env.BACK_BASE_URL}/passenger`
    }
}