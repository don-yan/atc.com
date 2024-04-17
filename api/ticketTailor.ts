/**
 * Fetch Data from the Ticket Tailor API
 *
 * Reference: https://developers.tickettailor.com/
 */

import {type TTApiResponse} from "../src/@types";

export const config = {
    runtime: 'edge',
};


export async function GET(request: Request) {

    let timestamp = Math.ceil(new Date().getTime() / 1000);
    let TT_KEY = process.env.TICKET_TAILOR_KEY;

    // NOTE: TT only needs username: https://developers.tickettailor.com/#authentication

    const encodedBasicAuthHeader = Buffer.from(`${TT_KEY}:`).toString('base64')

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

    console.log('timestamp', timestamp)
    return fetch(`https://api.tickettailor.com/v1/events?end_at.gte=${greaterThan}`, requestOptions)
        .then(async (response) => {

            const json = await response.json();
            // TODO: sort
            console.debug(json);
            json.timestamp = timestamp;
            return new Response(JSON.stringify(json));
        })

    // return new Response(`Hello from ${process.env.VERCEL_REGION} | [${process.env.MAILCHIMP_SERVER_PREFIX}] [${timestamp}]`);
}


