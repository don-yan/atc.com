import axios, {AxiosResponse} from 'axios';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import eventbrite from 'eventbrite';

import FormData from 'form-data';
import type {InputEventData, UpdateEventDetailsInput, UtcTimes} from "./@types/custom-types";
import {EBEvent} from "./@types/eventbrite-sdk-types";

dotenv.config();

// TODO: read from Master Content


let NEW_EVENT_ID: string | undefined = undefined; // Set to undefined initially

// TODO: read from CLI parameters
NEW_EVENT_ID = "1144655237629"; // atc-030
const EST_TIMEZONE = 'America/New_York';


// TODO: read from Master Content

const OLD_EVENT_ID = "1107520606949"; // atc-029

// CONFIG

const EB_API_KEY = process.env.EVENTBRITE_API_KEY
const EB_PRIVATE_TOKEN = process.env.EVENTBRITE_PRIVATE_TOKEN
// TODO: delete!
console.log('API_KEY', EB_API_KEY)
console.log('API_TOKEN', EB_PRIVATE_TOKEN)

let EVENT_DATA: InputEventData = {
    timezone: EST_TIMEZONE,
    date: '2025-01-29',
    startTime: '19:30',
    endTime: '21:30',
    // description: '<p>New event description here</p>',
    summary: 'my summary',
    // summary:'Catch a carefully curated selection of the area\'s funniest comics as Acquired Taste Comedy presents another signature Standup Comedy Event™.',
    atcId: 'atc-030'
};

let EVENT_LOGO_PATH = `uploads/${EVENT_DATA.atcId}/${EVENT_DATA.atcId}-social.png`


// TODO: consider using Eventbrite SDK instead
// Assuming your API key is stored in an environment variable
const sdk = eventbrite({token: EB_PRIVATE_TOKEN});

// == Utils
function formatUtcTimes(data: InputEventData): UtcTimes {
    return {
        startUtc: `${data.date}T${data.startTime}:00Z`,
        endUtc: `${data.date}T${data.endTime}:00Z`
    };
}

// Example of a type guard to check for a structure with 'response'
function isErrorWithResponse(error: any): error is { response: { data: any; } } {
    return error && error.response && error.response.data;
}


const cloneEvent = async (originalEventId: string): Promise<string | undefined> => {
    const url = `https://www.eventbriteapi.com/v3/events/${originalEventId}/copy/`;
    const config = {
        headers: {
            Authorization: `Bearer ${EB_PRIVATE_TOKEN}`
        }
    };

    try {
        const response: AxiosResponse<EBEvent> = await axios.post(url, {}, config);
        const newEventId = response.data.id;
        console.log(`Cloned Event`, {originalEventId, newEventId});
        return newEventId; // Returns new event ID
    } catch (error) {
        if (isErrorWithResponse(error)) {
            console.error('Error cloning event:', error.response.data);
        } else {
            console.error('[cloneEvent] Unexpected error:', error);
        }
    }
};


/**
 * Update Event Details
 * @param eventId
 * @param input
 */
const updateEventDetails = async (eventId: string, input: UpdateEventDetailsInput): Promise<void> => {
    const url = `https://www.eventbriteapi.com/v3/events/${eventId}/`;


    const data = {
        start: {
            timezone: EVENT_DATA.timezone, // Assuming eventData.timezone is accessible globally or passed appropriately
            utc: input.times.startUtc
        },
        end: {
            timezone: EVENT_DATA.timezone,
            utc: input.times.endUtc
        },
        // description: {
        //     h,
        summary: input.summary

    };
    const config = {
        headers: {
            Authorization: `Bearer ${EB_PRIVATE_TOKEN}`
        }
    };

    console.log('updateEventDetails', eventId, data)
    try {
        const response = await axios.post(url, {event: data}, config);
        console.log('Updated Event:', response.data);
    } catch (error) {
        if (isErrorWithResponse(error)) {
            console.error('Error updating event:', error.response.data);
        } else {
            console.error('[updateEventDetails] Unexpected error:', error);
        }
    }
};

/**
 * Update the primary image
 * @param eventId
 * @param imagePath
 */
const updateEventPicture = async (eventId: string, imagePath: string): Promise<void> => {
    const url = `https://www.eventbriteapi.com/v3/events/${eventId}/logo/`;
    const formData = new FormData();


    const imageId = uploadMedia(imagePath)

    formData.append('logo', fs.createReadStream(imagePath));

    const config = {
        headers: {
            Authorization: `Bearer ${EB_PRIVATE_TOKEN}`,
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        const response = await axios.post(url, formData, config);
        console.log('Updated Event Picture:', response.data);
    } catch (error) {
        if (isErrorWithResponse(error)) {
            console.error('Error updating event picture:', error.response.data);
        } else {
            console.error('[updateEventPicture] Unexpected error:', error);
        }
    }
};

/**
 * Upload a binary to Eventbrites media server...
 *
 * // TODO
 * @param filePath
 */
const uploadMedia = async (filePath: string) => {

    console.log('uploadMedia', filePath)

    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post('https://www.eventbriteapi.com/v3/media/upload/', formData, {
        headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${EB_PRIVATE_TOKEN}`,
        }
    });

    return response.data;
};

const run = async (): Promise<void> => {

    try {
        // Only clone if NEW_EVENT_ID is undefined
        if (!NEW_EVENT_ID) {
            NEW_EVENT_ID = await cloneEvent(OLD_EVENT_ID);
        }

        const updateEventDetail = {}

        if (NEW_EVENT_ID) {
            const newTimes = formatUtcTimes(EVENT_DATA);
            // Assuming updateEventDetails and updateEventPicture are implemented

            const detailsData = {...EVENT_DATA, times: formatUtcTimes(EVENT_DATA)}

            await updateEventDetails(NEW_EVENT_ID, detailsData);

            // await updateEventPicture(NEW_EVENT_ID, EVENT_LOGO_PATH);


            console.log('Event setup completed with Event ID:', NEW_EVENT_ID);
        }
    } catch (e) {
        console.error('[run] error', e)
    }
};

run();
