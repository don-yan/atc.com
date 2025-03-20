/**
 * Fetch Data from the Ticket Tailor API
 *
 * Reference: https://developers.tickettailor.com/
 */

import type {TTMappedEventResponse} from "~/@types/tickettailor";
import {getEvents} from "#shared/api/ticketTailor";

export default defineEventHandler((event): Promise<TTMappedEventResponse> => {

    const config = useRuntimeConfig()

    console.info('nuxt event handler')

    return getEvents(config.private.TICKET_TAILOR_KEY);


})
