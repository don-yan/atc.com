/**
 * Fetch Data from the Ticket Tailor API
 *
 * Reference: https://developers.tickettailor.com/
 */

import {TTApiResponse} from "~/@types";

export default defineEventHandler((event): Promise<TTApiResponse> => {


    const config = useRuntimeConfig()

    // NOTE: TT only needs username: https://developers.tickettailor.com/#authentication

    const encodedBasicAuthHeader = Buffer.from(`${config.private.TICKET_TAILOR_KEY}:`).toString('base64')

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Basic ${encodedBasicAuthHeader}`);


    const requestOptions = {
        method: 'get',
        headers: myHeaders,
        redirect: "follow",
    };

    let greaterThan = Math.ceil(new Date().getTime()/1000);

    // TODO: Remove (we are fetching extra events for development)
    greaterThan =  1704085200 //

    return fetch(`https://api.tickettailor.com/v1/events?end_at.gte=${greaterThan}`, requestOptions)
        .then(async (response) => {

            const json = await response.json();
            // TODO: sort
            console.debug(json);
            return json as TTApiResponse
        })
})
