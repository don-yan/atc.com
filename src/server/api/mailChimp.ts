/**
 * Submit to the MailChimp API
 *
 * Reference:
 *  + https://mailchimp.com/developer/marketing/api/list-members/add-or-update-list-member/
 *  + https://www.merge.dev/blog/how-to-add-a-subscriber-and-more-with-the-mailchimp-api
 */


import {createContact} from "#shared/api/mailChimp.ts";
import type {MailChimpConfig, MailChimpContactData} from "~/@types";


export default defineEventHandler(async (event) => {


    const config = useRuntimeConfig()


    const body: MailChimpContactData = await readBody(event);


    const mailChimpConfig: MailChimpConfig = {
        apiKey: config.private.MAILCHIMP_KEY,
        server: config.private.MAILCHIMP_SERVER_PREFIX,
        listId: config.private.MAILCHIMP_AUDIENCE_ID
    }
    console.log('mailChimp API', body);

    return createContact(mailChimpConfig, body);


})
