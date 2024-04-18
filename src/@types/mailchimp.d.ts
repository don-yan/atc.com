/* MailChimp API */


export interface MailChimpContactData {
    name: string
    email: string
}

export interface MailChimpConfig {
    apiKey: string
    server: string
    listId: string
}