import { env } from "app/config/env"

export const airlinesUrl = {
    airports: {
        'all': `${env.AIRLINES_BASE_URL}/airports/v2`
    },
    flights: {
        'all': `${env.AIRLINES_BASE_URL}/flights/v2`
    }
}