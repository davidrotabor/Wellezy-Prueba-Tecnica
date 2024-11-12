import { airlinesUrl } from "./urls";

export const getAirports = async (code: string) => {
    try {
        const response = await fetch(airlinesUrl.airports.all, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              code: code,
            })
          })
        const collections = await response.json()
        return collections
    }
    catch(error) {
        console.log(error)
    }
}

