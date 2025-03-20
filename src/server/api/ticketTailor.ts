/**
 * Fetch Data from the Ticket Tailor API
 *
 * Reference: https://developers.tickettailor.com/
 */

import type {TTApiResponse} from "~/@types";
import {getEvents} from "@shared/api/ticketTailor.ts";

export default defineEventHandler((event): Promise<TTApiResponse> => {

    const config = useRuntimeConfig()

    return getEvents(config.private.TICKET_TAILOR_KEY);

})
