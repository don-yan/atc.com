/**
 * Fetch Data from the Ticket Tailor API
 *
 * Reference: https://developers.tickettailor.com/
 */


import type {TTEventFull, TTEventMapped, TTFullEventResponse, TTMappedEventResponse} from "~/@types/tickettailor.ts";
import {mapPick} from "~/utils/data-utils.ts";

export default defineEventHandler((event): Promise<TTMappedEventResponse> => {
  const config = useRuntimeConfig();
  console.info('nuxt event handler');

  const apiKey = config.private.TICKET_TAILOR_KEY;
  let timestamp = Math.ceil(new Date().getTime() / 1000);

  const encodedBasicAuthHeader = Buffer.from(`${apiKey}:`).toString('base64');
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Basic ${encodedBasicAuthHeader}`);

  return fetch(`https://api.tickettailor.com/v1/events`, {
    method: 'get',
    headers: myHeaders,
    redirect: "follow"
  })
  .then(async (response) => {
    const apiResponse: TTFullEventResponse = await response.json();
    apiResponse.data = apiResponse.data.sort((a: TTEventFull, b: TTEventFull) => {
      return b.end.unix - a.end.unix;
    });

    const allowedKeys: (keyof TTEventMapped)[] = [
      'id', 'call_to_action', 'checkout_url', 'description', 'name', 'images', 'end', 'start',
      'private', 'hidden', 'online_event', 'event_series_id', 'status', 'tickets_available',
      'tickets_available_at', 'tickets_available_at_message', 'tickets_unavailable_at',
      'tickets_unavailable_at_message', 'timezone', 'unavailable', 'unavailable_status',
      'url', 'venue', 'waitlist_active', 'waitlist_call_to_action', 'waitlist_event_page_text',
      'waitlist_confirmation_message'
    ];

    return {
      links: apiResponse.links,
      data: apiResponse.data.map((item: TTEventMapped) => mapPick(item, allowedKeys)),
      timestamp
    };
  });
});
