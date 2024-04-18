import {type MailChimpConfig, type MailChimpContactData} from "../../src/@types/mailchimp";

// import crypto from 'crypto'

export async function createContact(apiConfig: MailChimpConfig, requestData: MailChimpContactData): Promise<string> {
    let timestamp = Math.ceil(new Date().getTime() / 1000);

    
    const encodedBasicAuthHeader = Buffer.from(`:${apiConfig.apiKey}`).toString('base64')

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Basic ${encodedBasicAuthHeader}`);

    // let subscriberHash = crypto.createHash('md5').update(requestData.email.toLowerCase()).digest("hex")
    let subscriberHash = requestData.email.toLowerCase(); // crypto.createHash('md5').update(requestData.email.toLowerCase()).digest("hex")

    let nameParts = requestData.name.split(' ')
    let firstName = nameParts[0];
    let lastName = (nameParts.length > 1 ? nameParts.splice(1) : nameParts).join(' ')


    const raw = JSON.stringify(
        {
            email_address: requestData.email,
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
    console.log(raw)

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: "follow",
        body: raw
    };

    const requestURL = `https://${apiConfig.server}.api.mailchimp.com/3.0/lists/${apiConfig.listId}/members/${subscriberHash}?skip_merge_validation=true`;
    console.log(requestURL)

    return fetch(requestURL, requestOptions)
        .then(async (response) => {

            const json = await response.text();
            // console.log('request finish', JSON.stringify(json))
            console.log('request finish', json)

            return json;
        }).catch(e => {
            console.error(e);
        })

}