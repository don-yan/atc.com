import {type TTMappedEventResponse, type TTFullEventResponse, type TTEventMapped} from "~/@types";
import {mapPick} from "~/utils/data-utils.ts";

// export async function getEvents(apiKey: string): Promise<TTApiResponse> {
export async function getEvents(apiKey: string): Promise<TTMappedEventResponse> {
    let timestamp = Math.ceil(new Date().getTime() / 1000);

    // NOTE: TT only needs username: https://developers.tickettailor.com/#authentication

    const encodedBasicAuthHeader = Buffer.from(`${apiKey}:`).toString('base64')

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Basic ${encodedBasicAuthHeader}`);


    let greaterThan = Math.ceil(new Date().getTime() / 1000);

    // TODO: Remove (we are fetching extra events for development)
    greaterThan = 1704085200 //

    console.log('start request')

    // return fetch(`https://api.tickettailor.com/v1/events?end_at.gte=${greaterThan}`, requestOptions)
    return fetch(`https://api.tickettailor.com/v1/events`, {
            method: 'get',
            headers: myHeaders,
            redirect: "follow"
        }
    )
        .then(async (response) => {

            const apiResponse: TTFullEventResponse = await response.json();
            // TODO: sort


            console.log('end request', apiResponse.links)

            // == Sort data by event end date
            apiResponse.data = apiResponse.data.sort((a, b) => {
                return b.end.unix - a.end.unix
            })

            // == Filter out client specific keys

            // Create an array of keys that are allowed (keys in MyInterface)
            const allowedKeys: (keyof TTEventMapped)[] = ['id',
                'call_to_action',
                'checkout_url',
                'description',
                'name',
                'images',
                'end',
                'start',
                'private',
                'hidden',
                'online_event',
                'event_series_id',
                'status',
                'tickets_available',
                'tickets_available_at',
                'tickets_available_at_message',
                'tickets_unavailable_at',
                'tickets_unavailable_at_message',
                'timezone',
                'unavailable',
                'unavailable_status',
                'url',
                'venue',
                'waitlist_active',
                'waitlist_call_to_action',
                'waitlist_event_page_text',
                'waitlist_confirmation_message'];


            return {
                links: apiResponse.links,
                data: apiResponse.data.map(item => mapPick(item, allowedKeys)),
                timestamp
            };
        })

}
