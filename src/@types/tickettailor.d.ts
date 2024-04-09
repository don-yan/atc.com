/* Ticket Tailor API Response Types */


export interface TTApiResponse {
    data: Array<unknown>
    links:
        {
            next: string | null
            previous: string | null
        }
}

export interface TTEventResponse extends TTApiResponse {
    data: Array<TTEvent>
}

export interface TTEvent {
    id: string,
    call_to_action: string,
    description: string,
    name: string,
    images: {
        header: string;
        thumbnail: string
    }
    end: TTDate;
    start: TTDate;
    private: boolean;
    status: 'draft' | 'published' | 'sales_closed'
    tickets_available: string | null
    url: string
    venue: {
        name: string
        postal_code: string
    }

}

export interface TTDate {
    date: string
    formatted: string
    iso: string
    time: string
    timezone: string
    unix: number
}