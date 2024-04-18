/**
 * Fetch Data from the Ticket Tailor API
 *
 * Reference: https://developers.tickettailor.com/
 */

import {getEvents} from "../shared/api/ticketTailor";

export const config = {
    runtime: 'edge',
};


export async function GET(request: Request) {


    let TT_KEY = process.env.TICKET_TAILOR_KEY || '';

    let responseData = await getEvents(TT_KEY)
    console.log('new response')

    return new Response(JSON.stringify(responseData));


    // return new Response(`Hello from ${process.env.VERCEL_REGION} | [${process.env.MAILCHIMP_SERVER_PREFIX}] [${timestamp}]`);
}


