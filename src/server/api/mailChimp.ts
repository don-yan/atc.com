/**
 * Submit to the MailChimp API
 *
 * Reference:
 *  + https://mailchimp.com/developer/marketing/api/list-members/add-or-update-list-member/
 *  + https://www.merge.dev/blog/how-to-add-a-subscriber-and-more-with-the-mailchimp-api
 */

import {MailChimpContactData} from "~/@types";

import mailchimp from "@mailchimp/mailchimp_marketing"
// const mailchimp = require("@mailchimp/mailchimp_marketing")
import crypto from 'crypto'


export default defineEventHandler(async (event) => {


    const config = useRuntimeConfig()


    const body: MailChimpContactData = await readBody(event);


    console.log('mailChimp API', body);

    let emailHash = crypto.createHash('md5').update(body.email.toLowerCase()).digest("hex")

    console.log('emailHash', emailHash);

    mailchimp.setConfig({
        apiKey: config.private.MAILCHIMP_KEY,
        server: config.private.MAILCHIMP_SERVER_PREFIX
    });

    let nameParts = body.name.split(' ')
    let firstName = nameParts[0];
    let lastName = (nameParts.length > 1 ? nameParts.splice(1) : nameParts).join(' ')


    // const response = await mailchimp.ping.get();
    const response = await mailchimp.lists.setListMember(
        config.private.MAILCHIMP_AUDIENCE_ID, // list_ID
        emailHash, // MD5 Hash
        {
            email_address: body.email,
            email_type: 'html',
            status_if_new: "subscribed",
            // https://mailchimp.com/developer/marketing/docs/merge-fields/#structure
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            },
            interests: {},
            "language": "",
            "vip": false,
            "location": {
                "latitude": 0,
                "longitude": 0
            },
            "marketing_permissions": [],
            "ip_signup": "",
            "timestamp_signup": "",
            "ip_opt": "",
            "timestamp_opt": "",
            "tags": ["form", "atc-website"]
        }
    )


    console.log(response);


    return response;

    //
    // // NOTE: TT only needs username: https://developers.tickettailor.com/#authentication
    //
    // const encodedBasicAuthHeader = Buffer.from(`${config.private.TICKET_TAILOR_KEY}:`).toString('base64')
    //
    // const myHeaders = new Headers();
    // myHeaders.append("Accept", "application/json");
    // myHeaders.append("Authorization", `Basic ${encodedBasicAuthHeader}`);
    //
    //
    // const requestOptions = {
    //     method: 'get',
    //     headers: myHeaders,
    //     redirect: "follow"
    // };
    //
    // return fetch("https://api.tickettailor.com/v1/events?start_at.gte=1711671932", requestOptions)
    //     .then(async (response) => {
    //
    //         const json = await response.json();
    //         console.log(json);
    //         return json as TTApiResponse
    //     })
})
