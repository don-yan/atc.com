require('dotenv').config();
const axios = require('axios');
const mailChimp = require('./export-audience')
const stringifySafe = require('json-stringify-safe');
// Load values from environment variables
const apiKey = process.env.TICKET_TAILOR_API_KEY; // Your Ticket Tailor API key


/**
 *
 * @return {Promise<void>}
 */
 async function createVoucherCodesFromMailchimp() {
    try {
        const allMembers = await mailChimp.fetchAllMembers();

        // Process last names:
        let lastNames = allMembers
            .map(member => member.merge_fields.LNAME || '')  // Get the last names
            .filter(name => name !== '')                     // Remove any empty names

        // Remove duplicates, convert to lowercase, and replace spaces and apostrophes with dashes
        lastNames = [...new Set(lastNames)]  // Remove duplicates
            .map(name => name.toLowerCase())    // Convert to lowercase
            .map(name => name.replace(/[\s']/g, '-')) // Replace spaces and apostrophes with dashes
            .sort()
            .map(name => 'code-' + name) // prefix with "code-"


        const voucherCodes = lastNames.join('\n');


        // fs.writeFileSync('processed_last_names.csv', csvHeaders + csvData);
        console.log('createVoucherCodesFromMailchimp | ', voucherCodes);
    } catch (error) {
        console.error('Error exporting audience list:', error.message);
    }
}


/**
 * Function to create a voucher with associated codes
 *
 * Ref: https://developers.tickettailor.com/?shell#create-a-voucher-and-its-voucher-codes
 * @return {Promise<void>}
 */
async function createVoucher(eventSeries, voucherCodes = ["testCode1", "testCode2"]) {


    try {

        const expiryDate = addTwoWeeksToTimestamp(eventSeries.next_occurrence_date.unix);

        const voucherData = {
            codes: ["testCode1", "testCode2"],         // Voucher codes to be created
            // event_series_ids: ["es_1", "es_2"],        // Associated event series IDs
           // expiry: expiryDate,                        // Voucher expiry as Unix timestamp
            interval:12,
            name: "Test voucher with codes",           // Name of the voucher
            partial_redemption: "false",               // Whether the voucher can be partially redeemed
            voucher_type: "GIFT_CARD",                     // Type of voucher: "PROMO" for promo codes or "GIFT_CARD"
            value: 540                                  // Voucher value in cents (e.g., 540 cents = $5.40)
        };

        console.log('createVoucher', voucherData)


        const response = await axios.post('https://api.tickettailor.com/v1/vouchers',
            voucherData,
            {
                auth: {
                    username: apiKey,  // Your API key for authorization
                    password: '',      // No password required, just the API key for basic auth
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

        console.log('Voucher created successfully:', JSON.stringify(response.data, null, 1));
    } catch (error) {
        console.error('Error creating voucher:', error.response ? JSON.stringify(error.response.data, null, 1) : error.message);
    }
}

function addTwoWeeksToTimestamp(originalTimestamp) {
    // Define the number of seconds in 2 weeks
    const secondsInTwoWeeks = 2 * 7 * 24 * 60 * 60;

    // Calculate the new timestamp
    const newTimestamp = originalTimestamp + secondsInTwoWeeks;

    return newTimestamp;
}

/**
 * Get the latest event
 * @return {Promise<*>}
 */
async function getLatestEvent() {

    let result;
    let allEvents = await fetchEventSeries();

    console.log('allEvents.length', allEvents.length)
    if (allEvents.length > 0) {
        result = allEvents[allEvents.length - 1]
    }

    console.log(stringifySafe(result))
    return result;
}

/**
 * Function to list event series
 */
async function fetchEventSeries(params) {
    let allEvents = []

    try {
        const response = await axios.get('https://api.tickettailor.com/v1/event_series', {
            params,
            auth: {
                username: apiKey,  // API key for authorization
                password: '',      // No password required, just the API key for basic auth
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });


        allEvents = [...response.data.data]

    } catch (error) {
        console.error('Error fetching event series:', error.response ? error.response.data : error.message);
    }
    // console.log('returning',allEvents.length)
    return allEvents
}

/**
 * MAIN Method
 */
async function main() {


    let latestEvent = await getLatestEvent();
    await createVoucher(latestEvent);

   // await createVoucherCodesFromMailchimp();

}

main();


