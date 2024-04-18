/**
 * Test Vercel Edge Function
 */


import {type MailChimpConfig, type MailChimpContactData} from "../src/@types";
import {createContact} from "../shared/api/mailChimp";

export const config = {
    runtime: 'edge',
};


export async function POST(request: Request) {


    const body: MailChimpContactData = await request.json();


    const mailChimpConfig: MailChimpConfig = {
        apiKey: process.env.MAILCHIMP_KEY || '',
        server: process.env.MAILCHIMP_SERVER_PREFIX || '',
        listId: process.env.MAILCHIMP_AUDIENCE_ID || ''
    }
    console.log('mailChimp API', body);

    const responseData = await createContact(mailChimpConfig, body);

    console.log(`new response [${process.env.VERCEL_REGION}]`)


    return new Response(JSON.stringify(responseData));

}
