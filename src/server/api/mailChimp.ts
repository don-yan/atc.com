import type { MailChimpConfig, MailChimpContactData } from "~/@types/mailchimp.ts";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body: MailChimpContactData = await readBody(event);

  const mailChimpConfig: MailChimpConfig = {
    apiKey: config.private.MAILCHIMP_KEY,
    server: config.private.MAILCHIMP_SERVER_PREFIX,
    listId: config.private.MAILCHIMP_AUDIENCE_ID
  };
  console.log('mailChimp API', body);

  const encodedBasicAuthHeader = Buffer.from(`:${mailChimpConfig.apiKey}`).toString('base64');
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Basic ${encodedBasicAuthHeader}`);

  const subscriberHash = body.email.toLowerCase();
  const nameParts = body.name.split(' ');
  const firstName = nameParts[0];
  const lastName = (nameParts.length > 1 ? nameParts.slice(1) : nameParts).join(' ');

  const raw = JSON.stringify({
    email_address: body.email,
    email_type: 'html',
    status_if_new: "subscribed",
    merge_fields: { FNAME: firstName, LNAME: lastName },
    interests: {},
    language: "",
    vip: false,
    location: { latitude: 0, longitude: 0 },
    marketing_permissions: [],
    ip_signup: "",
    timestamp_signup: "",
    ip_opt: "",
    timestamp_opt: "",
    tags: ["form", "atc-website"]
  });

  const requestURL = `https://${mailChimpConfig.server}.api.mailchimp.com/3.0/lists/${mailChimpConfig.listId}/members/${subscriberHash}?skip_merge_validation=true`;
  return fetch(requestURL, {
    method: 'PUT',
    headers: myHeaders,
    redirect: "follow",
    body: raw
  })
  .then(async (response) => await response.text())
  .catch(e => console.error(e));
});
