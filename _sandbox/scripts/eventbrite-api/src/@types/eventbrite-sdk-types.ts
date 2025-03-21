export interface EBEvent {
  id?: string
  name?: {
    text: string
    html: string
    [k: string]: unknown
  }
  summary?: string
  description?: {
    text: string
    html: string
    [k: string]: unknown
  }
  start?: {
    timezone: string
    utc: string
    local: string
    [k: string]: unknown
  }
  end?: {
    timezone: string
    utc: string
    local: string
    [k: string]: unknown
  }
  url?: string
  vanity_url?: string
  created: string
  changed: string
  published?: null | string
  status?: "draft" | "live" | "started" | "ended" | "completed" | "canceled"
  currency?: string
  online_event?: boolean
  organization_id?: string
  organizer_id?: string
  organizer?: {
    name?: string
    description?: {
      text: string
      html: string
      [k: string]: unknown
    }
    long_description?: {
      text: string
      html: string
      [k: string]: unknown
    }
    logo_id?: null | string
    logo?: null | {
      id: string
      url: string
      crop_mask?: null | {
        top_left?: {
          y?: number
          x?: number
          [k: string]: unknown
        }
        width?: number
        height?: number
        [k: string]: unknown
      }
      original?: {
        url?: string
        width?: number
        height?: number
        [k: string]: unknown
      }
      aspect_ratio?: string
      edge_color?: string
      edge_color_set?: boolean
      [k: string]: unknown
    }
    resource_uri?: string
    id?: string
    url?: string
    num_past_events?: number
    num_future_events?: number
    twitter?: string
    facebook?: string
    [k: string]: unknown
  }
  logo_id?: null | string
  logo?: null | {
    id: string
    url: string
    crop_mask?: null | {
      top_left?: {
        y?: number
        x?: number
        [k: string]: unknown
      }
      width?: number
      height?: number
      [k: string]: unknown
    }
    original?: {
      url?: string
      width?: number
      height?: number
      [k: string]: unknown
    }
    aspect_ratio?: string
    edge_color?: string
    edge_color_set?: boolean
    [k: string]: unknown
  }
  venue_id?: string
  venue?: {
    name: string
    age_restriction?: null | string
    capacity?: null | number
    address?: null | {
      address_1?: null | string
      address_2?: null | string
      city?: null | string
      region?: null | string
      postal_code?: null | string
      country?: null | string
      latitude?: null | string
      longitude?: null | string
      [k: string]: unknown
    }
    resource_uri?: string
    id?: string
    latitude?: string
    longitude?: string
    [k: string]: unknown
  }
  format_id?: null | string
  format?: {
    id?: string
    name?: string
    name_localized?: string
    short_name?: string
    short_name_localized?: string
    resource_uri?: string
    [k: string]: unknown
  }
  category_id?: null | string
  category?: {
    id?: string
    resource_uri?: string
    name?: string
    name_localized?: string
    short_name?: string
    short_name_localized?: string
    subcategories?: unknown[]
    [k: string]: unknown
  }
  subcategory_id?: null | string
  subcategory?: {
    id?: string
    resource_uri?: string
    name?: string
    parent_category?: {
      id?: string
      resource_uri?: string
      name?: string
      name_localized?: string
      short_name?: string
      short_name_localized?: string
      subcategories?: unknown[]
      [k: string]: unknown
    }
    [k: string]: unknown
  }
  music_properties?: {
    age_restriction?:
      | string
      | (
          | null
          | "all_ages"
          | "12+"
          | "13+"
          | "14+"
          | "15+"
          | "16+"
          | "17+"
          | "18+"
          | "19+"
          | "21+"
          | "under_14_with_guardian"
          | "under_16_with_guardian"
          | "under_18_with_guardian"
          | "under_21_with_guardian"
        )
    presented_by?: null | string
    door_time?: null | string
    [k: string]: unknown
  }
  bookmark_info?: {
    bookmarked?: boolean
    [k: string]: unknown
  }
  refund_policy?: string
  ticket_availability?: {
    has_available_tickets?: boolean
    minimum_ticket_price?: {
      currency: string
      value: number
      major_value: string
      display: string
      [k: string]: unknown
    }
    maximum_ticket_price?: {
      currency: string
      value: number
      major_value: string
      display: string
      [k: string]: unknown
    }
    is_sold_out?: boolean
    start_sales_date?: {
      timezone: string
      utc: string
      local: string
      [k: string]: unknown
    }
    waitlist_available?: boolean
    [k: string]: unknown
  }
  listed?: boolean
  shareable?: boolean
  invite_only?: boolean
  show_remaining?: boolean
  password?: string
  capacity?: number
  capacity_is_custom?: boolean
  tx_time_limit?: string
  hide_start_date?: boolean
  hide_end_date?: boolean
  locale?: string
  is_locked?: boolean
  privacy_setting?: string
  is_externally_ticketed?: boolean
  external_ticketing?: {
    external_url: string
    ticketing_provider_name: string
    is_free: boolean
    minimum_ticket_price: {
      currency: string
      value: number
      major_value: string
      display: string
      [k: string]: unknown
    }
    maximum_ticket_price: {
      currency: string
      value: number
      major_value: string
      display: string
      [k: string]: unknown
    }
    sales_start: string
    sales_end: string
    [k: string]: unknown
  }
  is_series?: boolean
  is_series_parent?: boolean
  series_id?: null | string
  is_reserved_seating?: boolean
  show_pick_a_seat?: boolean
  show_seatmap_thumbnail?: boolean
  show_colors_in_seatmap_thumbnail?: boolean
  is_free?: boolean
  source?: string
  version?: string
  resource_uri?: string
  event_sales_status?: {
    sales_status?:
      | "text"
      | "on_sale"
      | "not_yet_on_sale"
      | "sales_ended"
      | "sold_out"
      | "unavailable"
    start_sales_date?: {
      timezone: string
      utc: string
      local: string
      [k: string]: unknown
    }
    message?: string
    message_type?: string | ("default" | "canonical" | "custom")
    message_code?:
      | string
      | (
          | "tickets_not_yet_on_sale"
          | "tickets_with_sales_ended"
          | "tickets_sold_out"
          | "tickets_unavailable"
          | "tickets_at_the_door"
          | "event_cancelled"
          | "event_postponed"
        )
    [k: string]: unknown
  }
  checkout_settings?: {
    created?: string
    changed?: string
    country_code?: string
    currency_code?: string
    checkout_method?: "paypal" | "eventbrite" | "authnet" | "offline"
    offline_settings?: unknown[]
    user_instrument_vault_id?: string
    [k: string]: unknown
  }
  [k: string]: unknown
}
