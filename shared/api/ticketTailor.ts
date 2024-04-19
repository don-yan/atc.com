import {type TTApiResponse} from "~/@types";

export async function getEvents(apiKey: string): Promise<TTApiResponse> {
    let timestamp = Math.ceil(new Date().getTime() / 1000);

    // NOTE: TT only needs username: https://developers.tickettailor.com/#authentication

    const encodedBasicAuthHeader = Buffer.from(`${apiKey}:`).toString('base64')

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Basic ${encodedBasicAuthHeader}`);


    const requestOptions = {
        method: 'get',
        headers: myHeaders,
        redirect: "follow",
    };

    let greaterThan = Math.ceil(new Date().getTime() / 1000);

    // TODO: Remove (we are fetching extra events for development)
    greaterThan = 1704085200 //

    console.log('start request')
    
    return fetch(`https://api.tickettailor.com/v1/events?end_at.gte=${greaterThan}`, requestOptions)
        .then(async (response) => {

            const json = await response.json();
            // TODO: sort
            console.debug(json);
            console.log('end request')
            json.timestamp = timestamp;
            return json;
        })

}