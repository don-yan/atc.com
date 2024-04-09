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
        redirect: "follow"
    };

    return fetch("https://api.tickettailor.com/v1/events?start_at.gte=1711671932", requestOptions)
        .then(async (response) => {

            const json = await response.json();
            console.log(json);
            return json as TTApiResponse
        })
})
