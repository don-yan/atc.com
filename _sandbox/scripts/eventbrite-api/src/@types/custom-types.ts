export interface InputEventData {
    timezone: string;
    date: string;
    startTime: string;
    endTime: string;
    description?: string;
    summary?: string;
    atcId: string
}

export interface UtcTimes {
    startUtc: string;
    endUtc: string;
}


export interface UpdateEventDetailsInput extends InputEventData {
    eventId?: string;
    times: UtcTimes;
}
