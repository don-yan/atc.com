/* Ticket Tailor API Response Types */


export interface TTApiResponse<T> {
    data: Array<T>
    links:
        {
            next: string | null
            previous: string | null
        }
}

export interface TTFullEventResponse extends TTApiResponse<TTEventFull> {
    timestamp: number
}

export interface TTMappedEventResponse extends TTApiResponse<TTEventMapped> {
    timestamp: number
}

// Client Facing Event Data
export interface TTEventMapped {
    id: string
    call_to_action: string
    checkout_url: string
    description?: string
    name: string
    images: TTEventImages
    end: TTDate
    start: TTDate
    private: BooleanString
    hidden: BooleanString
    online_event: BooleanString
    event_series_id: string;
    status: 'draft' | 'published' | 'sales_closed'
    tickets_available?: BooleanString
    tickets_available_at: number;
    tickets_available_at_message: string
    tickets_unavailable_at: number
    tickets_unavailable_at_message: string
    timezone: string
    unavailable: BooleanString
    unavailable_status?: string
    url: string
    venue: TTVenue
    waitlist_active: BooleanString | 'no_tickets_available'
    waitlist_call_to_action: string
    waitlist_event_page_text: string
    waitlist_confirmation_message: string
}

// All Event Data
export interface TTEventFull extends TTEventMapped {
    object: string
    chk: string
    access_code?: string
    created_at: number
    currency: string
    description: any
    max_tickets_sold_per_occurrence?: number
    override_id?: number;
    payment_methods: TTPaymentMethod[]
    revenue: number
    ticket_groups: TicketGroup[]
    ticket_types: TicketType[]
    timezone: string
    total_holds: number
    total_issued_tickets: number
    total_orders: number
    unavailable_status: any
    voucher_ids: string[]
}

export type BooleanString = 'true' | false;

// === TT Nested Types Types === //
export interface TTDate {
    date: string
    formatted: string
    iso: string
    time: string
    timezone: string
    unix: number
}

export interface TTVenue {
    name: string
    postal_code: string
}

export interface TTEventImages {
    header: string
    thumbnail: string
}

export interface TTPaymentMethod {
    external_id?: string
    id: string
    instructions?: string
    name?: string
    type: 'stripe' | 'paypal' | 'offline'
}

export interface TicketGroup {
    id: string
    max_per_order: any
    name: string
    sort_order: number
    ticket_ids: string[]
}

export interface TicketType {
    object: string
    id: string
    access_code: any
    booking_fee: number
    description: any
    group_id: string
    max_per_order: number
    min_per_order: number
    name: string
    price: number
    show_quantity_remaining: BooleanString
    show_quantity_remaining_less_than: number
    status: 'on_sale' | 'sold_out' | 'unavailable' | 'hidden' | 'admin_only' | 'locked'
    sort_order: number
    type: 'paid' | 'free'
    quantity: number
    quantity_held: number
    quantity_issued: number
    quantity_total: number
}
